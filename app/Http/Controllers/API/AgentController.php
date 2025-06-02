<?php

namespace App\Http\Controllers\API;

use App\Models\Listing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AgentController extends BaseController
{
    /**
     * Get agent dashboard data
     */
    public function dashboard(Request $request)
    {
        try {
            $agent = $request->user();
            
            // Get agent's listings
            $listings = Listing::where('agent_id', $agent->id)
                ->withCount('views')
                ->withCount('inquiries')
                ->get();

            // Get recent inquiries
            $recentInquiries = $agent->inquiries()
                ->with('listing')
                ->latest()
                ->take(5)
                ->get();

            return $this->successResponse([
                'agent' => $agent,
                'listings_count' => $listings->count(),
                'total_views' => $listings->sum('views_count'),
                'total_inquiries' => $listings->sum('inquiries_count'),
                'recent_inquiries' => $recentInquiries
            ]);
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to fetch dashboard data: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Create a new listing
     */
    public function createListing(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'location' => ['required', 'string'],
            'property_type' => ['required', 'string', 'in:house,apartment,condo,land'],
            'status' => ['required', 'string', 'in:available,pending,sold'],
            'images.*' => ['image', 'mimes:jpeg,png,jpg', 'max:2048']
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors());
        }

        try {
            $listing = new Listing($request->all());
            $listing->agent_id = $request->user()->id;
            $listing->save();

            // Handle image uploads if any
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $path = $image->store('listings', 'public');
                    $listing->images()->create(['path' => $path]);
                }
            }

            return $this->successResponse($listing->load('images'), 'Listing created successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to create listing: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Update agent profile
     */
    public function updateProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['sometimes', 'string', 'max:255'],
            'phone' => ['sometimes', 'string', 'max:20'],
            'bio' => ['sometimes', 'string'],
            'specializations' => ['sometimes', 'array'],
            'avatar' => ['sometimes', 'image', 'mimes:jpeg,png,jpg', 'max:2048']
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors());
        }

        try {
            $agent = $request->user();
            $agent->update($request->except('avatar'));

            // Handle avatar upload if provided
            if ($request->hasFile('avatar')) {
                $path = $request->file('avatar')->store('avatars', 'public');
                $agent->avatar = $path;
                $agent->save();
            }

            return $this->successResponse($agent, 'Profile updated successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to update profile: ' . $e->getMessage(), 500);
        }
    }
} 