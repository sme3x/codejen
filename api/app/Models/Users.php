<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\FullTextSearch;

class Users extends Model
{
    use HasFactory, FullTextSearch;

    protected $table = "userss";

    protected $guarded = [];

    protected $searchable = [
    ];

}
