# Real Estate Application Database Structure

## 1. Core Authentication System

### Users Table
The foundation of the authentication system:
```sql
users
├── id (PK)                    # Primary identifier
├── name                       # User's full name
├── email                      # Unique email for authentication
├── email_verified_at          # Timestamp of email verification
├── password                   # Hashed password
├── role                       # 'admin', 'agent', or 'client'
└── remember_token            # For "remember me" functionality
```

## 2. Profile Management

### Client Profiles
Extended information for client users:
```sql
client_profiles
├── id (PK)                    # Primary identifier
├── user_id (FK)               # References users.id
├── phone_number              # Contact number
├── address                   # Physical address
├── preferences (JSON)        # Property preferences
│   ├── property_types       # e.g., ['apartment', 'house']
│   ├── price_range         # e.g., { min: 100000, max: 500000 }
│   └── preferred_locations # e.g., ['downtown', 'suburbs']
├── budget_range             # Numeric range for property search
├── created_at              # Profile creation timestamp
└── updated_at              # Last update timestamp
```

### Agent Profiles
Professional information for real estate agents:
```sql
agent_profiles
├── id (PK)                    # Primary identifier
├── user_id (FK)               # References users.id
├── license_number            # Real estate license
├── agency_name              # Affiliated agency
├── specialization          # e.g., 'residential', 'commercial'
├── years_of_experience     # Numeric value
├── service_areas (JSON)     # Coverage areas
├── bio                     # Professional description
├── rating                  # Average rating (1-5)
├── created_at              # Profile creation timestamp
└── updated_at              # Last update timestamp
```

## 3. Property Management

### Properties
Core property listing information:
```sql
properties
├── id (PK)                    # Primary identifier
├── agent_id (FK)              # References users.id (agent)
├── title                     # Property title
├── description              # Detailed description
├── price                    # Listed price
├── status                   # 'available', 'sold', 'pending'
├── type                     # Property type
├── location                 # Property location
├── features (JSON)          # Property features
│   ├── bedrooms           # Number of bedrooms
│   ├── bathrooms         # Number of bathrooms
│   ├── square_feet       # Property size
│   └── amenities         # Array of amenities
├── created_at              # Listing creation date
└── updated_at              # Last update timestamp
```

### Property Interactions
Track client interactions with properties:
```sql
property_views
├── id (PK)                    # Primary identifier
├── property_id (FK)           # References properties.id
├── client_id (FK)             # References users.id
└── viewed_at                 # Timestamp of view

saved_properties
├── id (PK)                    # Primary identifier
├── property_id (FK)           # References properties.id
├── client_id (FK)             # References users.id
└── saved_at                  # Timestamp when saved
```

## 4. Tour Management

### Property Tours
Manage property viewings:
```sql
tours
├── id (PK)                    # Primary identifier
├── property_id (FK)           # References properties.id
├── client_id (FK)             # References users.id (client)
├── agent_id (FK)              # References users.id (agent)
├── scheduled_date            # Tour date and time
├── status                    # 'scheduled', 'completed', 'cancelled'
├── notes                    # Additional information
├── created_at               # Tour request timestamp
└── updated_at               # Last update timestamp
```

## 5. Task Management

### Tasks
Manage tasks for both agents and clients:
```sql
tasks
├── id (PK)                    # Primary identifier
├── user_id (FK)               # References users.id
├── title                     # Task title
├── description              # Task description
├── due_date                 # Completion deadline
├── status                   # 'pending', 'in_progress', 'completed'
├── task_type                # 'agent' or 'client'
├── priority                 # 'low', 'medium', 'high'
├── created_at               # Task creation timestamp
└── updated_at               # Last update timestamp
```

## 6. Marketing Management

### Marketing Plans
Agent marketing strategies:
```sql
marketing_plans
├── id (PK)                    # Primary identifier
├── agent_id (FK)              # References users.id
├── title                     # Plan title
├── description              # Plan details
├── status                   # 'draft', 'active', 'completed'
├── start_date              # Implementation start date
├── end_date                # Implementation end date
├── created_at              # Plan creation timestamp
└── updated_at              # Last update timestamp
```

### Checklists
Task tracking for agents:
```sql
checklists
├── id (PK)                    # Primary identifier
├── agent_id (FK)              # References users.id
├── title                     # Checklist title
├── description              # Checklist purpose
├── status                   # 'active', 'completed'
├── created_at               # Creation timestamp
└── updated_at               # Last update timestamp

checklist_items
├── id (PK)                    # Primary identifier
├── checklist_id (FK)          # References checklists.id
├── title                     # Item description
├── status                    # 'pending', 'completed'
├── order                    # Item sequence
├── created_at               # Item creation timestamp
└── updated_at               # Last update timestamp
```

## 7. Document Management

### Documents
Store and manage user documents:
```sql
documents
├── id (PK)                    # Primary identifier
├── user_id (FK)               # References users.id
├── title                     # Document title
├── type                      # Document type
├── file_path                # Storage location
├── status                   # 'pending', 'approved', 'rejected'
├── created_at               # Upload timestamp
└── updated_at               # Last update timestamp
```

## 8. Communication System

### Messages
Internal communication system:
```sql
messages
├── id (PK)                    # Primary identifier
├── sender_id (FK)             # References users.id
├── receiver_id (FK)           # References users.id
├── content                   # Message content
├── read_status              # 'read', 'unread'
├── created_at               # Message timestamp
└── updated_at               # Last update timestamp
```

## 9. Data Flow and Relationships

### Client Journey
1. **Registration Flow**
   - Create user record in `users` table
   - Create client profile in `client_profiles`
   - Set initial preferences

2. **Property Interaction Flow**
   - View properties → Record in `property_views`
   - Save favorites → Record in `saved_properties`
   - Request tours → Create in `tours`
   - Manage tasks → Create in `tasks`
   - Upload documents → Store in `documents`

### Agent Journey
1. **Registration Flow**
   - Create user record in `users` table
   - Create agent profile in `agent_profiles`
   - Set up professional details

2. **Property Management Flow**
   - Create listings → Add to `properties`
   - Manage tours → Update `tours`
   - Create marketing plans → Add to `marketing_plans`
   - Manage checklists → Use `checklists` and `checklist_items`
   - Track tasks → Create in `tasks`

## 10. Implementation Guidelines

### Database Optimization
1. **Indexing Strategy**
   - Index all foreign keys
   - Index frequently searched fields
   - Index status and date fields
   - Consider composite indexes for common queries

2. **Performance Considerations**
   - Implement caching for frequent queries
   - Use pagination for large result sets
   - Optimize JSON columns for performance
   - Regular database maintenance

### Security Measures
1. **Access Control**
   - Implement role-based access
   - Row-level security where needed
   - Encrypt sensitive data
   - Regular security audits

2. **Data Protection**
   - Regular backups
   - Soft deletes for important data
   - Audit logging for sensitive operations
   - Data retention policies

## 11. Scaling Considerations

### Vertical Scaling
1. Query optimization
2. Proper indexing
3. Regular maintenance
4. Resource monitoring

### Horizontal Scaling
1. Database sharding strategies
2. Read replicas for heavy read operations
3. Caching implementation
4. Load balancing

## 12. Best Practices

1. **Data Integrity**
   - Use transactions for related operations
   - Implement proper constraints
   - Validate data at database level
   - Maintain referential integrity

2. **Performance**
   - Regular query optimization
   - Monitor database performance
   - Implement efficient caching
   - Regular maintenance schedule

3. **Security**
   - Regular security audits
   - Encryption at rest
   - Secure access controls
   - Regular backup procedures 