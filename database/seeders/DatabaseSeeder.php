<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Groups\Category\Category;
use App\Models\Groups\Group;
use App\Models\Users\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\Users\User::factory(10)->create();

        DB::transaction(function () {
            $user = Group::create(['name' => 'Grupo 1'])->user()->create([
                'name' => 'pericles',
                'email' => 'pericles@example.com',
                'password' => Hash::make('senha123'),
                'email_verified_at' => date(time()),
                'group_admin' => true
            ]);

            $user->permission()->create(['master' => true]);

            $category = $user->group->category()->create(['name' => 'categoria1']);

            for ($i = 0; $i < 10; $i++) {
                $category->question()->create([
                    'statement' => 'Socorro - Questão ' . $i + 1,
                    'correct_option' => 'Socorro ' . $i + 1 . ' - Opção Correta',
                    'wrong_option1' => 'Socorro ' . $i + 1,
                    'wrong_option2' => 'Socorro ' . $i + 1,
                    'wrong_option3' => 'Socorro ' . $i + 1,
                    'wrong_option4' => 'Socorro ' . $i + 1,
                    'category_id' => 1,
                    'difficulty' => random_int(1, 6),
                ]);
            }

            $user->group->game()->create(['name' => 'Jogo 1', 'acronym' => 'JOG001', 'questions' => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]);
        });
    }
}
