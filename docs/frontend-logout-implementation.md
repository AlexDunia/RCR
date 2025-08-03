# Frontend Logout Implementation

This document explains how the logout functionality works in the Vue.js frontend application.

## Overview

The logout functionality is implemented across multiple layers:
1. **PublicHeader Component** - User interface trigger
2. **Auth Store** - State management
3. **Auth Service** - API communication
4. **Router** - Navigation after logout

## Component Flow

### 1. PublicHeader.vue - User Interface

**Location:** `src/components/PublicHeader.vue`

**Trigger:** User clicks logout button in dropdown or mobile menu

```vue
<template>
  <!-- Desktop Dropdown -->
  <button @click="handleLogout" class="user-dropdown__item">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16,17 21,12 16,7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
    Logout
  </button>

  <!-- Mobile Logout -->
  <button @click="handleLogout" class="mobile-user__logout">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16,17 21,12 16,7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
    Logout
  </button>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  try {
    await authStore.logout();
    showDropdown.value = false;
    showMobileNav.value = false;
    // Redirect to landing page after logout
    router.push('/landing');
  } catch (error) {
    console.error('Logout error:', error);
  }
};
</script>
```

### 2. Auth Store - State Management

**Location:** `src/stores/authStore.js`

**Purpose:** Manages authentication state and coordinates logout process

```javascript
import { defineStore } from 'pinia';
import { ref } from 'vue';
import authService from '@/services/authService';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(sessionStorage.getItem('auth_token') || null);
  const user = ref(null);
  const isInitialized = ref(false);

  // Set the user data
  function setUser(userData) {
    user.value = userData;
    
    // Set user role if available in user data
    if (userData && userData.role) {
      localStorage.setItem('userRole', userData.role);
    }
  }

  // Clear authentication data
  function clearAuth() {
    token.value = null;
    user.value = null;
    authService.clearAuthData();
    
    // Clear user role and set to 'all' for public access
    localStorage.setItem('userRole', 'all');
  }

  // Check if user is authenticated
  function isAuthenticated() {
    return !!token.value;
  }

  // Get current user
  function getUser() {
    return user.value;
  }

  // Logout user
  async function logout() {
    try {
      await authService.logout();
      clearAuth();
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }

  return {
    token,
    user,
    initialize,
    setToken,
    setUser,
    clearAuth,
    isAuthenticated,
    getUser,
    logout
  };
});
```

### 3. Auth Service - API Communication

**Location:** `src/services/authService.js`

**Purpose:** Handles HTTP requests to backend for logout

```javascript
import axios from '@/utils/axios';
import router from '@/router';

const API_URL = '/api/auth';
const TOKEN_KEY = 'auth_token';
const USER_DATA_KEY = 'user_data';

// Configure axios defaults
axios.defaults.withCredentials = true;

// Request interceptor for API calls
axios.interceptors.request.use(async (config) => {
  // Add auth token if available
  const authToken = sessionStorage.getItem(TOKEN_KEY);
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`;
  }

  config.headers['Accept'] = 'application/json';
  config.headers['Content-Type'] = 'application/json';
  return config;
});

// Response interceptor
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear auth data and redirect to login
      authService.clearAuthData();
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

const authService = {
  /**
   * Logout user
   */
  async logout() {
    try {
      const deviceName = sessionStorage.getItem("device_name");
      const token = sessionStorage.getItem(TOKEN_KEY);

      if (token) {
        await axios.post(`${API_URL}/logout`, {
          device_name: deviceName
        });
      }
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      this.clearAuthData();
    }
  },

  /**
   * Clear all authentication data
   */
  clearAuthData() {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_DATA_KEY);
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!sessionStorage.getItem(TOKEN_KEY);
  },

  /**
   * Get stored user data
   */
  getStoredUserData() {
    const userData = sessionStorage.getItem(USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  },

  /**
   * Handle authentication errors
   */
  handleError(error) {
    if (error.response) {
      switch (error.response.status) {
        case 422:
          return {
            status: 422,
            errors: error.response.data.errors
          };
        case 401:
          this.clearAuthData();
          return {
            status: 401,
            message: 'Invalid credentials'
          };
        case 500:
          return {
            status: 500,
            message: 'An unexpected error occurred. Please try again.'
          };
        default:
          return {
            status: error.response.status,
            message: error.response.data.message || 'An error occurred'
          };
      }
    }
    return {
      status: 0,
      message: 'Network error. Please check your connection.'
    };
  }
};

export default authService;
```

## Backend API Requirements

### Endpoint
```
POST /api/auth/logout
```

### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
Accept: application/json
```

### Request Body
```json
{
  "device_name": "web"
}
```

### Expected Response
```json
{
  "message": "Logged out successfully"
}
```

### Error Responses
```json
{
  "message": "Unauthorized",
  "status": 401
}
```

```json
{
  "message": "Server error",
  "status": 500
}
```

## Frontend Logout Process

### Step-by-Step Flow:

1. **User clicks logout** in PublicHeader dropdown or mobile menu
2. **handleLogout()** function is called
3. **authStore.logout()** is called
4. **authService.logout()** makes API request to backend
5. **Backend processes logout** and invalidates token
6. **Frontend clears local storage** (token, user data, device name)
7. **User role is reset** to 'all' for public access
8. **User is redirected** to landing page
9. **UI updates** to show login/signup buttons instead of user dropdown

### Data Cleared on Logout:

- `sessionStorage.auth_token` - Authentication token
- `sessionStorage.user_data` - User information
- `sessionStorage.device_name` - Device identifier
- `localStorage.userRole` - User role (reset to 'all')

### UI Changes After Logout:

- **Desktop**: User dropdown disappears, Sign up/Login buttons appear
- **Mobile**: User info section disappears, auth buttons appear in mobile menu
- **Navigation**: User redirected to landing page
- **Access**: User can only access public pages (role: 'all')

## Error Handling

### Frontend Error Handling:
- **Network errors**: Logged to console, user stays on current page
- **401 errors**: Automatically cleared auth data and redirected to login
- **Server errors**: Logged to console, auth data still cleared locally

### Backend Error Handling:
- **Invalid token**: Return 401 Unauthorized
- **Missing device_name**: Return 422 Validation Error
- **Server errors**: Return 500 Internal Server Error

## Security Considerations

1. **Token invalidation**: Backend should invalidate the specific token/device
2. **Session cleanup**: Clear any server-side session data
3. **Device tracking**: Use device_name to revoke specific device sessions
4. **Automatic cleanup**: Frontend clears all auth data even if API call fails

## Testing

### Manual Testing:
1. Login to the application
2. Navigate to any page with PublicHeader
3. Click on user name to open dropdown
4. Click "Logout" button
5. Verify redirect to landing page
6. Verify login/signup buttons are visible
7. Verify user dropdown is no longer visible

### API Testing:
```bash
curl -X POST http://your-api.com/api/auth/logout \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"device_name": "web"}'
``` 