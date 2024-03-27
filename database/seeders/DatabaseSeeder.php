<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Enterprise\Enterprise;
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

        Enterprise::create([])->users()->create([
            'name' => 'pericles',
            'email' => 'pericles@example.com',
            'password' => Hash::make('senha123'),
            'email_verified_at' => date(time()),
        ])->permission()->create();
    }
}
