@extends('layouts.app')

@section('content')
    <div class="max-w-4xl mx-auto py-10 px-4">
        <header class="mb-12 border-b pb-6">
            <a href="{{ route('instructions.index') }}"
                class="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded hover:underline cursor-pointer">
                Back
            </a>
            <h1 class="text-4xl font-extrabold text-gray-900 mb-2">Electric Billing System</h1>

        </header>
        <div class="bg-white rounded-lg shadow p-6 mb-6">
            <h3 class="text-xl font-semibold mb-4">Customers</h3>
            <ul class="list-disc list-inside space-y-1 text-gray-700">
                <li>Each customer has a <strong>unique account number</strong>.</li>
                <li>Each customer has <strong>one electric meter installed</strong>.</li>
            </ul>
        </div>


        <div class="bg-white rounded-lg shadow p-6 mb-6">
            <h3 class="text-xl font-semibold mb-4">Billing</h3>
            <ul class="list-disc list-inside space-y-1 text-gray-700">
                <li>System generates a bill <strong>monthly</strong> based on meter readings.</li>
                <li>All bills have a <strong>due date</strong>.</li>
            </ul>
        </div>


        <div class="bg-white rounded-lg shadow p-6 mb-6">
            <h3 class="text-xl font-semibold mb-4">Payments</h3>
            <ul class="list-disc list-inside space-y-1 text-gray-700">
                <li>Payments can be recorded at the company’s cashier office.</li>
                <li>Payments must be linked to the correct <strong>customer account</strong>.</li>
            </ul>
        </div>

        <div class="bg-white rounded-lg shadow p-6 mb-6">
            <h3 class="text-xl font-semibold mb-4">Problems to Solve</h3>
            <ul class="list-disc list-inside space-y-1 text-gray-700">
                <li>Eliminate manual spreadsheets.</li>
                <li>Ensure <strong>unique account numbers</strong>.</li>
                <li>Track <strong>overdue bills</strong> and apply penalties automatically.</li>
                <li>Show customers their <strong>outstanding balances</strong> and payment history.</li>
            </ul>
        </div>


        <div class="bg-white rounded-lg shadow p-6 mb-6">
            <h3 class="text-xl font-semibold mb-4">System Goals</h3>
            <ul class="list-disc list-inside space-y-1 text-gray-700">
                <li>Store <strong>customer</strong> and <strong>meter</strong> information.</li>
                <li>Automatically generate <strong>monthly bills</strong>.</li>
                <li>Accept and record <strong>payments</strong>.</li>
                <li>Track <strong>overdue bills</strong> and apply <strong>penalties</strong>.</li>
                <li>Allow customers to <strong>view their bills and payments</strong>.</li>
            </ul>
        </div>
    </div>
@endsection