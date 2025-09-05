<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>BEC - Bohol Electric Company</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/esyot/freecon@6c5197e/freecon.css">
    <link rel="icon" type="image/x-icon" href="{{ asset('/assets/logo/logo.png') }}">

    @viteReactRefresh

    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    @inertiaHead
</head>

<body class="font-sans antialiased bg-sand text-gray-900">
    @inertia
</body>

</html>