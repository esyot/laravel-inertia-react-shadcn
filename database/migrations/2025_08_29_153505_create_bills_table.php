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
        Schema::create('bills', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id')
                ->constrained('customers')
                ->onDelete('cascade');
            $table->string('billing_month');
            $table->decimal('amount_due', 10, 2);
            $table->decimal('penalty', 10, 2)->default(0);
            $table->enum('status', ['Unpaid', 'Paid','Overdue'])->default('unpaid');
            $table->date('due_date')->nullable();
            $table->decimal('total_amount_due', 10, 2)->default(0);
            $table->date('payment_date')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bills');
    }
};
