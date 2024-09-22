<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'John Doe',
            'email' => 'test@codedjen.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
        ]);
    }
}
