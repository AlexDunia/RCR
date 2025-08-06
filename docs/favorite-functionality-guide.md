# Property Card Favorite Functionality Guide

## Overview

The property card favorite functionality in the TREB application allows users to save properties to their favorites list. This feature works across different property types (local properties and TREB listings) and requires proper authentication and authorization.

## Architecture Components

### 1. Frontend Components

#### Property Card Components
- **Location**: `src/views/client/ClientProperties.vue`
- **Favorite Button**: Heart icon that toggles favorite status
- **Implementation**: 
  ```vue
  <button
    class="favorite-btn"
    @click.stop="toggleSaveProperty(property.id)"
    :class="{ 'saved': isSaved(property.id) }"
  >
    <i :class="isSaved(property.id) ? 'fas fa-heart' : 'far fa-heart'"></i>
  </button>
  ```

#### Property Store (`src/stores/propertyStore.js`)
- **State Management**: Manages property data and favorite status
- **Key Methods**:
  - `toggleFavorite(propertyType, propertyId, propertyData)`: Toggles favorite status
  - `checkFavorite(propertyType, propertyId)`: Checks if property is favorited
  - `fetchProperties()`: Fetches properties with favorite status

#### Favorites Store (`src/stores/favouritesStore.js`)
- **Local Storage**: Manages favorites in localStorage
- **Methods**:
  - `toggleFavouriteProperty(propertyId)`: Toggles property favorite
  - `isPropertyFavourite(propertyId)`: Checks favorite status
  - `saveFavouriteProperties()`: Saves to localStorage

### 2. Backend API Structure

#### Authentication Flow
1. **Token Management**: Uses JWT tokens stored in sessionStorage
2. **Auth Store**: `src/stores/authStore.js` manages authentication state
3. **Axios Configuration**: `src/api/axios.js` handles API requests with auth headers

#### API Endpoints
- **Check Favorite**: `POST /api/favorites/check`
- **Toggle Favorite**: `POST /api/favorites/toggle`
- **Get Favorites**: `GET /api/client/favorites`
- **Add to Favorites**: `POST /api/client/favorites`

### 3. Authentication & Authorization

#### Authentication Requirements
- **JWT Token**: Required for all favorite operations
- **User Session**: Must be logged in to manage favorites
- **Role-Based Access**: Different permissions for clients vs agents

#### Authorization Flow
1. **Token Validation**: Backend validates JWT token
2. **User Verification**: Confirms user exists and is active
3. **Role Check**: Ensures user has appropriate permissions
4. **Rate Limiting**: Prevents abuse of favorite endpoints

## Complete Workflow

### 1. User Interaction Flow

```
User clicks favorite button
    ↓
Check if user is authenticated
    ↓
If not authenticated → Show login prompt
    ↓
If authenticated → Toggle favorite status
    ↓
Update UI immediately (optimistic update)
    ↓
Send API request to backend
    ↓
Handle response and update state
    ↓
Show success/error feedback
```

### 2. API Request Flow

#### Toggle Favorite Request
```javascript
// Frontend request
const response = await axiosInstance.post('/favorites/toggle', {
  property_type: 'treb', // or 'local'
  property_id: propertyId,
  property_data: propertyData // for TREB properties
});
```

#### Backend Processing
1. **Validate Request**: Check required fields
2. **Authenticate User**: Verify JWT token
3. **Check Current Status**: Query database for existing favorite
4. **Toggle Status**: Add or remove from favorites
5. **Return Response**: Success status and updated favorite state

### 3. Database Operations

#### Favorites Table Structure
```sql
CREATE TABLE favorites (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  property_type ENUM('local', 'treb') NOT NULL,
  property_id VARCHAR(255) NOT NULL,
  property_data JSON, -- For TREB properties
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_favorite (user_id, property_type, property_id)
);
```

## Implementation Details

### 1. Frontend Implementation

#### Property Store Methods
```javascript
// Toggle favorite status
async toggleFavorite(propertyType, propertyId, propertyData = null) {
  try {
    const payload = {
      property_type: propertyType,
      property_id: propertyId,
    };
    
    if (propertyType === 'treb' && propertyData) {
      payload.property_data = {
        ListingKey: propertyData.ListingKey,
        UnparsedAddress: propertyData.UnparsedAddress,
        ListPrice: propertyData.ListPrice,
        // ... other TREB data
      };
    }
    
    const response = await axiosInstance.post('/favorites/toggle', payload);
    
    if (response.data.success) {
      this.favorites[propertyId] = response.data.is_favorited;
      // Update UI state
      return response.data.is_favorited;
    }
  } catch (error) {
    // Handle error
    throw error;
  }
}
```

#### Component Integration
```javascript
// In property card component
const toggleSaveProperty = (propertyId) => {
  if (isSaved(propertyId)) {
    clientStore.removeSavedListing(clientId, propertyId);
  } else {
    clientStore.saveListingForClient(clientId, propertyId);
  }
};

const isSaved = (propertyId) => {
  const clientDetails = clientStore.getClientFullDetails(clientId);
  return clientDetails?.interactions?.mostSavedListings?.some(l => l.id === propertyId) || false;
};
```

### 2. Backend Implementation

#### Controller Structure
```php
// FavoritesController.php
public function toggle(Request $request)
{
    $validator = Validator::make($request->all(), [
        'property_type' => 'required|in:local,treb',
        'property_id' => 'required|string',
        'property_data' => 'nullable|array'
    ]);

    if ($validator->fails()) {
        return $this->validationErrorResponse($validator->errors());
    }

    try {
        $user = $request->user();
        $favorite = Favorite::where([
            'user_id' => $user->id,
            'property_type' => $request->property_type,
            'property_id' => $request->property_id
        ])->first();

        if ($favorite) {
            // Remove from favorites
            $favorite->delete();
            $isFavorited = false;
        } else {
            // Add to favorites
            Favorite::create([
                'user_id' => $user->id,
                'property_type' => $request->property_type,
                'property_id' => $request->property_id,
                'property_data' => $request->property_data
            ]);
            $isFavorited = true;
        }

        return $this->successResponse([
            'is_favorited' => $isFavorited
        ]);
    } catch (\Exception $e) {
        return $this->errorResponse('Failed to toggle favorite: ' . $e->getMessage());
    }
}
```

## Error Handling

### 1. Frontend Error Handling
- **Authentication Errors**: Redirect to login page
- **Network Errors**: Show user-friendly error messages
- **Validation Errors**: Display field-specific errors
- **Rate Limiting**: Show appropriate messages for too many requests

### 2. Backend Error Handling
- **Validation Errors**: Return 400 with field errors
- **Authentication Errors**: Return 401
- **Authorization Errors**: Return 403
- **Server Errors**: Return 500 with generic message

## Security Considerations

### 1. Authentication
- **JWT Token Validation**: Verify token on every request
- **Token Expiration**: Handle expired tokens gracefully
- **Session Management**: Proper session cleanup on logout

### 2. Authorization
- **Role-Based Access**: Different permissions for different user types
- **Resource Ownership**: Users can only manage their own favorites
- **Rate Limiting**: Prevent abuse of favorite endpoints

### 3. Data Validation
- **Input Sanitization**: Clean and validate all inputs
- **SQL Injection Prevention**: Use parameterized queries
- **XSS Prevention**: Sanitize output data

## Performance Optimizations

### 1. Frontend Optimizations
- **Optimistic Updates**: Update UI immediately, sync with backend
- **Caching**: Cache favorite status in store
- **Debouncing**: Prevent rapid successive clicks
- **Lazy Loading**: Load favorites on demand

### 2. Backend Optimizations
- **Database Indexing**: Index on user_id, property_type, property_id
- **Caching**: Cache frequently accessed favorites
- **Batch Operations**: Handle multiple favorites efficiently
- **Connection Pooling**: Optimize database connections

## Testing Strategy

### 1. Unit Tests
- **Store Methods**: Test favorite toggle logic
- **Component Methods**: Test UI interactions
- **API Endpoints**: Test backend functionality

### 2. Integration Tests
- **End-to-End Flow**: Test complete favorite workflow
- **Authentication Flow**: Test with different user types
- **Error Scenarios**: Test error handling

### 3. User Acceptance Tests
- **User Journey**: Test complete user experience
- **Cross-Browser**: Test in different browsers
- **Mobile Responsiveness**: Test on mobile devices

## Monitoring and Analytics

### 1. Usage Tracking
- **Favorite Actions**: Track add/remove actions
- **User Engagement**: Monitor favorite usage patterns
- **Performance Metrics**: Track response times

### 2. Error Monitoring
- **API Errors**: Monitor backend error rates
- **Frontend Errors**: Track JavaScript errors
- **User Feedback**: Collect user-reported issues

## Future Enhancements

### 1. Planned Features
- **Favorite Collections**: Group favorites into categories
- **Favorite Sharing**: Share favorite lists with others
- **Favorite Notifications**: Notify when favorite properties change
- **Bulk Operations**: Add/remove multiple favorites at once

### 2. Technical Improvements
- **Real-time Updates**: WebSocket integration for live updates
- **Offline Support**: Cache favorites for offline access
- **Advanced Filtering**: Filter favorites by various criteria
- **Export Functionality**: Export favorites to different formats

## Troubleshooting Guide

### 1. Common Issues
- **Favorite Not Saving**: Check authentication and API connectivity
- **UI Not Updating**: Verify store state management
- **Duplicate Favorites**: Check database constraints
- **Performance Issues**: Monitor API response times

### 2. Debug Steps
1. Check browser console for JavaScript errors
2. Verify API requests in Network tab
3. Check backend logs for server errors
4. Validate database constraints and indexes
5. Test with different user accounts

This documentation provides a comprehensive overview of the favorite functionality implementation in the TREB application, covering all aspects from frontend components to backend API design and security considerations. 