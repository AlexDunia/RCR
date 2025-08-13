# RCR Real Estate Application - Comprehensive Technical Documentation

## Table of Contents
1. [Application Overview](#application-overview)
2. [Architecture & Technology Stack](#architecture--technology-stack)
3. [Directory Structure Analysis](#directory-structure-analysis)
4. [Authentication & Role System](#authentication--role-system)
5. [State Management (Pinia Stores)](#state-management-pinia-stores)
6. [Routing & Navigation](#routing--navigation)
7. [Components Architecture](#components-architecture)
8. [Features & Modules](#features--modules)
9. [Services & API Layer](#services--api-layer)
10. [Layouts & UI Structure](#layouts--ui-structure)
11. [Guards & Permissions](#guards--permissions)
12. [Utilities & Helpers](#utilities--helpers)
13. [Backend Integration](#backend-integration)
14. [Development & Build Process](#development--build-process)

---

## Application Overview

RCR is a comprehensive real estate management platform built with Vue.js 3, featuring role-based access control for three main user types: **Admin**, **Agent**, and **Client**. The application provides property management, task scheduling, document handling, marketing tools, and communication features.

### Core Business Logic
- **Property Management**: Listings, favorites, search, and detailed property views
- **User Management**: Role-based dashboards and profile management
- **Task & Tour Scheduling**: Appointment and task management system
- **Document Management**: Contract handling and document workflows
- **Marketing Tools**: Social media management and marketing content
- **Communication**: Chat system and notifications
- **Education**: Training modules and educational content

---

## Architecture & Technology Stack

### Frontend Stack
- **Vue.js 3** - Primary framework with Composition API
- **Pinia** - State management (replacing Vuex)
- **Vue Router 4** - Client-side routing
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API communication

### Backend Integration
- **Laravel PHP** - Backend API (evidenced by `app/` directory structure)
- **Node.js/Express** - Additional backend services (in `backend/` directory)
- **MySQL/Database** - Data persistence with migrations and seeders

### Key Configuration Files
```
├── vite.config.js          # Vite build configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── jsconfig.json          # JavaScript project configuration
├── eslint.config.js       # ESLint linting rules
├── postcss.config.js      # PostCSS configuration
└── package.json           # Node.js dependencies and scripts
```

---

## Directory Structure Analysis

### Root Level Structure
```
RCR/
├── src/                   # Frontend Vue.js application
├── public/               # Static assets and fallback files
├── app/                  # Laravel backend application
├── backend/              # Node.js backend services
├── database/             # Database migrations and seeders
├── routes/               # Laravel API routes
├── docs/                 # Documentation files
└── email-templates/      # Email template files
```

### Frontend Source Structure (`src/`)
```
src/
├── main.js               # Application entry point
├── App.vue               # Root component
├── assets/               # Static assets (CSS, images, icons)
├── components/           # Reusable UI components
├── composables/          # Vue 3 composition functions
├── directives/           # Custom Vue directives
├── features/             # Feature-based modules
├── layouts/              # Layout components
├── router/               # Routing configuration
├── services/             # Business logic and API services
├── stores/               # Pinia state management
├── ui/                   # Generic UI components
├── utils/                # Utility functions
└── views/                # Page components
```

---

## Authentication & Role System

### Role-Based Architecture
The application supports three primary roles with distinct capabilities:

#### 1. **Admin Role**
- **Capabilities**: Full system access, user management, property oversight
- **Key Views**: 
  - `AdminDashboardView.vue` - System overview and analytics
  - `AdminProperties.vue` - Property management interface
  - `AgentsView.vue` - Agent management and oversight
  - `ClientsView.vue` - Client management
  - `AdminEducationView.vue` - Training content management
  - `AdminSocialInsights.vue` - Marketing analytics

#### 2. **Agent Role**
- **Capabilities**: Property listing, client management, task scheduling
- **Key Views**:
  - `AgentDashboardView.vue` - Agent-specific dashboard
  - `AddListing.vue` - Property listing creation
  - `ManageListings.vue` - Listing management
  - `AgentChatView.vue` - Client communication
  - `AgentTaskhome.vue` - Task management hub

#### 3. **Client Role**
- **Capabilities**: Property search, favorites, agent communication
- **Key Views**:
  - `ClientDashboardView.vue` - Client dashboard
  - `ClientProperties.vue` - Property browsing
  - `FavoritesView.vue` - Saved properties
  - `FindAgentsView.vue` - Agent discovery
  - `ClientChatView.vue` - Agent communication

### Authentication Components & Services

#### Core Authentication Files
- `src/stores/authStore.js` - Authentication state management
- `src/services/authService.js` - Authentication business logic
- `src/composables/useAuth.js` - Authentication composition function
- `src/router/guards/authGuard.js` - Route protection
- `src/composables/useRoleGuard.js` - Role-based access control

#### Authentication Flow Components
- `src/views/auth/LoginView.vue` - User login interface
- `src/views/auth/SignupView.vue` - User registration
- `src/views/auth/UnauthorizedView.vue` - Access denied page

#### Role Management Utilities
- `public/role-utils.js` - Client-side role utilities
- `src/composables/usePermission.js` - Permission checking
- `src/directives/permission.js` - Template permission directive
- `src/services/permissionService.js` - Permission business logic

---

## State Management (Pinia Stores)

### Store Architecture Overview
The application uses Pinia for centralized state management with feature-based store organization:

#### Core System Stores
```javascript
// Authentication & User Management
authStore.js          // User authentication state
roleStore.js          // Role management and permissions
profileStore.js       // User profile data

// Navigation & Layout
headerStore.js        // Header state and configuration
navigationStore.js    // Navigation menu state
layoutStore.js        // Layout configuration
```

#### Feature-Specific Stores
```javascript
// Property Management
propertyStore.js      // Property data and search
favouritesStore.js    // User favorites management
listingStore.js       // Property listings management

// Task & Tour Management
taskStore.js          // Task scheduling and management
tourStore.js          // Tour scheduling and management

// Communication & Social
chatStore.js          // Chat and messaging
socialMediaStore.js   // Social media management
marketingStore.js     // Marketing content and campaigns

// User Type Specific
adminStore.js         // Admin-specific functionality
agentStore.js         // Agent-specific functionality
clientStore.js        // Client-specific functionality

// Content & Education
blogStore.js          // Blog content management
educationStore.js     // Training and education content
documentsStore.js     // Document management

// System & Utilities
connectionStore.js    // Network connectivity
counterStore.js       // General counters and statistics
```

### Store Integration Patterns
Each store typically includes:
- **State**: Reactive data properties
- **Getters**: Computed properties for derived state
- **Actions**: Methods for state mutations and API calls
- **Persistence**: Local storage integration where needed

---

## Routing & Navigation

### Router Configuration
- `src/router/index.js` - Main router setup and configuration
- `src/router/routes.js` - Route definitions and hierarchy
- `app/Providers/RouteServiceProvider.php` - Laravel route service provider

### Route Guard System
```javascript
// Guard Files
src/router/guards/
├── authGuard.js          // Authentication verification
├── permissionGuard.js    // Role-based access control
└── publicGuard.js        // Public route handling
```

### Navigation Components
- `src/components/Navigation.vue` - Main navigation component
- `src/components/MobileNavModal.vue` - Mobile navigation
- `src/features/marketing/MarketingNavigation.vue` - Marketing section nav
- `src/features/task/TaskNavigation.vue` - Task management navigation
- `src/features/tour/TourNavigation.vue` - Tour management navigation

### Route Structure by Role

#### Admin Routes
```
/admin/
├── dashboard           # AdminDashboardView.vue
├── properties         # AdminProperties.vue
├── agents            # AgentsView.vue
├── clients           # ClientsView.vue
├── education         # AdminEducationView.vue
├── marketing         # Marketing management views
└── tasks             # AdminTaskDetail.vue
```

#### Agent Routes
```
/agent/
├── dashboard         # AgentDashboardView.vue
├── listings          # ManageListings.vue
├── add-listing       # AddListing.vue
├── tasks             # AgentTaskhome.vue
├── chat              # AgentChatView.vue
└── profile           # AgentProfile.vue
```

#### Client Routes
```
/client/
├── dashboard         # ClientDashboardView.vue
├── properties        # ClientProperties.vue
├── favorites         # FavoritesView.vue
├── agents            # FindAgentsView.vue
├── appointments      # AppointmentsView.vue
├── documents         # DocumentsView.vue
├── messages          # Messages.vue
└── settings          # ClientSettingsView.vue
```

#### Public Routes
```
/
├── home              # HomeView.vue / LandingPage.vue
├── properties        # AllProperties.vue
├── agents            # AllAgents.vue
├── about             # AboutView.vue
├── blog              # BlogView.vue
├── property/:id      # PropertyDetail.vue
└── auth/             # Authentication views
```

---

## Components Architecture

### Component Hierarchy Overview

#### Global Components
```
src/components/
├── GlobalHeader.vue       # Application header with user menu
├── Footer.vue            # Application footer
├── PublicHeader.vue      # Public-facing header
├── PublicFooter.vue      # Public-facing footer
├── Navigation.vue        # Main navigation menu
├── UserMenu.vue          # User dropdown menu
├── RoleSelector.vue      # Role switching interface
└── MobileNavModal.vue    # Mobile navigation overlay
```

#### UI Components
```
src/ui/
├── Loader.vue            # Generic loading spinner
├── PageLoader.vue        # Full page loading state
├── SectionLoader.vue     # Section-specific loader
├── SkeletonLoader.vue    # Skeleton loading animation
├── PageTransition.vue    # Page transition animations
├── AnimationWrapper.vue  # Animation container
├── ConfirmationModal.vue # Confirmation dialogs
├── SearchBar.vue         # Search input component
└── TabNavigation.vue     # Tab navigation interface
```

#### Feature-Specific Components

##### Property Management
```
src/features/property/
├── PropertyCard.vue      # Property display card
├── PropertyGrid.vue      # Grid layout for properties
└── PropertyList.vue      # List layout for properties

src/components/
├── FavoriteButton.vue    # Property favoriting
└── ImageWithFallback.vue # Image display with fallbacks
```

##### Task Management
```
src/features/task/
├── TaskCard.vue          # Individual task display
├── TaskList.vue          # Task list container
├── TaskCreate.vue        # Task creation form
├── TaskDetail.vue        # Task detail view
├── TaskHeader.vue        # Task section header
├── TaskNavigation.vue    # Task navigation
├── ScheduledTaskList.vue # Scheduled tasks view
├── AgentModal.vue        # Agent task modal
├── ClientModal.vue       # Client task modal
└── ReminderModal.vue     # Task reminder modal
```

##### Tour Management
```
src/features/tour/
├── TourCard.vue          # Tour display card
├── TourList.vue          # Tour list container
├── TourCreate.vue        # Tour creation form
├── TourDetail.vue        # Tour detail view
├── TourHeader.vue        # Tour section header
├── TourNavigation.vue    # Tour navigation
├── AgentModal.vue        # Agent tour modal
├── ClientModal.vue       # Client tour modal
└── ReminderModal.vue     # Tour reminder modal
```

##### Chat & Communication
```
src/features/chat/
├── ChatSidebar.vue       # Chat conversation list
├── ChatWindow.vue        # Main chat interface
├── MessageBubble.vue     # Individual message display
└── MessageInput.vue      # Message composition input
```

##### Document Management
```
src/features/documents/
└── DocumentForm.vue      # Document upload/edit form

src/views/documents/
├── BuyerRepForm.vue      # Buyer representation form
├── DocumentDetail.vue    # Document detail view
├── DocumentEdit.vue      # Document editing interface
└── [additional document types]
```

##### Marketing & Social Media
```
src/features/marketing/
├── MarketingContentLoader.vue  # Marketing content loader
├── MarketingNavigation.vue     # Marketing section navigation
└── SocialMediaGraphs.vue       # Social media analytics

src/views/marketing/
├── AdminChecklistView.vue      # Marketing checklist management
├── AdminSocialInsights.vue     # Social media insights
├── ChecklistCreate.vue         # Checklist creation
└── [additional marketing views]
```

##### Profile Management
```
src/features/profile/
├── AdminProfileBio.vue   # Admin profile biography
├── AgentProfileBio.vue   # Agent profile biography
└── ClientProfileBio.vue  # Client profile biography
```

##### Education & Training
```
src/features/education/
└── TrainingModuleCard.vue # Training module display card
```

#### Specialized Components
```
src/components/
├── AddListingForm.vue        # Property listing creation form
├── AgentProfileModal.vue     # Agent profile modal display
├── FeatureDisabled.vue       # Disabled feature placeholder
├── TaskNotification.vue      # Task notification display
├── TheWelcome.vue           # Welcome screen component
├── WelcomeItem.vue          # Welcome screen item
└── HelloWorld.vue           # Default Vue component (likely unused)
```

### Component Import Patterns

#### Typical Component Structure
```vue
<template>
  <!-- Component template -->
</template>

<script>
// Imports typically include:
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { usePermission } from '@/composables/usePermission'
import SomeChildComponent from './SomeChildComponent.vue'

export default {
  name: 'ComponentName',
  components: {
    SomeChildComponent
  },
  props: {
    // Component props
  },
  setup(props) {
    // Composition API setup
    const authStore = useAuthStore()
    const router = useRouter()
    
    // Component logic
    
    return {
      // Exposed properties and methods
    }
  }
}
</script>

<style scoped>
/* Component-specific styles */
</style>
```

---

## Features & Modules

### Feature-Based Architecture
The application follows a feature-based architecture where related functionality is grouped together:

#### Agent Features
```
src/features/agent/
├── AgentTasks.vue        # Agent-specific task management
└── AgentTours.vue        # Agent-specific tour management

src/features/agents/
├── AgentDraftListings.vue      # Draft property listings
├── AgentPendingListings.vue    # Pending approval listings
├── AgentPersonalListingsView.vue # Personal listings view
└── ManageListings.vue          # Listing management interface
```

#### Client Features
```
src/features/client/
├── ClientTasks.vue       # Client-specific task view
└── ClientTours.vue       # Client-specific tour view
```

#### Core Feature Modules

##### Property Management System
**Files Involved:**
- `src/stores/propertyStore.js` - Property state management
- `src/stores/favouritesStore.js` - Favorites functionality
- `src/stores/listingStore.js` - Listing management
- `src/services/propertyService.js` - Property business logic
- `src/api/propertyApi.js` - Property API communication
- `src/api/favoritesApi.js` - Favorites API communication

**Key Components:**
- Property browsing and search
- Favorites management
- Property detail views
- Listing creation and management
- Property image galleries

##### Task Management System
**Files Involved:**
- `src/stores/taskStore.js` - Task state management
- `src/composables/useTaskTimer.js` - Task timing functionality
- `src/layouts/TasksLayout.vue` - Task-specific layout

**Features:**
- Task creation and assignment
- Task scheduling and reminders
- Task completion tracking
- Role-specific task views (Agent/Client/Admin)
- Task notifications and alerts

##### Tour Management System
**Files Involved:**
- `src/stores/tourStore.js` - Tour state management
- Tour-related components in `src/features/tour/`

**Features:**
- Tour scheduling
- Tour management for agents and clients
- Tour reminders and notifications
- Tour detail tracking

##### Document Management System
**Files Involved:**
- `src/stores/documents.js` - Document state management
- `src/layouts/DocumentLayout.vue` - Document-specific layout
- Document components in `src/features/documents/`

**Features:**
- Document upload and storage
- Document editing and versioning
- Document sharing and permissions
- Form-based document creation
- Document workflow management

##### Marketing & Social Media System
**Files Involved:**
- `src/stores/marketingStore.js` - Marketing state
- `src/stores/socialMediaStore.js` - Social media management
- `src/api/marketingApi.js` - Marketing API integration
- `backend/routes/marketingRoutes.js` - Backend marketing routes
- `backend/database/schemas/marketing_schema.sql` - Marketing database schema

**Features:**
- Social media content management
- Marketing campaign tracking
- Analytics and insights
- Content scheduling
- Marketing checklist management

##### Education & Training System
**Files Involved:**
- `src/stores/educationStore.js` - Education state management
- `src/layouts/EducationLayout.vue` - Education-specific layout
- Education components in `src/features/education/`

**Features:**
- Training module management
- Educational content delivery
- Progress tracking
- Course administration

##### Communication System
**Files Involved:**
- `src/stores/chatStore.js` - Chat state management
- Chat components in `src/features/chat/`

**Features:**
- Real-time messaging
- Multi-user chat support
- Message history
- Chat notifications
- File sharing in chat

---

## Services & API Layer

### Service Architecture
The application uses a layered service architecture for business logic and API communication:

#### Core Services
```
src/services/
├── authService.js           # Authentication business logic
├── permissionService.js     # Permission checking and validation
├── propertyService.js       # Property-related business logic
└── validationService.js     # Form and data validation
```

#### API Layer
```
src/api/
├── axios.js                 # Axios configuration and interceptors
├── propertyApi.js          # Property API endpoints
├── favoritesApi.js         # Favorites API endpoints
└── marketingApi.js         # Marketing API endpoints
```

#### Utility Services
```
src/utils/
├── axios.js                 # Additional Axios utilities
├── security.js             # Security-related utilities
├── encryption.js           # Data encryption utilities
├── validators.js           # Validation helpers
├── imageUtils.js           # Image processing utilities
├── deviceFingerprint.js    # Device identification
├── features.js             # Feature flag management
├── agentUtils.js           # Agent-specific utilities
├── navigation-fixer.js     # Navigation utilities
├── router-debug.js         # Router debugging utilities
└── backendIntegrationTemplate.js # Backend integration helpers
```

### API Integration Patterns

#### Axios Configuration (`src/api/axios.js`)
```javascript
// Typical structure includes:
- Base URL configuration
- Request/response interceptors
- Authentication token handling
- Error handling and retry logic
- Request/response transformers
```

#### Service Layer Pattern
```javascript
// Example service structure:
export class PropertyService {
  async getProperties(filters) {
    // Business logic
    // API call
    // Data transformation
    // Error handling
  }
  
  async createProperty(propertyData) {
    // Validation
    // API call
    // State updates
  }
}
```

### Backend Integration

#### Laravel API Structure
```
app/Http/
├── Controllers/API/
│   ├── AgentController.php      # Agent management API
│   ├── AuthController.php       # Authentication API
│   └── BaseController.php       # Base API controller
├── Middleware/
│   └── EnsureUserHasRole.php    # Role-based middleware
├── Resources/                   # API resource transformers
└── Traits/
    └── ApiResponse.php          # Standardized API responses
```

#### Node.js Backend Services
```
backend/
├── server.js                    # Express server configuration
├── routes/
│   └── marketingRoutes.js       # Marketing-specific routes
├── database/schemas/
│   └── marketing_schema.sql     # Marketing database schema
└── package.json                 # Backend dependencies
```

#### API Route Configuration
```
routes/
└── api.php                      # Laravel API routes definition
```

---

## Layouts & UI Structure

### Layout System Architecture
The application uses a flexible layout system supporting different user roles and contexts:

#### Core Layouts
```
src/layouts/
├── ClientLayout.vue         # Client-specific layout wrapper
├── DocumentLayout.vue       # Document management layout
├── EducationLayout.vue      # Education/training layout
└── TasksLayout.vue          # Task management layout
```

#### Layout Components
```
src/layouts/components/
├── AdminSidebar.vue         # Admin navigation sidebar
├── HeaderView.vue           # Header component for layouts
├── PageHeader.vue           # Page-specific header
└── SidebarView.vue          # Generic sidebar component
```

### Layout Patterns

#### Role-Based Layout Selection
```javascript
// Layout selection based on user role:
- Admin users: AdminSidebar + HeaderView
- Agent users: Standard layout with agent navigation
- Client users: ClientLayout with client-specific navigation
- Public users: PublicHeader + PublicFooter
```

#### Responsive Design Implementation
- Mobile-first approach with Tailwind CSS
- Mobile navigation modal for smaller screens
- Responsive grid systems for property listings
- Adaptive sidebar behavior
- Touch-friendly interface elements

#### Layout Component Integration
```vue
<!-- Typical layout structure -->
<template>
  <div class="layout-container">
    <HeaderView />
    <div class="layout-body">
      <SidebarView v-if="showSidebar" />
      <main class="main-content">
        <PageHeader />
        <router-view />
      </main>
    </div>
  </div>
</template>
```

---

## Guards & Permissions

### Security Layer Architecture
The application implements a comprehensive security system with multiple layers of protection:

#### Route Guards
```
src/router/guards/
├── authGuard.js             # Authentication verification
├── permissionGuard.js       # Role-based access control
└── publicGuard.js           # Public route handling
```

#### Permission System Components
```
src/composables/
├── usePermission.js         # Permission checking composable
├── useRoleGuard.js          # Role-based guard composable
└── useAuth.js               # Authentication composable

src/directives/
└── permission.js            # Template-level permission directive

src/services/
└── permissionService.js     # Permission business logic
```

#### Backend Security
```
app/Http/Middleware/
└── EnsureUserHasRole.php    # Laravel role middleware
```

### Permission Patterns

#### Template-Level Permissions
```vue
<!-- Using permission directive -->
<button v-permission="'create-listing'">Add Listing</button>
<div v-permission:role="'admin'">Admin Only Content</div>
```

#### Programmatic Permission Checking
```javascript
// Using composables
const { hasPermission, hasRole } = usePermission()

if (hasPermission('edit-property')) {
  // Allow editing
}

if (hasRole('agent')) {
  // Agent-specific logic
}
```

#### Route-Level Protection
```javascript
// Route configuration with guards
{
  path: '/admin',
  component: AdminView,
  beforeEnter: [authGuard, permissionGuard('admin')]
}
```

### Role-Based Feature Access

#### Admin Permissions
- Full system access
- User management
- Property oversight
- System configuration
- Analytics and reporting

#### Agent Permissions
- Property listing management
- Client interaction
- Task and tour scheduling
- Document management
- Limited user management

#### Client Permissions
- Property browsing
- Favorites management
- Agent communication
- Appointment scheduling
- Document viewing

---

## Utilities & Helpers

### Utility Organization
The application includes comprehensive utility functions organized by functionality:

#### Core Utilities
```
src/utils/
├── validators.js            # Form and data validation helpers
├── imageUtils.js           # Image processing and optimization
├── security.js            # Security-related utilities
├── encryption.js           # Data encryption/decryption
├── deviceFingerprint.js    # Device identification
└── features.js             # Feature flag management
```

#### Vue.js Specific Utilities
```
src/composables/
├── useAuth.js              # Authentication composable
├── usePermission.js        # Permission checking
├── useRoleGuard.js         # Role-based access control
├── useTaskTimer.js         # Task timing functionality
├── useDebounce.js          # Input debouncing
├── useDateValidation.js    # Date validation helpers
└── useFixedHeader.js       # Header behavior management
```

#### Navigation & Routing Utilities
```
src/utils/
├── navigation-fixer.js     # Navigation issue resolution
├── router-debug.js         # Router debugging tools
└── agentUtils.js           # Agent-specific helper functions
```

#### Directives
```
src/directives/
├── permission.js           # Permission-based element display
└── tooltip.js              # Tooltip functionality
```

### Composables Deep Dive

#### Authentication Composable (`useAuth.js`)
```javascript
// Typical functionality:
- User state management
- Login/logout operations
- Token management
- User role detection
- Authentication status checking
```

#### Permission Composable (`usePermission.js`)
```javascript
// Typical functionality:
- Permission checking
- Role verification
- Feature access control
- Dynamic permission loading
```

#### Debounce Composable (`useDebounce.js`)
```javascript
// Typical functionality:
- Input debouncing for search
- API call optimization
- Performance improvement
```

### Utility Integration Patterns
```javascript
// Common import patterns:
import { validateEmail, validatePhone } from '@/utils/validators'
import { hasPermission } from '@/composables/usePermission'
import { debounce } from '@/composables/useDebounce'
import { encryptData } from '@/utils/encryption'
```

---

## Backend Integration

### Multi-Backend Architecture
The application integrates with multiple backend services:

#### Laravel PHP Backend
```
app/
├── Http/Controllers/API/    # API controllers
├── Models/                  # Eloquent models
├── Providers/              # Service providers
└── Traits/                 # Reusable traits

database/
├── migrations/             # Database schema migrations
└── seeders/               # Database seeders

routes/
└── api.php                # API route definitions
```

#### Node.js/Express Backend
```
backend/
├── server.js              # Express server setup
├── routes/                # Express routes
├── database/schemas/      # Database schemas
└── package.json           # Node.js dependencies
```

### API Integration Strategy

#### RESTful API Patterns
```javascript
// Typical API structure:
GET    /api/properties         # List properties
POST   /api/properties         # Create property
GET    /api/properties/{id}    # Get property details
PUT    /api/properties/{id}    # Update property
DELETE /api/properties/{id}    # Delete property
```

#### Authentication Integration
- JWT token-based authentication
- Role-based API access control
- Token refresh mechanisms
- Secure credential storage

#### Error Handling
- Standardized error responses
- Client-side error handling
- User-friendly error messages
- Logging and monitoring

### Database Architecture

#### Laravel Database Structure
```
database/
├── migrations/            # Schema definitions
├── seeders/              # Sample data
└── [migration files]     # Individual migration files
```

#### Marketing Database Schema
```sql
-- backend/database/schemas/marketing_schema.sql
-- Contains marketing-specific database structure
-- Social media integration tables
-- Campaign tracking tables
-- Analytics data storage
```

---

## Development & Build Process

### Development Environment Setup

#### Package Management
```json
// package.json - Frontend dependencies
{
  "dependencies": {
    "vue": "^3.x",
    "vue-router": "^4.x",
    "pinia": "^2.x",
    "axios": "^1.x",
    "@tailwindcss/forms": "^0.x"
  },
  "devDependencies": {
    "vite": "^4.x",
    "eslint": "^8.x",
    "tailwindcss": "^3.x"
  }
}
```

#### Build Configuration
```javascript
// vite.config.js
- Development server configuration
- Build optimization settings
- Asset handling
- Proxy configuration for API calls
- Plugin configuration
```

#### Code Quality Tools
```javascript
// eslint.config.js
- Linting rules and standards
- Code formatting guidelines
- Vue.js specific rules
- Import/export standards

// postcss.config.js
- CSS processing configuration
- Tailwind CSS integration
- CSS optimization
```

### Development Workflow

#### File Organization Standards
- Feature-based organization
- Consistent naming conventions
- Clear separation of concerns
- Modular component structure

#### State Management Patterns
- Centralized store management
- Feature-specific stores
- Consistent action patterns
- State persistence strategies

#### Component Development Guidelines
- Composition API usage
- Props and emits patterns
- Scoped styling
- Accessibility considerations

### Deployment Structure

#### Static Assets
```
public/
├── index.html             # Main HTML template
├── favicon.ico           # Site favicon
├── assets/               # Static assets
├── images/               # Image assets
├── 404.html             # 404 error page
├── debug.html           # Debug utilities
└── RCR/                 # Additional static resources
```

#### Fallback Pages
- `index-fallback.html` - Fallback for routing issues
- `index-prod.html` - Production-specific index
- `404.html` - Custom 404 page

#### Debug & Development Tools
- `debug-app-state.js` - Application state debugging
- `role-check.js` - Role verification utilities
- Various role-fixing scripts for development

---

## Key Integration Points

### Critical Application Flows

#### User Authentication Flow
1. User accesses application
2. `authGuard.js` checks authentication status
3. If not authenticated, redirect to `LoginView.vue`
4. `authService.js` handles login API call
5. `authStore.js` stores user data and token
6. `permissionGuard.js` checks role permissions
7. User redirected to appropriate dashboard

#### Property Management Flow
1. User searches properties via `SearchBar.vue`
2. `propertyService.js` processes search parameters
3. `propertyApi.js` makes API call to backend
4. `propertyStore.js` stores search results
5. `PropertyGrid.vue` or `PropertyList.vue` displays results
6. User can favorite properties via `FavoriteButton.vue`
7. `favoritesApi.js` syncs favorites with backend
8. `favouritesStore.js` maintains favorite state

#### Task Management Flow
1. User creates task via `TaskCreate.vue`
2. `taskStore.js` manages task state
3. Task API call via backend integration
4. `TaskList.vue` displays tasks
5. `TaskNotification.vue` handles notifications
6. `useTaskTimer.js` manages timing functionality

### Component Communication Patterns

#### Parent-Child Communication
- Props for data down
- Emits for events up
- Provide/inject for deep passing

#### Sibling Communication
- Pinia stores for shared state
- Event bus patterns where needed
- Router-based communication

#### Global State Management
- Pinia stores for application state
- Composables for reusable logic
- Services for business logic

---

## Configuration & Environment

### Environment Configuration
The application supports multiple environments with appropriate configurations:

#### Development Configuration
- Hot module replacement
- Debug tools enabled
- Verbose logging
- Development API endpoints

#### Production Configuration
- Optimized builds
- Minified assets
- Production API endpoints
- Error reporting

#### Build Process
```bash
# Development
npm run dev

# Production build
npm run build

# Linting
npm run lint

# Testing
npm run test
```

---

## Security Considerations

### Frontend Security
- XSS protection via Vue.js templating
- CSRF protection for API calls
- Input validation and sanitization
- Secure token storage
- Role-based access control

### API Security
- JWT token authentication
- Role-based API endpoints
- Input validation on backend
- Rate limiting
- CORS configuration

### Data Protection
- Sensitive data encryption
- Secure data transmission
- User privacy protection
- Audit logging

---

## Performance Optimization

### Frontend Optimization
- Component lazy loading
- Route-based code splitting
- Image optimization
- Bundle size optimization
- Caching strategies

### Backend Optimization
- Database query optimization
- API response caching
- Efficient data structures
- Connection pooling

---

## Conclusion

This RCR Real Estate application is a comprehensive, role-based platform built with modern web technologies. The architecture supports scalability, maintainability, and security while providing rich functionality for all user types.

### Key Strengths
1. **Modular Architecture**: Feature-based organization promotes maintainability
2. **Role-Based Security**: Comprehensive permission system
3. **State Management**: Centralized state with Pinia
4. **Component Reusability**: Well-structured component hierarchy
5. **API Integration**: Clean separation between frontend and backend
6. **Responsive Design**: Mobile-first approach with Tailwind CSS

### Development Guidelines for New Team Members
1. Follow the established directory structure
2. Use composition API for new components
3. Implement proper error handling
4. Follow the established naming conventions
5. Test role-based functionality thoroughly
6. Maintain security best practices
7. Document new features and components

This documentation provides a comprehensive overview of the entire application structure. New developers should start by understanding the authentication flow, then explore specific features based on their assigned tasks.