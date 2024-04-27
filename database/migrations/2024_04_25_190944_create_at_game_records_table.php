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
        Schema::create('at_game_records', function (Blueprint $table) {
            $table->id();
            $table->string('question');
            $table->string('options');
            $table->integer('response');
            $table->time('timer');
            $table->timestamps();
            $table->foreignId('question_id')->constrained('questions');
            $table->foreignId('started_game_id')->constrained('started_games')->cascadeOnDelete();
            $table->unique('started_game_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('at_game_records');
    }
};
