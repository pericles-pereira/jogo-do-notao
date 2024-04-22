<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('finished_games', function (Blueprint $table) {
            $table->id();
            $table->string('player_name');
            $table->string('correct_responses');
            $table->string('in_minutes');
            $table->decimal('points');
            $table->timestamps();
            $table->foreignId('game_id')->constrained('games');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('finished_games');
    }
};
