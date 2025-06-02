<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class AuthController extends BaseController
{
    /**
     * Register a new user
     */
    public function register(Request $request)
    {
        // Validate request data
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', Password::min(8)
                ->mixedCase()
                ->numbers()
                ->uncompromised()],
            'role' => ['required', 'string', 'in:client,agent'],
            'device_name' => ['required', 'string']
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors());
        }

        try {
            // Create user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => $request->role
            ]);

            // Create token with role as ability
            $token = $user->createToken($request->device_name, [$request->role])->plainTextToken;

            return $this->successResponse([
                'user' => $user,
                'token' => $token
            ], 'User registered successfully');

        } catch (\Exception $e) {
            return $this->errorResponse('Registration failed: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Login user
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
            'device_name' => ['required', 'string']
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors());
        }

        // Find user
        $user = User::where('email', $request->email)->first();

        // Check password
        if (!$user || !Hash::check($request->password, $user->password)) {
            return $this->errorResponse('Invalid credentials', 401);
        }

        // Create token with role as ability
        $token = $user->createToken($request->device_name, [$user->role])->plainTextToken;

        return $this->successResponse([
            'user' => $user,
            'token' => $token
        ], 'Login successful');
    }

    /**
     * Logout user
     */
    public function logout(Request $request)
    {
        try {
            // Revoke all tokens
            $request->user()->currentAccessToken()->delete();
            
            return $this->successResponse(null, 'Logged out successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('Logout failed: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Get authenticated user
     */
    public function user(Request $request)
    {
        try {
            return $this->successResponse($request->user());
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to get user data: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Verify token
     */
    public function verifyToken(Request $request)
    {
        try {
            $user = $request->user();
            return $this->successResponse([
                'valid' => true,
                'user' => $user
            ]);
        } catch (\Exception $e) {
            return $this->errorResponse('Token invalid', 401);
        }
    }
} 