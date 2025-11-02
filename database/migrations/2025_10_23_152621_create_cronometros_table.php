<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cronometros', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('ticket');
            $table->integer('phone')->nullable();
            $table->timestamp('hora_inicio')->nullable();
            $table->timestamp('hora_final')->nullable();
            $table->bigInteger('tiempo_pausado')->default(0); // en milisegundos
            $table->enum('estado', ['activo', 'pausado', 'detenido'])->default('detenido');
            $table->foreignId('creado_por')->constrained('users');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cronometros');
    }
};
