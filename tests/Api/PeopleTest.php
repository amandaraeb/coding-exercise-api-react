<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Person;
use App\Models\Group;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PeopleControllerTest extends TestCase
{
    use WithFaker;

    public function testPersonCreated()
    {
        $group = factory('App\Models\Group')->create();

        $expected = [
            'first_name' => 'Sally',
            'last_name' => 'Ride',
            'email_address' => 'sallyride@nasa.gov',
            'status' => 'archived',
            'group_id' => $group->id
        ];
        $response = $this->json('POST', '/api/people', $expected);
        $response
            ->assertStatus(201)
            ->assertJsonFragment($expected);

    }

    public function testPersonRetrieved()
    {
        $person = factory('App\Models\Person')->create();

        $response = $this->json('GET', '/api/people/' . $person->id);
        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'first_name',
                    'last_name',
                    'email_address',
                    'status',
					'group_id',
                    'created_at',
                    'updated_at'
                ]
            ]);
    }

    public function testAllPeopleRetrieved()
    {
        $person = factory('App\Models\Person', 25)->create();

        $response = $this->json('GET', '/api/people');
        $response
            ->assertStatus(200)
            ->assertJsonCount(25, 'data');
    }

    public function testNoPersonRetrieved()
    {
        $person = factory('App\Models\Person')->create();
        Person::destroy($person->id);

        $response = $this->json('GET', '/api/people/' . $person->id);
        $response->assertStatus(404);
    }

	public function testPeopleInGroupRetrieved()
	{
		$group = factory('App\Models\Group')->create();

		// Create some people in the group and some people not in the group
		$person = factory('App\Models\Person', 4)->create();
		$person = factory('App\Models\Person', 4)
					->create(['group_id' => $group->id]);

		$response = $this->json('GET', '/api/people/?group_id=' . $group->id);
		$response
			->assertStatus(200)
			->assertJsonCount(4, 'data');
	}

	public function testActivePeopleRetrieved()
	{
		$person = factory('App\Models\Person', 4)->create(['status' => 'archived']);
		$person = factory('App\Models\Person', 4)->create(['status' => 'active']);

		// Only GET active people; assert only active people are fetched
		$response = $this->json('GET', '/api/people/?status=active');
		$response
			->assertStatus(200)
			->assertJsonCount(4, 'data');
	}

    public function testPersonUpdated()
    {
        $person = factory('App\Models\Person')->create();

        $updatedFirstName = $this->faker->firstName();
        $response = $this->json('PUT', '/api/people/' . $person->id, [
            'first_name' => $updatedFirstName
        ]);
        $response->assertStatus(204);

        $updatedPerson = Person::find($person->id);
        $this->assertEquals($updatedFirstName, $updatedPerson->first_name);
    }

    public function testPersonDeleted()
    {
        $person = factory('App\Models\Person')->create();

        $deleteResponse = $this->json('DELETE', '/api/people/' . $person->id);
        $deleteResponse->assertStatus(204);

        $response = $this->json('GET', '/api/people/' . $person->id);
        $response->assertStatus(404);

    }
}
