<?php

namespace App\Models;
use App\Models\Group;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'email_address',
        'status',
        'group_id'
    ];

    public function group()
    {
        $this->belongsTo('App\Models\Group');
    }
}
