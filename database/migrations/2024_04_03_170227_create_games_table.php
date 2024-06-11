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
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->string('acronym')->unique();
            $table->string('name');
            $table->string('questions');
            $table->decimal('maximum_points');
            $table->time('timer');
            $table->timestamps();
            $table->foreignId('discipline_id')->constrained('disciplines');
            $table->foreignId('group_id')->constrained('groups');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
