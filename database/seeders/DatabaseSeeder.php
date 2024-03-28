<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Groups\Group;
use App\Models\Users\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\Users\User::factory(10)->create();

        Group::create(['name' => 'Grupo 1'])->user()->create([
            'name' => 'pericles',
            'email' => 'pericles@example.com',
            'password' => Hash::make('senha123'),
            'email_verified_at' => date(time()),
            'group_admin' => true
        ])->permission()->create(['master' => true]);
    }
}
