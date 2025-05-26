<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AllblogpostController;
use App\Http\Controllers\API\AuthController;

// Public routes
Route::middleware(['throttle:60,1'])->group(function () {
    Route::get('/allblogposts', [AllblogpostController::class, 'index']);

    // Auth routes with specific rate limiting
    Route::prefix('auth')->group(function () {
        // Init route - less strict rate limiting
        Route::get('/init', [AuthController::class, 'initializeAuth'])
            ->middleware('throttle:60,1');

        // Login/Register - stricter rate limiting
        Route::middleware(['throttle:5,1'])->group(function () {
            Route::post('/register', [AuthController::class, 'register']);
            Route::post('/login', [AuthController::class, 'login']);
        });
    });
});

// Protected routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::prefix('auth')->group(function () {
        Route::get('/user', [AuthController::class, 'getCurrentUser']);
        Route::get('/verify', [AuthController::class, 'verifyToken']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });

    // Agent-only routes
    Route::middleware(['role:agent'])->group(function () {
        // Add agent-specific routes here
    });

    // Client-only routes
    Route::middleware(['role:client'])->group(function () {
        // Add client-specific routes here
    });
}); 