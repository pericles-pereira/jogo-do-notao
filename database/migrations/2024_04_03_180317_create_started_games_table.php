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
        Schema::create('started_games', function (Blueprint $table) {
            $table->id();
            $table->string('player_name');
            $table->string('room_code', 4)->unique();
            $table->time('timer');
            $table->decimal('maximum_points');
            $table->boolean('in_game')->default(false);
            $table->timestamps();
            $table->foreignId('game_id')->constrained('games');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('started_games');
    }
};
