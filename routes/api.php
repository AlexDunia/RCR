<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AllblogpostController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\AgentController;
use App\Http\Controllers\API\ClientController;

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

    // Agent routes
    Route::middleware(['role:agent'])->prefix('agent')->group(function () {
        Route::get('/dashboard', [AgentController::class, 'dashboard']);
        Route::post('/listings', [AgentController::class, 'createListing']);
        Route::put('/profile', [AgentController::class, 'updateProfile']);
        
        // Add more agent-specific routes here
    });

    // Client routes
    Route::middleware(['role:client'])->prefix('client')->group(function () {
        Route::get('/dashboard', [ClientController::class, 'dashboard']);
        Route::post('/favorites', [ClientController::class, 'addToFavorites']);
        Route::get('/favorites', [ClientController::class, 'getFavorites']);
        
        // New comprehensive favorite routes
        Route::post('/favorites/add', [ClientController::class, 'addToFavoritesWithDetails']);
        Route::post('/favorites/remove', [ClientController::class, 'removeFromFavorites']);
        Route::post('/favorites/check', [ClientController::class, 'checkFavoriteStatus']);
        Route::get('/favorites/all', [ClientController::class, 'getAllFavorites']);
        
        // Add more client-specific routes here
    });
}); 