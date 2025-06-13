# Database Structure Documentation

## Core User System

### Base User Table
Your current user table structure:
```
users
- id (PK)
- name
- email
- email_verified_at
- password
- role
- remember_token
```

### Extended Profile Tables

For Clients:
```
client_profiles
- id (PK)
- user_id (FK)
- phone
- address
- preferences (JSON)
- budget_range
- preferred_locations
```

For Agents:
```
agent_profiles
- id (PK)
- user_id (FK)
- license_number
- agency
- specialization
- experience
- service_areas
- bio
```

## Feature Tables

### Property Management
```
properties
- id (PK)
- agent_id (FK)
- title
- description
- price
- status
- location
- features

property_views
- property_id (FK)
- client_id (FK)
- viewed_at

saved_properties
- property_id (FK)
- client_id (FK)
- saved_at
```

### Tour System
```
tours
- id (PK)
- property_id (FK)
- client_id (FK)
- agent_id (FK)
- scheduled_date
- status
- notes
```

### Task Management
```
tasks
- id (PK)
- user_id (FK)
- type (agent/client)
- title
- description
- due_date
- status
- priority
```

### Marketing System
```
marketing_plans
- id (PK)
- agent_id (FK)
- title
- description
- status
- start_date
- end_date

checklists
- id (PK)
- agent_id (FK)
- title
- status

checklist_items
- id (PK)
- checklist_id (FK)
- title
- status
- order
```

## Data Flow by User Type

### Client Journey
1. Registration:
   - Create entry in users table
   - Create client profile
   - Set preferences

2. Activities:
   - View properties → tracked in property_views
   - Save properties → saved_properties
   - Schedule tours → tours table
   - Manage tasks → tasks table (client type)

### Agent Journey
1. Registration:
   - Create entry in users table
   - Create agent profile
   - Set specializations

2. Activities:
   - List properties → properties table
   - Manage tours → tours table
   - Create marketing plans → marketing_plans
   - Manage checklists → checklists
   - Handle tasks → tasks table (agent type)

### Admin Access
- Full access to all tables
- Monitoring capabilities
- System management

## Implementation Notes

### Data Relationships
1. Every feature table links back to users through FK
2. Properties link to agents
3. Tours link properties, clients, and agents
4. Tasks are user-specific with type distinction

### Security Considerations
1. Role-based access control
2. Data encryption for sensitive fields
3. Audit logging for important operations

### Performance Tips
1. Index common query fields:
   - Foreign keys
   - Status fields
   - Date fields
2. Consider caching for:
   - Property listings
   - User profiles
   - Common queries

## Best Practices

1. Always use transactions for related operations
2. Implement soft deletes where appropriate
3. Regular backup procedures
4. Monitor database performance
5. Use appropriate indexing strategies

## Scaling Considerations

1. Vertical Scaling:
   - Optimize queries
   - Proper indexing
   - Regular maintenance

2. Horizontal Scaling:
   - Consider sharding for large tables
   - Implement caching
   - Use read replicas 