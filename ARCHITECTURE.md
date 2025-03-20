# Project Architecture Guide

This project follows a modern feature-based architecture that separates business logic from presentation. This guide explains our architectural principles and how to work with this codebase.

## Architecture Principles

1. **Separation of Concerns**: Business logic is separated from presentation
2. **Feature-Based Organization**: Code is organized by domain/feature rather than technical role
3. **Reusability**: Components are designed to be reusable across the application
4. **Consistency**: Consistent patterns are used throughout the codebase

## Directory Structure

### `/src/features`

The `features` directory contains business logic and domain-specific components:

- **Business logic**: Services, utilities, and domain models
- **Domain-specific components**: Components that are specific to a feature
- **State management**: Store modules for managing domain state

Each feature directory (e.g., `documents`, `tasks`, `profile`) contains:

- `components/`: Domain-specific components
- `models/`: TypeScript interfaces and classes (if applicable)
- `stores/`: State management for the domain (if applicable)
- `[FeatureName]Service.js`: Business logic related to the domain

### `/src/views`

The `views` directory contains page-level components that compose features:

- **Page layouts**: Overall page structures
- **Feature composition**: Combining multiple features on a page
- **Routing concerns**: Components tied to routes

Views should not contain business logic but should use components from the `features` directory.

### `/src/layouts`

Layout components define the overall structure of the application:

- `DocumentLayout.vue`: Layout for document-related pages
- `TasksLayout.vue`: Layout for task-related pages
- `EducationLayout.vue`: Layout for education-related pages

### `/src/components`

The `components` directory contains shared UI components:

- Generic UI components (buttons, forms, etc.)
- Utility components used across multiple features
- Non-domain-specific components

### `/src/router`

The router defines the application routes and navigation.

### `/src/stores`

The stores directory contains global state management.

## Code Organization Examples

### Business Logic (in features)

```javascript
// src/features/documents/DocumentService.js
export const formatDocumentDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getDocumentTitle = (doc) => {
  if (!doc) return '';
  
  switch (doc.type) {
    case 'buyer-rep':
      return `${doc.buyerName}'s Buyer Rep Agreement`;
    // ...
  }
};
```

### Feature Components (in features)

```vue
<!-- src/features/documents/components/DocumentCard.vue -->
<template>
  <div class="document-card">
    <!-- Card content -->
  </div>
</template>

<script setup>
import { formatDocumentDate } from '../DocumentService';
// Component logic
</script>
```

### Views (in views)

```vue
<!-- src/views/documents/DocumentManagement.vue -->
<template>
  <div class="document-management">
    <document-list :documents="documents" />
  </div>
</template>

<script setup>
import DocumentList from '@/features/documents/components/DocumentList.vue';
// Page composition logic
</script>
```

## Best Practices

1. **Keep business logic in features**: All business logic should be in the `features` directory
2. **Keep views simple**: Views should only compose features and handle routing concerns
3. **Import from the correct location**: Import feature components from `features` and view components from `views`
4. **Avoid circular dependencies**: Be careful not to create circular dependencies between features
5. **Reuse components**: Don't duplicate functionality between features

## Migration Guide

When migrating code to this architecture:

1. Identify business logic in view components
2. Move this logic to a service in the relevant feature directory
3. Create reusable components in the feature directory
4. Update the view to use these components

Example migration:
```
Before:
src/views/Documents.vue (with business logic)

After:
src/features/documents/DocumentService.js (business logic)
src/features/documents/components/DocumentCard.vue (reusable component)
src/views/documents/DocumentManagement.vue (view using features)
``` 