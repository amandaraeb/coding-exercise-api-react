<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\GroupsCollection;
use App\Http\Resources\GroupResource;
use App\Models\Group;

class GroupsController extends Controller
{
    public function index()
    {
        return new GroupsCollection(Group::all());
    }

    public function show($id)
    {
        return new GroupResource(Group::findOrFail($id));
    }

    public function store(Request $request)
    {
        $group = Group::create($request->all());

        return (new GroupResource($group))
            ->response()
            ->setStatusCode(201);
    }

    public function update(Request $request, $id)
    {
        $group = Group::findOrFail($id);
        $group->update($request->all());

        return response()->json(null, 204);
    }

    public function destroy(Request $request, $id)
    {
        $group = Group::findOrFail($id);
        $group->delete();

        return response()->json(null, 204);
    }
}
