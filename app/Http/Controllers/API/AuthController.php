<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function initializeAuth()
    {
        try {
            return response()->json([
                'message' => 'Auth initialized successfully',
                'csrf_token' => csrf_token()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to initialize authentication',
                'error' => $e->getMessage()
            ], 500);
        }
    }
} 