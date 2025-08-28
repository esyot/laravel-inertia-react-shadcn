@extends('layouts.app')

@section('content')
    <div class="fixed inset-0 flex items-center justify-center bg-gray-200">
        <div class="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md text-center">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Where would you like to go?</h2>

            <div class="space-y-4">
                <a href="/instructions/setup"
                    class="block w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-200">
                    Go to Setup
                </a>

                <a href="/instructions/requirements"
                    class="block w-full bg-green-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition duration-200">
                    Go to Requirements
                </a>
            </div>
        </div>
    </div>
@endsection