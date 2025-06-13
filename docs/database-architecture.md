# Database Architecture Documentation

## Overview
This document outlines the database architecture for managing different user types (Admin, Agent, Client) and their associated data in the RCR application.

## Core User Management

### Users Table (Base Table)
```sql
users
- id (PK)
- name
- email
- email_verified_at
- password
- role
- remember_token
```

### User Type Extensions

#### Client Profile
```sql
client_profiles
- id (PK)
- user_id (FK -> users.id)
- phone_number
- address
- preferences
- budget_range
- preferred_locations
- created_at
- updated_at
```

#### Agent Profile
```sql
agent_profiles
- id (PK)
- user_id (FK -> users.id)
- license_number
- agency_name
- specialization
- years_of_experience
- service_areas
- bio
- rating
- created_at
- updated_at
```

## Property Management

### Properties
```sql
properties
- id (PK)
- agent_id (FK -> users.id)
- title
- description
- price
- status (available, sold, pending)
- type (house, apartment, etc.)
- location
- features
- created_at
- updated_at
```

### Property Relationships
```sql
property_views
- id (PK)
- property_id (FK -> properties.id)
- client_id (FK -> users.id)
- viewed_at

saved_properties
- id (PK)
- property_id (FK -> properties.id)
- client_id (FK -> users.id)
- saved_at
```

## Tour Management

### Property Tours
```sql
tours
- id (PK)
- property_id (FK -> properties.id)
- client_id (FK -> users.id)
- agent_id (FK -> users.id)
- scheduled_date
- status (scheduled, completed, cancelled)
- notes
- created_at
- updated_at
```

## Task Management

### Agent Tasks
```sql
agent_tasks
- id (PK)
- agent_id (FK -> users.id)
- title
- description
- due_date
- priority
- status
- created_at
- updated_at
```

### Client Tasks
```sql
client_tasks
- id (PK)
- client_id (FK -> users.id)
- title
- description
- due_date
- status
- created_at
- updated_at
```

## Marketing Management

### Marketing Plans
```sql
marketing_plans
- id (PK)
- agent_id (FK -> users.id)
- title
- description
- status
- start_date
- end_date
- created_at
- updated_at
```

### Checklists
```sql
checklists
- id (PK)
- agent_id (FK -> users.id)
- title
- description
- status
- due_date
- created_at
- updated_at

checklist_items
- id (PK)
- checklist_id (FK -> checklists.id)
- title
- status
- order
- created_at
- updated_at
```

## Document Management

### Documents
```sql
documents
- id (PK)
- user_id (FK -> users.id)
- title
- type
- file_path
- status
- created_at
- updated_at
```

## Communication

### Messages
```sql
messages
- id (PK)
- sender_id (FK -> users.id)
- receiver_id (FK -> users.id)
- content
- read_status
- created_at
- updated_at
```

## Relationships and Data Flow

### Client Flow
1. Client registers → users table
2. Client profile created → client_profiles
3. Client can:
   - View properties → property_views
   - Save properties → saved_properties
   - Schedule tours → tours
   - Manage tasks → client_tasks
   - Upload documents → documents
   - Communicate → messages

### Agent Flow
1. Agent registers → users table
2. Agent profile created → agent_profiles
3. Agent can:
   - List properties → properties
   - Manage tours → tours
   - Create marketing plans → marketing_plans
   - Manage checklists → checklists
   - Track tasks → agent_tasks
   - Upload documents → documents
   - Communicate → messages

## Data Access Patterns

### Client Access
- Direct access to own profile
- Read-only access to property listings
- Full access to own tours, tasks, and documents
- Communication with assigned agents

### Agent Access
- Full access to own profile and listings
- Access to assigned client information
- Management of tours and tasks
- Full access to marketing tools
- Communication with clients

### Admin Access
- Full access to all tables
- Monitoring and management capabilities
- System-wide analytics access

## Best Practices

### Data Integrity
1. Use foreign key constraints
2. Implement soft deletes where appropriate
3. Maintain audit logs for sensitive operations

### Performance
1. Index frequently queried columns
2. Optimize join operations
3. Consider caching for frequently accessed data

### Security
1. Encrypt sensitive data
2. Implement row-level security
3. Regular backup procedures

## Scaling Considerations

### Horizontal Scaling
- Separate read/write operations
- Consider sharding for large tables
- Implement caching strategies

### Vertical Scaling
- Optimize query performance
- Regular database maintenance
- Monitor resource usage

## Technical Implementation Notes

1. Use migrations for schema changes
2. Implement model relationships
3. Consider using database views for complex queries
4. Implement proper indexing strategy
5. Regular backup and recovery procedures 