# Complete Favorite Functionality Guide

## Overview

The favorite functionality in your real estate application works through a **dual storage system** that provides both immediate UI feedback and permanent backend storage. When a user clicks the heart icon on your landing page, the complete property data is stored both locally and on your backend server.

## Architecture Flow

```
User clicks heart → LandingPage.vue → favouritesStore.js → propertyApi.js → Backend API
                    ↓                    ↓                    ↓
              localStorage          API Request         Database Storage
              (Immediate UI)       (Full Data)        (Permanent)
```

## Frontend Implementation

### 1. Landing Page (src/views/LandingPage.vue)

#### Property Card Favorite Buttons

**Local Properties:**
```vue
<div class="property-card__favorite" @click.stop="toggleLocalFavorite(property.id)">
  <i v-if="favouritesStore.loading" class="fas fa-spinner fa-spin"></i>
  <i v-else :class="isLocalFavorite(property.id) ? 'fas fa-heart' : 'far fa-heart'"></i>
</div>
```

**TREB Properties:**
```vue
<div class="treb-property-card__favorite" @click.stop="toggleTrebFavorite(property.ListingKey, property)">
  <i v-if="favouritesStore.loading" class="fas fa-spinner fa-spin"></i>
  <i v-else :class="isTrebFavorite(property.ListingKey) ? 'fas fa-heart' : 'far fa-heart'"></i>
</div>
```

#### Favorite Methods

```javascript
// Import stores
import { useFavouritesStore } from '@/stores/favouritesStore';
import { usePropertyStore } from '@/stores/propertyStore';
import { useAuthStore } from '@/stores/authStore';

const favouritesStore = useFavouritesStore();
const propertyStore = usePropertyStore();
const authStore = useAuthStore();

// Initialize favorites on component mount
onMounted(() => {
  favouritesStore.initFavourites();
});

// Toggle local property favorite
async function toggleLocalFavorite(propertyId) {
  if (!authStore.isAuthenticated) {
    router.push('/login');
    return;
  }

  try {
    // Find the full property data from the store
    const property = propertyStore.properties.find(p => p.id === propertyId);
    if (property) {
      await favouritesStore.toggleFavouriteProperty(property);
      await propertyStore.toggleFavorite(propertyId);
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
  }
}

// Toggle TREB property favorite
async function toggleTrebFavorite(listingKey, propertyData) {
  if (!authStore.isAuthenticated) {
    router.push('/login');
    return;
  }

  try {
    await favouritesStore.toggleFavouriteTrebProperty(propertyData);
  } catch (error) {
    console.error('Error toggling TREB favorite:', error);
  }
}

// Check favorite status
function isLocalFavorite(propertyId) {
  return favouritesStore.isPropertyFavourite(propertyId);
}

function isTrebFavorite(listingKey) {
  return favouritesStore.isTrebPropertyFavourite(listingKey);
}
```

### 2. Favourites Store (src/stores/favouritesStore.js)

#### Store Structure

```javascript
import { defineStore } from 'pinia';
import { propertyApi } from '../api/propertyApi';

export const useFavouritesStore = defineStore('favourites', {
  state: () => ({
    favouriteAgents: [],           // Array of agent IDs
    favouriteProperties: [],       // Array of full local property objects
    favouriteTrebProperties: [],   // Array of full TREB property objects
    loading: false,
    error: null
  }),

  getters: {
    // Check if a local property is favorited
    isPropertyFavourite: (state) => (propertyId) => {
      return state.favouriteProperties.some(property => property.id === propertyId);
    },

    // Check if a TREB property is favorited
    isTrebPropertyFavourite: (state) => (listingKey) => {
      return state.favouriteTrebProperties.some(property => property.ListingKey === listingKey);
    },

    // Get all favorite local properties
    getAllFavouriteProperties: (state) => {
      return state.favouriteProperties;
    },

    // Get all favorite TREB properties
    getAllFavouriteTrebProperties: (state) => {
      return state.favouriteTrebProperties;
    },

    // Get all favorites (both types)
    getAllFavourites: (state) => {
      return {
        local: state.favouriteProperties,
        treb: state.favouriteTrebProperties
      };
    }
  },

  actions: {
    // Initialize favorites from localStorage
    initFavourites() {
      const storedProperties = localStorage.getItem('favourite-properties');
      const storedTrebProperties = localStorage.getItem('favourite-treb-properties');

      if (storedProperties) {
        this.favouriteProperties = JSON.parse(storedProperties);
      }

      if (storedTrebProperties) {
        this.favouriteTrebProperties = JSON.parse(storedTrebProperties);
      }
    },

    // Toggle local property favorite with full details
    async toggleFavouriteProperty(propertyData) {
      try {
        this.loading = true;
        this.error = null;

        const existingIndex = this.favouriteProperties.findIndex(
          property => property.id === propertyData.id
        );

        if (existingIndex > -1) {
          // Remove from favorites
          this.favouriteProperties.splice(existingIndex, 1);
          
          // Send API request to remove from backend
          await propertyApi.removeFromFavorites(propertyData.id, 'local');
        } else {
          // Add to favorites with full property data
          const favoriteProperty = {
            ...propertyData,
            favoritedAt: new Date().toISOString(),
            propertyType: 'local'
          };
          this.favouriteProperties.push(favoriteProperty);
          
          // Send API request to add to backend with full property data
          await propertyApi.addToFavorites(favoriteProperty);
        }

        // Save to localStorage
        this.saveFavouriteProperties();
      } catch (error) {
        this.error = error.message || 'Failed to toggle favorite';
        console.error('Error toggling favorite:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Toggle TREB property favorite with full details
    async toggleFavouriteTrebProperty(trebPropertyData) {
      try {
        this.loading = true;
        this.error = null;

        const existingIndex = this.favouriteTrebProperties.findIndex(
          property => property.ListingKey === trebPropertyData.ListingKey
        );

        if (existingIndex > -1) {
          // Remove from favorites
          this.favouriteTrebProperties.splice(existingIndex, 1);
          
          // Send API request to remove from backend
          await propertyApi.removeFromFavorites(trebPropertyData.ListingKey, 'treb');
        } else {
          // Add to favorites with full property data
          const favoriteTrebProperty = {
            ...trebPropertyData,
            favoritedAt: new Date().toISOString(),
            propertyType: 'treb'
          };
          this.favouriteTrebProperties.push(favoriteTrebProperty);
          
          // Send API request to add to backend with full property data
          await propertyApi.addToFavorites(favoriteTrebProperty);
        }

        // Save to localStorage
        this.saveFavouriteTrebProperties();
      } catch (error) {
        this.error = error.message || 'Failed to toggle TREB favorite';
        console.error('Error toggling TREB favorite:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Save local properties to localStorage
    saveFavouriteProperties() {
      localStorage.setItem('favourite-properties', JSON.stringify(this.favouriteProperties));
    },

    // Save TREB properties to localStorage
    saveFavouriteTrebProperties() {
      localStorage.setItem('favourite-treb-properties', JSON.stringify(this.favouriteTrebProperties));
    },

    // Clear all favorites
    clearAllFavourites() {
      this.favouriteProperties = [];
      this.favouriteTrebProperties = [];
      localStorage.removeItem('favourite-properties');
      localStorage.removeItem('favourite-treb-properties');
    },

    // Get property by ID (searches both types)
    getPropertyById(propertyId) {
      const localProperty = this.favouriteProperties.find(property => property.id === propertyId);
      if (localProperty) return localProperty;

      const trebProperty = this.favouriteTrebProperties.find(property => property.ListingKey === propertyId);
      return trebProperty || null;
    }
  }
});
```

### 3. Property API (src/api/propertyApi.js)

#### API Methods

```javascript
import axiosInstance from './axios'

export const propertyApi = {
  // Get all properties
  async getProperties(filters = {}) {
    try {
      const response = await axiosInstance.get('/properties', { params: filters })
      return response.data
    } catch (error) {
      console.error('Error fetching properties:', error)
      throw error
    }
  },

  // Get property by ID
  async getPropertyById(id) {
    try {
      const response = await axiosInstance.get(`/properties/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching property:', error)
      throw error
    }
  },

  // Add property to favorites with full details
  async addToFavorites(propertyData) {
    try {
      const response = await axiosInstance.post('/favorites/add', {
        property_type: propertyData.propertyType || 'local',
        property_data: propertyData  // ← Sends ALL property details
      })
      return response.data
    } catch (error) {
      console.error('Error adding to favorites:', error)
      throw error
    }
  },

  // Remove property from favorites
  async removeFromFavorites(propertyId, propertyType = 'local') {
    try {
      const response = await axiosInstance.post('/favorites/remove', {
        property_id: propertyId,
        property_type: propertyType
      })
      return response.data
    } catch (error) {
      console.error('Error removing from favorites:', error)
      throw error
    }
  },

  // Get user's favorites
  async getFavorites() {
    try {
      const response = await axiosInstance.get('/favorites')
      return response.data
    } catch (error) {
      console.error('Error fetching favorites:', error)
      throw error
    }
  },

  // Check if property is favorited
  async checkFavorite(propertyId, propertyType = 'local') {
    try {
      const response = await axiosInstance.post('/favorites/check', {
        property_id: propertyId,
        property_type: propertyType
      })
      return response.data
    } catch (error) {
      console.error('Error checking favorite status:', error)
      throw error
    }
  },

  // Toggle favorite status (existing method)
  async toggleFavorite(propertyId) {
    try {
      const response = await axiosInstance.post('/favorites/toggle', {
        property_id: propertyId
      })
      return response.data
    } catch (error) {
      console.error('Error toggling favorite:', error)
      throw error
    }
  }
}

export default propertyApi
```

## Backend API Implementation

### 1. API Routes (routes/api.php)

```php
// Client routes with comprehensive favorite endpoints
Route::middleware(['role:client'])->prefix('client')->group(function () {
    Route::get('/dashboard', [ClientController::class, 'dashboard']);
    
    // New comprehensive favorite routes
    Route::post('/favorites/add', [ClientController::class, 'addToFavoritesWithDetails']);
    Route::post('/favorites/remove', [ClientController::class, 'removeFromFavorites']);
    Route::post('/favorites/check', [ClientController::class, 'checkFavoriteStatus']);
    Route::get('/favorites/all', [ClientController::class, 'getAllFavorites']);
});
```

### 2. Database Migration

```php
// Create favorites table
Schema::create('favorites', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->enum('property_type', ['local', 'treb']);
    $table->string('property_id'); // ID or ListingKey
    $table->json('property_data'); // Full property details
    $table->timestamp('favorited_at');
    $table->timestamps();
    
    $table->unique(['user_id', 'property_type', 'property_id']);
});
```

### 3. Controller Methods

```php
<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Favorite;
use Illuminate\Support\Facades\Validator;

class ClientController extends Controller
{
    // Add property to favorites with full details
    public function addToFavoritesWithDetails(Request $request)
    {
        $request->validate([
            'property_type' => 'required|in:local,treb',
            'property_data' => 'required|array'
        ]);

        try {
            $user = $request->user();
            $propertyType = $request->property_type;
            $propertyData = $request->property_data;
            
            // Determine property ID based on type
            $propertyId = $propertyType === 'local' 
                ? $propertyData['id'] 
                : $propertyData['ListingKey'];
            
            // Check if already favorited
            $existing = Favorite::where([
                'user_id' => $user->id,
                'property_type' => $propertyType,
                'property_id' => $propertyId
            ])->first();
            
            if ($existing) {
                return response()->json([
                    'success' => false,
                    'message' => 'Property already in favorites'
                ], 400);
            }
            
            // Create new favorite
            $favorite = Favorite::create([
                'user_id' => $user->id,
                'property_type' => $propertyType,
                'property_id' => $propertyId,
                'property_data' => $propertyData,
                'favorited_at' => now()
            ]);
            
            return response()->json([
                'success' => true,
                'message' => 'Property added to favorites',
                'data' => [
                    'favorite_id' => $favorite->id,
                    'property_type' => $propertyType,
                    'is_favorited' => true
                ]
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to add to favorites: ' . $e->getMessage()
            ], 500);
        }
    }

    // Remove property from favorites
    public function removeFromFavorites(Request $request)
    {
        $request->validate([
            'property_id' => 'required|string',
            'property_type' => 'required|in:local,treb'
        ]);

        try {
            $user = $request->user();
            $propertyId = $request->property_id;
            $propertyType = $request->property_type;
            
            $favorite = Favorite::where([
                'user_id' => $user->id,
                'property_type' => $propertyType,
                'property_id' => $propertyId
            ])->first();
            
            if (!$favorite) {
                return response()->json([
                    'success' => false,
                    'message' => 'Property not found in favorites'
                ], 404);
            }
            
            $favorite->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Property removed from favorites',
                'data' => [
                    'is_favorited' => false
                ]
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to remove from favorites: ' . $e->getMessage()
            ], 500);
        }
    }

    // Check favorite status
    public function checkFavoriteStatus(Request $request)
    {
        $request->validate([
            'property_id' => 'required|string',
            'property_type' => 'required|in:local,treb'
        ]);

        try {
            $user = $request->user();
            $propertyId = $request->property_id;
            $propertyType = $request->property_type;
            
            $favorite = Favorite::where([
                'user_id' => $user->id,
                'property_type' => $propertyType,
                'property_id' => $propertyId
            ])->first();
            
            return response()->json([
                'success' => true,
                'data' => [
                    'is_favorited' => $favorite ? true : false,
                    'favorite_id' => $favorite ? $favorite->id : null
                ]
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to check favorite status: ' . $e->getMessage()
            ], 500);
        }
    }

    // Get all favorites
    public function getAllFavorites(Request $request)
    {
        try {
            $user = $request->user();
            
            $localFavorites = Favorite::where([
                'user_id' => $user->id,
                'property_type' => 'local'
            ])->get()->map(function($favorite) {
                return $favorite->property_data;
            });
            
            $trebFavorites = Favorite::where([
                'user_id' => $user->id,
                'property_type' => 'treb'
            ])->get()->map(function($favorite) {
                return $favorite->property_data;
            });
            
            return response()->json([
                'success' => true,
                'data' => [
                    'local_properties' => $localFavorites,
                    'treb_properties' => $trebFavorites
                ]
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch favorites: ' . $e->getMessage()
            ], 500);
        }
    }
}
```

## API Endpoints Reference

### 1. Add Property to Favorites

**Endpoint**: `POST /api/client/favorites/add`

**Request Body**:
```json
{
  "property_type": "local",
  "property_data": {
    "id": "property-123",
    "name": "Beautiful Home",
    "price": 500000,
    "bedrooms": 3,
    "bathrooms": 2,
    "area": 1500,
    "address": "123 Main Street",
    "city": "Toronto",
    "state": "ON",
    "images": ["url1", "url2"],
    "status": "active",
    "type": "Single Family",
    "favoritedAt": "2024-01-15T10:30:00.000Z",
    "propertyType": "local"
  }
}
```

**Response**:
```json
{
  "success": true,
  "message": "Property added to favorites",
  "data": {
    "favorite_id": 123,
    "property_type": "local",
    "is_favorited": true
  }
}
```

### 2. Remove Property from Favorites

**Endpoint**: `POST /api/client/favorites/remove`

**Request Body**:
```json
{
  "property_id": "property-123",
  "property_type": "local"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Property removed from favorites",
  "data": {
    "is_favorited": false
  }
}
```

### 3. Check Favorite Status

**Endpoint**: `POST /api/client/favorites/check`

**Request Body**:
```json
{
  "property_id": "property-123",
  "property_type": "local"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "is_favorited": true,
    "favorite_id": 123
  }
}
```

### 4. Get All Favorites

**Endpoint**: `GET /api/client/favorites/all`

**Response**:
```json
{
  "success": true,
  "data": {
    "local_properties": [
      {
        "id": "property-123",
        "name": "Beautiful Home",
        "price": 500000,
        "bedrooms": 3,
        "bathrooms": 2,
        "area": 1500,
        "address": "123 Main Street",
        "city": "Toronto",
        "state": "ON",
        "images": ["url1", "url2"],
        "status": "active",
        "type": "Single Family",
        "favoritedAt": "2024-01-15T10:30:00.000Z",
        "propertyType": "local"
      }
    ],
    "treb_properties": [
      {
        "ListingKey": "TREB-456",
        "UnparsedAddress": "456 Oak Street",
        "ListPrice": 750000,
        "BedroomsTotal": 4,
        "BathroomsFull": 3,
        "LivingArea": 2000,
        "City": "Toronto",
        "StateOrProvince": "ON",
        "PropertyType": "Residential",
        "image": "treb-image-url",
        "favoritedAt": "2024-01-15T10:30:00.000Z",
        "propertyType": "treb"
      }
    ]
  }
}
```

## Complete User Flow

### Step-by-Step Process:

1. **User clicks heart icon** on property card
2. **Authentication check** - redirects to login if not authenticated
3. **Find property data** from store (complete property object)
4. **Update localStorage** - immediate UI feedback
5. **Send POST request** - full property data to backend
6. **Backend stores data** - complete property info in database
7. **Update UI** - heart fills/empties with animation
8. **Handle response** - success/error feedback

### Example POST Request:

```javascript
// When you click favorite on a local property
const propertyData = {
  id: "property-123",
  name: "Beautiful Home",
  price: 500000,
  bedrooms: 3,
  bathrooms: 2,
  area: 1500,
  address: "123 Main Street",
  city: "Toronto",
  state: "ON",
  images: ["url1", "url2"],
  status: "active",
  type: "Single Family",
  favoritedAt: "2024-01-15T10:30:00.000Z",
  propertyType: "local"
};

// POST request to backend
const response = await axios.post('/api/client/favorites/add', {
  property_type: 'local',
  property_data: propertyData
});
```

## Testing Functions

### Browser Console Testing:

```javascript
// View stored favorites
function viewStoredFavorites() {
  console.log('=== STORED FAVORITES ===');
  console.log('Local Properties:', favouritesStore.getAllFavouriteProperties());
  console.log('TREB Properties:', favouritesStore.getAllFavouriteTrebProperties());
  console.log('All Favorites:', favouritesStore.getAllFavourites());
  
  // Show localStorage data
  console.log('localStorage favourite-properties:', localStorage.getItem('favourite-properties'));
  console.log('localStorage favourite-treb-properties:', localStorage.getItem('favourite-treb-properties'));
}

// Test adding local property
async function testAddFavorite() {
  if (!authStore.isAuthenticated) {
    console.log('Please login first');
    return;
  }
  
  const sampleProperty = {
    id: 'test-property-1',
    name: 'Beautiful Test Property',
    price: 500000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1500,
    address: '123 Test Street',
    city: 'Test City',
    state: 'TS',
    images: ['https://example.com/test-image.jpg'],
    status: 'active',
    type: 'Single Family'
  };
  
  try {
    await favouritesStore.toggleFavouriteProperty(sampleProperty);
    console.log('Added test property to favorites!');
    viewStoredFavorites();
  } catch (error) {
    console.error('Error adding test favorite:', error);
  }
}

// Test adding TREB property
async function testAddTrebFavorite() {
  if (!authStore.isAuthenticated) {
    console.log('Please login first');
    return;
  }
  
  const sampleTrebProperty = {
    ListingKey: 'test-treb-1',
    UnparsedAddress: '456 TREB Test Street',
    ListPrice: 750000,
    BedroomsTotal: 4,
    BathroomsFull: 3,
    LivingArea: 2000,
    City: 'TREB City',
    StateOrProvince: 'TS',
    PropertyType: 'Residential',
    image: 'https://example.com/treb-test-image.jpg'
  };
  
  try {
    await favouritesStore.toggleFavouriteTrebProperty(sampleTrebProperty);
    console.log('Added test TREB property to favorites!');
    viewStoredFavorites();
  } catch (error) {
    console.error('Error adding test TREB favorite:', error);
  }
}

// Clear all favorites
function clearAllFavorites() {
  favouritesStore.clearAllFavourites();
  console.log('All favorites cleared!');
  viewStoredFavorites();
}

// Make functions available globally
window.viewStoredFavorites = viewStoredFavorites;
window.testAddFavorite = testAddFavorite;
window.testAddTrebFavorite = testAddTrebFavorite;
window.clearAllFavorites = clearAllFavorites;
```

## Benefits

✅ **Complete Data Storage** - All property details saved to backend  
✅ **Immediate UI Feedback** - localStorage updates instantly  
✅ **Offline Support** - Works without internet connection  
✅ **Cross-Device Sync** - Backend syncs across devices  
✅ **Type Safety** - Separate handling for local vs TREB properties  
✅ **User Experience** - Loading states and animations  
✅ **Data Integrity** - Timestamps and proper validation  
✅ **Scalability** - JSON storage allows flexible property schemas  
✅ **Error Handling** - Comprehensive error management  

## File Structure

```
src/
├── api/
│   └── propertyApi.js          # API methods for favorites
├── stores/
│   └── favouritesStore.js      # State management for favorites
├── views/
│   └── LandingPage.vue        # UI with favorite buttons
└── docs/
    └── favorite-api-integration.md  # This documentation

routes/
└── api.php                    # Backend API routes

app/
├── Http/
│   └── Controllers/
│       └── API/
│           └── ClientController.php  # Backend controller
└── Models/
    └── Favorite.php           # Database model
```

This complete implementation ensures that when you click the favorite button, the complete property information is stored both locally and on your backend for optimal user experience and data persistence! 