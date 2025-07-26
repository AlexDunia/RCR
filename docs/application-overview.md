# Real Estate Client Relations (RCR) Application Documentation

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Frontend Structure](#frontend-structure)
4. [Backend Structure](#backend-structure)
5. [Database Structure](#database-structure)
6. [Key Features](#key-features)
7. [Component Breakdown](#component-breakdown)
8. [Authentication & Authorization](#authentication--authorization)
9. [API Integration](#api-integration)
10. [Services & Utilities](#services--utilities)

## Overview

RCR is a comprehensive real estate client relations management system built with a Vue.js frontend and Laravel/Node.js backend. The application serves multiple user roles including administrators, agents, and clients, each with their specific functionalities and access levels.

## Architecture

### Tech Stack
- Frontend: Vue.js 3 with Composition API
- Backend: 
  - Laravel (PHP) for main API
  - Node.js for marketing services
- CSS Framework: Tailwind CSS
- State Management: Pinia (Vue Store)
- Routing: Vue Router
- HTTP Client: Axios

## Frontend Structure

### Core Components (`/src/components/`)
- `GlobalHeader.vue` & `PublicHeader.vue`: Main navigation headers
- `Navigation.vue`: Main navigation component
- `RoleSelector.vue`: User role switching interface
- `UserMenu.vue`: User-specific menu options
- `ImageWithFallback.vue`: Image component with fallback support

### Features (`/src/features/`)

#### Agent Features
- `agent/`: Agent-specific tasks and tours
- `agents/`: Listing management and agent views
  - Draft listings
  - Pending listings
  - Personal listings

#### Client Features
- `client/`: Client-specific tasks and tours
- Property viewing and favoriting functionality

#### Property Management
- `property/`:
  - `PropertyCard.vue`: Individual property display
  - `PropertyGrid.vue`: Grid layout for properties
  - `PropertyList.vue`: List view for properties

#### Task Management
- `task/`:
  - Task creation, editing, and viewing
  - Reminder system
  - Scheduled tasks

#### Tour Management
- `tour/`:
  - Tour scheduling
  - Tour details
  - Reminders

#### Marketing Features
- `marketing/`:
  - Social media integration
  - Content management
  - Analytics and insights

#### Chat System
- `chat/`:
  - Real-time messaging
  - Chat windows
  - Message history

### Views (`/src/views/`)

#### Authentication Views
- `auth/`:
  - Login
  - Signup
  - Unauthorized access handling

#### Dashboard Views
- `dashboard/`:
  - Admin dashboard
  - Agent dashboard
  - Client dashboard

#### Property Views
- Property listings
- Property details
- Search functionality
- Saved listings

#### Document Management
- `documents/`:
  - Document forms
  - Document viewing
  - Document editing
  - Specific forms (Buyer/Seller representation)

#### Marketing Views
- Social media management
- Content creation
- Analytics dashboard
- Marketing checklists

### Layouts (`/src/layouts/`)
- Client layout
- Document layout
- Education layout
- Tasks layout
- Admin sidebar
- Header components

### Stores (`/src/stores/`)
- Authentication store
- User role store
- Property store
- Chat store
- Marketing store
- Task store
- Tour store
- Document store

### Services (`/src/services/`)
- Authentication service
- Permission service
- Property service
- Validation service

### Utils (`/src/utils/`)
- API utilities
- Image handling
- Security functions
- Validation helpers
- Device fingerprinting
- Navigation utilities

## Backend Structure

### Laravel Backend (`/app/`)

#### Controllers (`/app/Http/Controllers/API/`)
- `AgentController.php`: Agent-specific operations
- `AuthController.php`: Authentication handling
- `BaseController.php`: Base controller functionality

#### Middleware (`/app/Http/Middleware/`)
- `EnsureUserHasRole.php`: Role-based access control

### Node.js Backend (`/backend/`)
- Marketing service implementation
- Database schemas
- Route definitions

## Database Structure

The application uses multiple database schemas:
- Main application database
- Marketing database
- Property database

Detailed schema information is available in:
- `/docs/database-schema.md`
- `/docs/database-architecture.md`
- `/docs/real-estate-db-structure.md`

## Key Features

### 1. User Role Management
- Multiple user roles (Admin, Agent, Client)
- Role-based access control
- Role switching capabilities

### 2. Property Management
- Property listing creation
- Property search
- Favoriting system
- Draft and pending listings

### 3. Task Management
- Task creation and assignment
- Task scheduling
- Reminders
- Task status tracking

### 4. Tour Management
- Tour scheduling
- Tour details
- Reminders
- Agent-client coordination

### 5. Document Management
- Document upload/download
- Form filling
- Document sharing
- Version control

### 6. Marketing Tools
- Social media integration
- Content management
- Analytics
- Marketing checklists

### 7. Communication
- Real-time chat
- Notifications
- Email integration
- Message history

### 8. Education/Training
- Training modules
- Session management
- Progress tracking
- Module assessments

## Security Features

### Authentication
- Token-based authentication
- Session management
- Password encryption
- Two-factor authentication support

### Authorization
- Role-based access control
- Permission management
- API security
- Route protection

## API Integration

### Internal APIs
- Property API
- Marketing API
- Authentication API
- Document API

### External Services
- MLS Integration
- Social Media APIs
- Payment Processing
- Email Services

## Development Tools

### Build Tools
- Vite
- PostCSS
- Tailwind CSS
- ESLint

### Testing
- Unit testing setup
- Integration testing
- E2E testing capabilities

## Deployment

The application includes deployment scripts and configurations for:
- Production deployment
- Development environment
- Staging setup

## File Organization

### Public Assets (`/public/`)
- Images
- Icons
- Static files
- Fallback pages

### Source Code (`/src/`)
- Components
- Views
- Services
- Utilities
- Store definitions

### Documentation (`/docs/`)
- API documentation
- Database structure
- User guides
- Architecture documentation

## Conclusion

This application represents a comprehensive real estate client relations management system with robust features for property management, client communication, marketing, and document handling. The modular architecture allows for easy maintenance and scalability, while the role-based access control ensures secure and appropriate access to features based on user roles. 