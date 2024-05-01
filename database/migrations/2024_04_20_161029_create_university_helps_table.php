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
        Schema::create('university_helps', function (Blueprint $table) {
            $table->id();
            $table->string('question');
            $table->string('options');
            $table->integer('response')->nullable()->default(null);
            $table->boolean('used')->default(false);
            $table->time('timer');
            $table->timestamps();
            $table->foreignId('started_game_id')->constrained('started_games')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('university_helps');
    }
};
