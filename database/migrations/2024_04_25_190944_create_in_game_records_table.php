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
        Schema::create('in_game_records', function (Blueprint $table) {
            $table->id();
            $table->string('response');
            $table->string('in_minutes');
            $table->decimal('points');
            $table->timestamps();
            $table->foreignId('question_id')->constrained('questions');
            $table->foreignId('started_game_id')->constrained('started_games')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('in_game_records');
    }
};
