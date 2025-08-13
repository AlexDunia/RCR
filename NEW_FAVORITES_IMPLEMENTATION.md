# New Favorites Implementation - Backend Integration Guide

## Overview

A new backend-integrated favorites page has been created alongside the existing localStorage-based favorites. This new implementation provides secure, user-specific favorites management with proper authentication.

## Routes & Components

### Original Route (Unchanged)
- **Route**: `/client/favourites`
- **Component**: `FavouritesView.vue` (original localStorage-based)
- **Functionality**: Uses localStorage for favorites storage

### New Backend-Integrated Route
- **Route**: `/client/my-favorites/:userId`
- **Component**: `MyFavoritesView.vue` (new backend-integrated)
- **Functionality**: Fetches favorites from Laravel API with user authentication

## Frontend Implementation Details

### 1. New Component: `MyFavoritesView.vue`
```vue
// Location: src/views/client/MyFavoritesView.vue
// Features:
- Global header integration
- User authentication validation
- Backend API calls
- Property grid with search/filter
- Real-time favorite toggling
- Loading/error/empty states
```

### 2. Route Configuration
```javascript
// Added to src/router/index.js
{
  path: 'my-favorites/:userId',
  name: 'ClientMyFavorites',
  component: () => import('@/views/client/MyFavoritesView.vue'),
  meta: {
    title: 'My Saved Properties',
    description: 'View your favorite properties from database and TREB',
    requiresAuth: true
  }
}
```

### 3. Navigation Integration
```vue
// Added to src/layouts/ClientLayout.vue
<router-link :to="`/client/my-favorites/${user?.id}`" class="nav-item">
  <span>My Saved Properties</span>
</router-link>
```

## Backend API Requirements

### Authentication
All API calls include Bearer token authentication:
```javascript
headers: {
  'Authorization': `Bearer ${authStore.token}`,
  'Accept': 'application/json'
}
```

### Security Validation
The frontend validates that users can only access their own favorites:
```javascript
// Frontend validation
const currentUserId = authStore.user?.id
if (!currentUserId || currentUserId.toString() !== userId.value) {
  throw new Error('You can only view your own favorites')
}
```

### API Endpoints Used

#### 1. GET `/api/favorites` - Fetch User Favorites
**Frontend Request:**
```javascript
const response = await fetch('/api/favorites', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json'
  }
});
```

**Expected Backend Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "property_id": "123",
      "property_type": "local",
      "created_at": "2025-08-06T19:33:12.000000Z",
      "property_data": {
        "id": 123,
        "name": "Beautiful House",
        "price": 750000,
        "address": "123 Main St",
        "city": "Toronto",
        "state": "ON",
        "bedrooms": 3,
        "bathrooms": 2,
        "size": 1500,
        "image": "https://example.com/image.jpg"
      }
    },
    {
      "id": 2,
      "property_id": "X12293106",
      "property_type": "treb",
      "created_at": "2025-08-06T19:35:45.000000Z",
      "property_data": {
        "ListingKey": "X12293106",
        "ListPrice": 850000,
        "Address": "456 Oak Ave, Toronto, ON",
        "PublicRemarks": "Stunning property with modern amenities...",
        "BedroomsTotal": 4,
        "BathroomsTotalInteger": 3,
        "ApproximateSquareFootage": 2000
      }
    }
  ]
}
```

#### 2. POST `/api/favorites` - Toggle Favorite Status
**Frontend Request:**
```javascript
const response = await fetch('/api/favorites', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    property_id: "123",
    property_type: "local"
  })
});
```

**Expected Backend Response (Added):**
```json
{
  "success": true,
  "message": "Property added to favorites",
  "action": "added",
  "data": {
    "id": 1,
    "property_id": "123",
    "property_type": "local",
    "created_at": "2025-08-06T19:33:12.000000Z"
  }
}
```

**Expected Backend Response (Removed):**
```json
{
  "success": true,
  "message": "Property removed from favorites",
  "action": "removed",
  "data": {
    "property_id": "123",
    "property_type": "local"
  }
}
```

## Backend Implementation Requirements

### 1. Database Schema (Already Implemented)
```sql
CREATE TABLE favorites (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    property_id VARCHAR(255) NOT NULL,
    property_type ENUM('local', 'treb') NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_property (user_id, property_id, property_type)
);
```

### 2. Controller Methods Required

#### GET `/api/favorites` - Enhanced Response
Your existing `index()` method should include full property data:

```php
public function index(): JsonResponse
{
    $user = Auth::user();
    
    if (!$user) {
        return response()->json([
            'success' => false,
            'message' => 'User not authenticated'
        ], 401);
    }

    // Get favorites with property data
    $favorites = $user->favorites()
        ->select('id', 'property_id', 'property_type', 'created_at')
        ->get()
        ->map(function ($favorite) {
            // Fetch full property data based on type
            $propertyData = null;
            
            if ($favorite->property_type === 'local') {
                // Fetch from your properties table
                $propertyData = Property::find($favorite->property_id);
            } elseif ($favorite->property_type === 'treb') {
                // Fetch from TREB API or cached data
                $propertyData = $this->fetchTrebProperty($favorite->property_id);
            }
            
            return [
                'id' => $favorite->id,
                'property_id' => $favorite->property_id,
                'property_type' => $favorite->property_type,
                'created_at' => $favorite->created_at,
                'property_data' => $propertyData
            ];
        });

    return response()->json([
        'success' => true,
        'data' => $favorites
    ]);
}
```

### 3. Security Considerations
- ✅ Authentication via Laravel Sanctum (already implemented)
- ✅ User can only access their own favorites (enforced by relationship)
- ✅ Input validation on property_id and property_type
- ✅ Unique constraints prevent duplicates

### 4. Frontend Property Data Processing
The frontend expects these property fields:

**For Local Properties (`property_type: 'local'`):**
```javascript
{
  id: number,
  name: string,
  price: number,
  address: string,
  city: string,
  state: string,
  bedrooms: number,
  bathrooms: number,
  size: number,
  image: string
}
```

**For TREB Properties (`property_type: 'treb'`):**
```javascript
{
  ListingKey: string,
  ListPrice: number,
  Address: string,
  PublicRemarks: string,
  BedroomsTotal: number,
  BathroomsTotalInteger: number,
  ApproximateSquareFootage: number
}
```

## Testing the Implementation

### Frontend URLs to Test:
1. **Original Favorites**: `http://localhost:3000/client/favourites`
2. **New Backend Favorites**: `http://localhost:3000/client/my-favorites/123` (replace 123 with actual user ID)

### API Endpoints to Test:
1. **GET** `/api/favorites` with Bearer token
2. **POST** `/api/favorites` with property data and Bearer token

### Expected User Flow:
1. User logs in and navigates to "My Saved Properties"
2. Frontend validates user can access their own favorites
3. Frontend calls `GET /api/favorites` with authentication
4. Backend returns favorites with full property data
5. User can toggle favorites (calls `POST /api/favorites`)
6. Frontend updates UI in real-time

## Key Differences from Original

| Feature | Original (`/client/favourites`) | New (`/client/my-favorites/:userId`) |
|---------|--------------------------------|-------------------------------------|
| Storage | localStorage | Laravel Database |
| Authentication | None | Required |
| User-Specific | No | Yes (by user ID) |
| Real-time Sync | No | Yes |
| Property Data | Static | Dynamic from API |
| Backend Integration | None | Full |

## Navigation Structure
Users now have access to both:
- **"Favourites"** → Original localStorage version
- **"My Saved Properties"** → New backend-integrated version

This allows for a gradual migration while maintaining backward compatibility.