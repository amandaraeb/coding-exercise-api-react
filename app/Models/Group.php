<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $fillable = [
        'group_name'
    ];

    public function person()
    {
        return $this->hasMany('App\Models\Person');
    }
}
