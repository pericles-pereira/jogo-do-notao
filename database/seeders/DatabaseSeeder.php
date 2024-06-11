<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Groups\Disciplines\Discipline;
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

            $discipline = $user->group->discipline()->create(['name' => 'disciplina1']);

            for ($i = 0; $i < 10; $i++) {
                $discipline->question()->create([
                    'statement' => 'Socorro - Questão ' . $i + 1,
                    'correct_option' => 'Socorro ' . $i + 1 . ' - Opção Correta',
                    'wrong_option1' => 'Socorro ' . $i + 1,
                    'wrong_option2' => 'Socorro ' . $i + 1,
                    'wrong_option3' => 'Socorro ' . $i + 1,
                    'wrong_option4' => 'Socorro ' . $i + 1,
                    'discipline_id' => 1,
                    'difficulty' => random_int(1, 6),
                ]);
            }

            $user->group->game()->create([
                'name' => 'Jogo 1',
                'acronym' => 'JOG001',
                'questions' => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                'maximum_points' => 2,
                'timer' => '00:04:12',
                'discipline_id' => 1
            ]);
        });
    }
}
