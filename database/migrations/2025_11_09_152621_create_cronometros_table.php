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
            $table->string('title')->unique();
            $table->integer('ticket')->unique();
            $table->timestamp('start');          // obligatorio
            $table->timestamp('end')->nullable(); // puede estar vacío al inicio

            $table->foreignId('priority_id')->constrained()->onDelete('restrict'); // obligatorio
            $table->foreignId('type_id')->constrained()->onDelete('restrict');     // obligatorio
            $table->foreignId('status_id')->constrained()->default(1)->onDelete('restrict'); // obligatorio
            $table->foreignId('user_id')->constrained()->onDelete('restrict');     // obligatorio
            $table->foreignId('place_id')->constrained()->onDelete('restrict');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cronometros');
    }
};
