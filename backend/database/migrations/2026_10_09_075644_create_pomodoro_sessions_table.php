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
    Schema::create('pomodoro_sessions', function (Blueprint $table) {
        $table->id();

        $table->foreignId('user_id')
              ->constrained('users')
              ->onDelete('cascade');

        $table->string('mode'); // focus atau break
        $table->unsignedInteger('duration'); // menit

        $table->timestamp('started_at')->nullable();
        $table->timestamp('ended_at')->nullable();

        $table->string('status')->default('running');

        $table->timestamps();
    });
}

public function down(): void
{
    Schema::dropIfExists('pomodoro_sessions');
}
};
