# Favorites Functionality - Frontend Implementation Guide

## Overview

The favorites system allows users to save properties (both local and TREB) and agents to their personal favorites list. The system operates primarily with localStorage for immediate functionality, with API synchronization planned for backend integration.

## Architecture

### Store Structure (`favouritesStore.js`)

```javascript
state: {
  favouriteAgents: [],        // Array of agent IDs
  favouriteProperties: [],    // Array of local property objects
  favouriteTrebProperties: [], // Array of TREB property objects
  loading: false,
  error: null
}
```

### API Structure (`propertyApi.js`)

The API layer provides methods for backend communication:
- `addToFavorites(propertyData)` - Add property to favorites
- `removeFromFavorites(propertyId, propertyType)` - Remove property from favorites
- `getFavorites()` - Get user's favorites
- `checkFavorite(propertyId, propertyType)` - Check if property is favorited
- `toggleFavorite(propertyId)` - Toggle favorite status

## Data Flow

### 1. User Interaction Flow

```
User clicks favorite button
    ↓
Check authentication status
    ↓
Call store method (toggleFavouriteProperty/toggleFavouriteTrebProperty)
    ↓
Update store state
    ↓
Save to localStorage
    ↓
(Optional) Sync with backend API
    ↓
Update UI to reflect new state
```

### 2. Property Types

#### Local Properties
- **ID**: `property.id` (number)
- **Type**: `'local'`
- **Storage Key**: `'favourite-properties'`
- **Data Structure**: Full property object with additional metadata

#### TREB Properties
- **ID**: `property.ListingKey` (string)
- **Type**: `'treb'`
- **Storage Key**: `'favourite-treb-properties'`
- **Data Structure**: Full TREB property object with additional metadata

#### Agents
- **ID**: `agent.id` (number)
- **Storage Key**: `'favourite-agents'`
- **Data Structure**: Array of agent IDs

### 3. Store Methods

#### `toggleFavouriteProperty(propertyData)`
- **Purpose**: Toggle local property favorite status
- **Parameters**: Full property object
- **Actions**:
  1. Check if property exists in favorites
  2. Add/remove from store state
  3. Save to localStorage
  4. (Future) Call API to sync with backend

#### `toggleFavouriteTrebProperty(trebPropertyData)`
- **Purpose**: Toggle TREB property favorite status
- **Parameters**: Full TREB property object
- **Actions**:
  1. Check if property exists in favorites
  2. Add/remove from store state
  3. Save to localStorage
  4. (Future) Call API to sync with backend

#### `toggleFavouriteAgent(agentId)`
- **Purpose**: Toggle agent favorite status
- **Parameters**: Agent ID
- **Actions**:
  1. Add/remove agent ID from array
  2. Save to localStorage

### 4. Getters

#### `isPropertyFavourite(propertyId)`
- **Purpose**: Check if local property is favorited
- **Returns**: Boolean

#### `isTrebPropertyFavourite(listingKey)`
- **Purpose**: Check if TREB property is favorited
- **Returns**: Boolean

#### `isAgentFavourite(agentId)`
- **Purpose**: Check if agent is favorited
- **Returns**: Boolean

#### `getAllFavouriteProperties()`
- **Purpose**: Get all favorite local properties
- **Returns**: Array of property objects

#### `getAllFavouriteTrebProperties()`
- **Purpose**: Get all favorite TREB properties
- **Returns**: Array of TREB property objects

#### `getAllFavouriteAgents()`
- **Purpose**: Get all favorite agent IDs
- **Returns**: Array of agent IDs

## UI Components

### 1. Favorite Button Component

```vue
<template>
  <div class="favorite-button" @click="toggleFavorite">
    <i v-if="loading" class="fas fa-spinner fa-spin"></i>
    <i v-else :class="isFavorited ? 'fas fa-heart' : 'far fa-heart'"></i>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFavouritesStore } from '@/stores/favouritesStore'

const props = defineProps({
  property: Object,
  propertyType: String // 'local' or 'treb'
})

const favouritesStore = useFavouritesStore()

const isFavorited = computed(() => {
  if (props.propertyType === 'treb') {
    return favouritesStore.isTrebPropertyFavourite(props.property.ListingKey)
  }
  return favouritesStore.isPropertyFavourite(props.property.id)
})

const loading = computed(() => favouritesStore.loading)

const toggleFavorite = async () => {
  try {
    if (props.propertyType === 'treb') {
      await favouritesStore.toggleFavouriteTrebProperty(props.property)
    } else {
      await favouritesStore.toggleFavouriteProperty(props.property)
    }
  } catch (error) {
    console.error('Error toggling favorite:', error)
  }
}
</script>
```

### 2. Favorites Page Component

```vue
<template>
  <div class="favorites-page">
    <h1>My Favorites</h1>
    
    <!-- Tabs for different favorite types -->
    <div class="favorites-tabs">
      <button 
        :class="{ active: activeTab === 'properties' }"
        @click="activeTab = 'properties'"
      >
        Properties ({{ localProperties.length + trebProperties.length }})
      </button>
      <button 
        :class="{ active: activeTab === 'agents' }"
        @click="activeTab = 'agents'"
      >
        Agents ({{ favoriteAgents.length }})
      </button>
    </div>

    <!-- Properties Tab -->
    <div v-if="activeTab === 'properties'" class="favorites-content">
      <h2>Favorite Properties</h2>
      
      <!-- Local Properties -->
      <div v-if="localProperties.length > 0">
        <h3>My Properties</h3>
        <div class="properties-grid">
          <PropertyCard 
            v-for="property in localProperties"
            :key="property.id"
            :property="property"
            :is-favorite="true"
            @toggle-favorite="removeFromFavorites"
          />
        </div>
      </div>

      <!-- TREB Properties -->
      <div v-if="trebProperties.length > 0">
        <h3>TREB Properties</h3>
        <div class="properties-grid">
          <TrebPropertyCard 
            v-for="property in trebProperties"
            :key="property.ListingKey"
            :property="property"
            :is-favorite="true"
            @toggle-favorite="removeFromFavorites"
          />
        </div>
      </div>

      <div v-if="localProperties.length === 0 && trebProperties.length === 0">
        <p>No favorite properties yet.</p>
      </div>
    </div>

    <!-- Agents Tab -->
    <div v-if="activeTab === 'agents'" class="favorites-content">
      <h2>Favorite Agents</h2>
      
      <div v-if="favoriteAgents.length > 0" class="agents-grid">
        <AgentCard 
          v-for="agentId in favoriteAgents"
          :key="agentId"
          :agent-id="agentId"
          :is-favorite="true"
          @toggle-favorite="removeAgentFromFavorites"
        />
      </div>

      <div v-else>
        <p>No favorite agents yet.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useFavouritesStore } from '@/stores/favouritesStore'
import PropertyCard from '@/components/PropertyCard.vue'
import TrebPropertyCard from '@/components/TrebPropertyCard.vue'
import AgentCard from '@/components/AgentCard.vue'

const favouritesStore = useFavouritesStore()
const activeTab = ref('properties')

// Computed properties
const localProperties = computed(() => favouritesStore.getAllFavouriteProperties())
const trebProperties = computed(() => favouritesStore.getAllFavouriteTrebProperties())
const favoriteAgents = computed(() => favouritesStore.getAllFavouriteAgents())

// Methods
const removeFromFavorites = async (property, propertyType) => {
  try {
    if (propertyType === 'treb') {
      await favouritesStore.toggleFavouriteTrebProperty(property)
    } else {
      await favouritesStore.toggleFavouriteProperty(property)
    }
  } catch (error) {
    console.error('Error removing from favorites:', error)
  }
}

const removeAgentFromFavorites = (agentId) => {
  favouritesStore.toggleFavouriteAgent(agentId)
}

onMounted(() => {
  favouritesStore.initFavourites()
})
</script>
```

## API Request Structure

### 1. Add to Favorites

**Endpoint**: `POST /api/favorites/add`

**Request Body**:
```json
{
  "property_type": "local|treb",
  "property_data": {
    "id": 123,
    "title": "Beautiful Home",
    "price": 500000,
    "address": "123 Main St",
    "bedrooms": 3,
    "bathrooms": 2,
    "image": "https://example.com/image.jpg",
    "favoritedAt": "2024-01-15T10:30:00Z",
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
    "favorite_id": 456,
    "property_id": 123,
    "user_id": 789,
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

### 2. Remove from Favorites

**Endpoint**: `POST /api/favorites/remove`

**Request Body**:
```json
{
  "property_id": 123,
  "property_type": "local"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Property removed from favorites",
  "data": {
    "favorite_id": 456,
    "property_id": 123,
    "user_id": 789,
    "deleted_at": "2024-01-15T10:35:00Z"
  }
}
```

### 3. Get User's Favorites

**Endpoint**: `GET /api/favorites`

**Response**:
```json
{
  "success": true,
  "data": {
    "local_properties": [
      {
        "id": 123,
        "title": "Beautiful Home",
        "price": 500000,
        "address": "123 Main St",
        "bedrooms": 3,
        "bathrooms": 2,
        "image": "https://example.com/image.jpg",
        "favoritedAt": "2024-01-15T10:30:00Z",
        "propertyType": "local"
      }
    ],
    "treb_properties": [
      {
        "ListingKey": "E123456789",
        "ListPrice": 750000,
        "Address": "456 Oak Ave",
        "BedroomsTotal": 4,
        "BathroomsTotalInteger": 3,
        "image": "https://example.com/treb-image.jpg",
        "favoritedAt": "2024-01-15T11:00:00Z",
        "propertyType": "treb"
      }
    ],
    "agents": [
      {
        "id": 101,
        "name": "John Smith",
        "email": "john@example.com",
        "phone": "+1-555-123-4567",
        "favoritedAt": "2024-01-15T09:00:00Z"
      }
    ]
  }
}
```

### 4. Check Favorite Status

**Endpoint**: `POST /api/favorites/check`

**Request Body**:
```json
{
  "property_id": 123,
  "property_type": "local"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "is_favorite": true,
    "favorite_id": 456,
    "favorited_at": "2024-01-15T10:30:00Z"
  }
}
```

## Error Handling

### 1. Authentication Errors
```javascript
// 401 Unauthorized
{
  "success": false,
  "error": "Unauthorized",
  "message": "User not authenticated"
}
```

### 2. Property Not Found
```javascript
// 404 Not Found
{
  "success": false,
  "error": "Property not found",
  "message": "Property with ID 123 does not exist"
}
```

### 3. Already Favorited
```javascript
// 409 Conflict
{
  "success": false,
  "error": "Already favorited",
  "message": "Property is already in favorites"
}
```

## LocalStorage Structure

### Keys and Data Format

```javascript
// Local Properties
localStorage.setItem('favourite-properties', JSON.stringify([
  {
    id: 123,
    title: "Beautiful Home",
    price: 500000,
    address: "123 Main St",
    bedrooms: 3,
    bathrooms: 2,
    image: "https://example.com/image.jpg",
    favoritedAt: "2024-01-15T10:30:00Z",
    propertyType: "local"
  }
]))

// TREB Properties
localStorage.setItem('favourite-treb-properties', JSON.stringify([
  {
    ListingKey: "E123456789",
    ListPrice: 750000,
    Address: "456 Oak Ave",
    BedroomsTotal: 4,
    BathroomsTotalInteger: 3,
    image: "https://example.com/treb-image.jpg",
    favoritedAt: "2024-01-15T11:00:00Z",
    propertyType: "treb"
  }
]))

// Agents
localStorage.setItem('favourite-agents', JSON.stringify([101, 102, 103]))
```

## Testing

### 1. Manual Testing Checklist

- [ ] Click favorite button on local property
- [ ] Click favorite button on TREB property
- [ ] Click favorite button on agent
- [ ] Verify localStorage is updated
- [ ] Refresh page and verify favorites persist
- [ ] Test removing favorites
- [ ] Test authentication redirect
- [ ] Test error handling

### 2. Console Debugging

```javascript
// View all stored favorites
window.viewStoredFavorites()

// Add test property to favorites
window.testAddFavorite()

// Add test TREB property to favorites
window.testAddTrebFavorite()

// Clear all favorites
window.clearAllFavorites()
```

## Future Enhancements

### 1. Backend Integration
- Uncomment API calls in store methods
- Add proper error handling for API failures
- Implement retry logic for failed requests
- Add offline support with sync when online

### 2. Advanced Features
- Favorite lists/categories
- Share favorites with agents
- Export favorites to PDF
- Favorite notifications
- Sync across devices

### 3. Performance Optimizations
- Lazy loading of favorite data
- Pagination for large favorite lists
- Image optimization for favorite properties
- Caching strategies

## Security Considerations

### 1. Data Validation
- Validate property data before saving
- Sanitize user inputs
- Check property existence before favoriting

### 2. Authentication
- Require authentication for all favorite operations
- Validate user permissions
- Implement proper session management

### 3. Data Privacy
- Encrypt sensitive data in localStorage
- Implement proper data retention policies
- Provide data export/deletion options 