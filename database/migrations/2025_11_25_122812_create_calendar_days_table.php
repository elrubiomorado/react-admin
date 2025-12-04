<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('calendar_days', function (Blueprint $table) {
            $table->id();
            // Referencia a la cabecera en `calendars`
            $table->foreignId('calendar_id')->constrained('calendars')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->date('date');
            $table->string('shift_type')->nullable(); // day, night, off, holiday
            $table->string('color')->nullable();
            $table->text('note')->nullable();
            $table->timestamps();

            $table->unique(['calendar_id', 'date']); // evita duplicados por día dentro de la misma cabecera
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('calendar_days');
    }
};
