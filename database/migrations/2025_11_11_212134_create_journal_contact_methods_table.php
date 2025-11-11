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
        Schema::create('journal_contact_methods', function (Blueprint $table) {
            $table->id(); // opcional, pero recomendable si tu modelo lo usará directamente
            $table->foreignId('journal_id')->constrained()->onDelete('cascade');
            $table->foreignId('contact_method_id')->constrained()->onDelete('cascade');
            $table->boolean('responded');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('journal_contact_methods');
    }
};
