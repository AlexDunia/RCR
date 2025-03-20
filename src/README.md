# Application Architecture

This application follows a modern, feature-based architecture pattern that separates business logic from presentation. This README explains our architectural principles and folder structure.

## Directory Structure

### `/features`

The `features` directory contains business logic and domain-specific components organized by feature domain:

- `agents/` - Agent-related business logic
- `dashboard/` - Dashboard functionality
- `documents/` - Document management logic
- `education/` - Education and training logic
- `listings/` - Listing management business logic
- `marketing/` - Marketing campaign business logic
- `profile/` - User profile business logic
- `tasks/` - Task management business logic
- `chat/` - Chat functionality business logic

Each feature directory contains:
- Component definitions specific to that domain
- Business logic (service functions, API calls)
- State management related to the feature
- Domain models and types
- Feature-specific utility functions

### `/views`

The `views` directory contains page compositions and layouts:

- Page-level components that compose features together
- Layout components for different sections
- Screen-level organization of multiple features
- Route-specific views
- Page transitions and layouts

### Other Directories

- `/layouts` - Layout components that define the overall application structure
- `/components` - Shared UI components used across multiple features
- `/stores` - Application-wide state management
- `/router` - Route definitions and navigation logic
- `/utils` - Shared utility functions
- `/assets` - Static assets like images and fonts

## Import Conventions

To maintain a clean architecture:

1. Always import feature components from the `/features` directory:
   ```javascript
   import UserProfile from '@/features/profile/ProfilePage.vue'
   ```

2. Always import view components from the `/views` directory:
   ```javascript
   import MarketingTools from '@/views/marketing/MarketingTools.vue'
   ```

3. Never mix imports between directories or create circular dependencies.

4. Be consistent with the import source - if a component is defined in `features`, always import it from there.

## Architecture Benefits

This architecture provides several benefits:

1. **Separation of Concerns**: Business logic is separate from presentation
2. **Maintainability**: Features can be developed and maintained independently
3. **Scalability**: New features can be added without affecting existing ones
4. **Testability**: Business logic can be tested independently of UI
5. **Reusability**: Features can be composed into different views

## Development Guidelines

When adding new functionality:

1. Determine if it's a business feature or a view composition
2. Place it in the appropriate directory based on its purpose
3. Follow the existing patterns for imports and component organization
4. Document any architectural decisions that deviate from these patterns

Remember: Business logic and feature-specific components go in `/features`, page compositions and layouts go in `/views`. 