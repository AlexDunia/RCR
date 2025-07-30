# Routing Guards and Access Control Documentation

## Overview
The application implements a multi-layered routing protection system using Vue Router guards and meta properties. This system ensures proper access control across different user roles while maintaining flexibility for public access.

## Route Access Properties

### publicAccess Flag
```javascript
{
  path: '/about',
  meta: {
    publicAccess: true  // Marks route as publicly accessible
  }
}
```

The `publicAccess` flag is used in route meta definitions to:
- Allow unauthenticated access
- Bypass role checks
- Enable public content viewing

## Guard Types

### 1. Authentication Guard (authGuard)
Primary authentication checker that manages user session state.

**Key Functions:**
- Validates user authentication status
- Handles redirect to login
- Manages authenticated user access to public routes
- Provides role-based dashboard redirects

```javascript
// Core Authentication Logic
if (!isAuthenticated && !publicRoutes.includes(to.name)) {
  next(`/login?redirect=${to.fullPath}`);
}
```

### 2. Permission Guard (permissionGuard)
Secondary layer handling role-based access control.

**Responsibilities:**
- Validates user roles against route requirements
- Manages public route access
- Enforces role-specific permissions
- Handles unauthorized access redirects

```javascript
// Role Validation Logic
if (to.meta.allowedRoles && !to.meta.allowedRoles.includes(userRole)) {
  return next('/unauthorized');
}
```

### 3. Public Guard (publicGuard)
Simplified guard for public routes.

**Features:**
- No authentication checks
- No permission validation
- Direct route access
- Used for fully public content

```javascript
export const publicGuard = (to, from, next) => {
  next(); // Always allows access
};
```

## Guard Execution Flow

1. **Route Request Initiated**
   - User attempts to access route
   - Route meta properties checked

2. **Authentication Guard (First Layer)**
   - Checks authentication status
   - Handles public access flags
   - Manages auth redirects

3. **Permission Guard (Second Layer)**
   - Validates user roles
   - Checks required permissions
   - Handles role-based redirects

4. **Route Access Granted/Denied**
   - Access permitted or
   - Redirect to appropriate page

## Example Route Configurations

### Public Route
```javascript
{
  path: '/about',
  meta: {
    publicAccess: true,
    allowedRoles: ['all', 'admin', 'agent', 'client']
  }
}
```

### Protected Route
```javascript
{
  path: '/agent/dashboard',
  meta: {
    publicAccess: false,
    allowedRoles: ['agent'],
    requiredPermissions: ['view_dashboard']
  }
}
```

### Mixed Access Route
```javascript
{
  path: '/properties',
  meta: {
    publicAccess: true,
    allowedRoles: ['all', 'agent', 'client'],
    requiresAuth: false
  }
}
```

## Best Practices

1. **Route Configuration**
   - Always specify `publicAccess` explicitly
   - Define `allowedRoles` for protected routes
   - Include necessary permissions

2. **Guard Usage**
   - Use appropriate guard for the use case
   - Combine guards when needed
   - Maintain guard order (auth → permission)

3. **Access Control**
   - Default to restricted access
   - Explicitly mark public routes
   - Use role-based restrictions appropriately

## Security Considerations

1. **Authentication**
   - Validate session status
   - Handle expired sessions
   - Manage authentication redirects

2. **Authorization**
   - Check role permissions
   - Validate access rights
   - Handle unauthorized access

3. **Public Access**
   - Limit public route exposure
   - Protect sensitive data
   - Maintain security boundaries 