<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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

        $user = \App\Models\Users\User::factory()->create([
            'name' => 'pericles',
            'email' => 'pericles@example.com',
            'password' => Hash::make('senha123'),
        ]);

        $user->permission()->create();
    }
}
