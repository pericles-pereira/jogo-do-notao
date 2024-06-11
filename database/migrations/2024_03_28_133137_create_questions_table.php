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
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->string('statement', 500);
            $table->string('correct_option');
            $table->string('wrong_option1');
            $table->string('wrong_option2');
            $table->string('wrong_option3');
            $table->string('wrong_option4');
            $table->enum('difficulty', [1, 2, 3, 4, 5, 6]);
            $table->timestamps();
            $table->foreignId('discipline_id')->constrained('disciplines');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
