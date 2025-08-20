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
        Schema::create('referral_links', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Display name for the referral link');
            $table->text('url')->comment('The actual referral URL');
            $table->text('description')->nullable()->comment('Link description');
            $table->integer('click_count')->default(0)->comment('Number of times link was clicked');
            $table->json('social_shares')->nullable()->comment('Social media share counts');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('user_id');
            $table->index('category_id');
            $table->index(['user_id', 'category_id']);
            $table->index('click_count');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('referral_links');
    }
};