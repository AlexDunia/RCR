# Real Estate Application Database Structure

## 1. Core User System

### Base Authentication (users table)
```sql
users
├── id (PK)                    # Unique identifier
├── name                       # User's full name
├── email                      # Unique email address
├── email_verified_at          # Email verification timestamp
├── password                   # Hashed password
├── role                       # 'admin', 'agent', or 'client'
└── remember_token            # Authentication persistence
```

### Extended Profiles

#### Client Profile
```sql
client_profiles
├── id (PK)
├── user_id (FK → users.id)    # Link to main user record
├── phone_number
├── address
├── preferences (JSON)
│   ├── property_types        # Preferred property types
│   ├── price_range          # Budget constraints
│   └── locations            # Preferred areas
├── budget_range
├── verification_status       # Identity verification status
├── subscription_status      # If using premium features
├── created_at
└── updated_at

client_preferences           # Detailed preferences table
├── id (PK)
├── client_id (FK → client_profiles.id)
├── preference_type         # type of preference
├── preference_value        # specific value
└── updated_at
```

#### Agent Profile
```sql
agent_profiles
├── id (PK)
├── user_id (FK → users.id)    # Link to main user record
├── license_number
├── agency_name
├── specialization
├── years_experience
├── service_areas (JSON)
├── bio
├── rating
├── verification_status       # License verification status
├── subscription_tier        # Service tier level
├── commission_rate         # Standard commission rate
├── created_at
└── updated_at

agent_specializations       # Detailed specializations table
├── id (PK)
├── agent_id (FK → agent_profiles.id)
├── specialization_type
├── experience_years
└── updated_at
```

## 2. Property Management

### Properties
```sql
properties
├── id (PK)
├── agent_id (FK → users.id)   # Agent who listed the property
├── title
├── description
├── price
├── status                    # available/sold/pending
├── type                      # house/apartment/etc
├── location
├── features (JSON)
│   ├── bedrooms
│   ├── bathrooms
│   ├── square_feet
│   └── amenities
├── created_at
└── updated_at

property_media              # Property images/videos
├── id (PK)
├── property_id (FK → properties.id)
├── media_type             # image/video/virtual_tour
├── url
├── order
└── created_at

property_features          # Detailed property features
├── id (PK)
├── property_id (FK → properties.id)
├── feature_type
├── feature_value
└── created_at
```

### Property Interactions
```sql
property_views
├── id (PK)
├── property_id (FK → properties.id)
├── client_id (FK → users.id)
├── view_type              # brief/detailed/virtual_tour
├── duration              # Time spent viewing
└── viewed_at

saved_properties
├── id (PK)
├── property_id (FK → properties.id)
├── client_id (FK → users.id)
├── saved_at
└── notes                 # Client's notes about property

property_inquiries        # Client questions about properties
├── id (PK)
├── property_id (FK → properties.id)
├── client_id (FK → users.id)
├── agent_id (FK → users.id)
├── question
├── answer
├── status               # pending/answered
├── created_at
└── updated_at
```

## 3. Tour System

### Property Tours
```sql
tours
├── id (PK)
├── property_id (FK → properties.id)
├── client_id (FK → users.id)
├── agent_id (FK → users.id)
├── scheduled_date
├── status                    # scheduled/completed/cancelled
├── tour_type               # in-person/virtual
├── notes
├── feedback                # Client feedback after tour
├── created_at
└── updated_at

tour_attendees            # Additional attendees for tours
├── id (PK)
├── tour_id (FK → tours.id)
├── name
├── email
└── relationship          # relation to client

tour_feedback            # Detailed tour feedback
├── id (PK)
├── tour_id (FK → tours.id)
├── rating
├── comments
├── interest_level       # Client's interest after tour
└── created_at
```

## 4. Task Management

### Tasks
```sql
tasks
├── id (PK)
├── user_id (FK → users.id)
├── title
├── description
├── due_date
├── status                    # pending/in_progress/completed
├── task_type                # agent/client
├── priority                 # low/medium/high
├── related_to              # property/tour/document/etc
├── related_id              # ID of related item
├── created_at
└── updated_at

task_reminders
├── id (PK)
├── task_id (FK → tasks.id)
├── reminder_time
├── reminder_type          # email/notification
└── status                # pending/sent

task_comments
├── id (PK)
├── task_id (FK → tasks.id)
├── user_id (FK → users.id)
├── comment
└── created_at
```

## 5. Marketing System

### Agent Marketing
```sql
marketing_plans
├── id (PK)
├── agent_id (FK → users.id)
├── title
├── description
├── status                    # draft/active/completed
├── budget
├── start_date
├── end_date
├── created_at
└── updated_at

marketing_activities
├── id (PK)
├── plan_id (FK → marketing_plans.id)
├── activity_type          # social/email/print/etc
├── status
├── scheduled_date
├── actual_date
└── results               # JSON metrics

marketing_expenses
├── id (PK)
├── plan_id (FK → marketing_plans.id)
├── amount
├── category
├── date
└── notes
```

### Checklists
```sql
checklists
├── id (PK)
├── agent_id (FK → users.id)
├── title
├── description
├── status
├── template              # if based on a template
├── created_at
└── updated_at

checklist_items
├── id (PK)
├── checklist_id (FK → checklists.id)
├── title
├── description
├── status                    # pending/completed
├── order
├── deadline
├── created_at
└── updated_at

checklist_templates        # Reusable checklist templates
├── id (PK)
├── title
├── description
├── category
└── created_at
```

## 6. Document Management

### Documents
```sql
documents
├── id (PK)
├── user_id (FK → users.id)
├── title
├── type                      # contract/listing/verification/etc
├── file_path
├── status                    # pending/approved/rejected
├── visibility               # private/shared/public
├── expiry_date             # for time-sensitive docs
├── created_at
└── updated_at

document_shares
├── id (PK)
├── document_id (FK → documents.id)
├── shared_with_id (FK → users.id)
├── permission_level        # view/edit
├── created_at
└── expires_at

document_versions
├── id (PK)
├── document_id (FK → documents.id)
├── version_number
├── file_path
├── changes_description
└── created_at
```

## 7. Communication

### Messages and Notifications
```sql
messages
├── id (PK)
├── sender_id (FK → users.id)
├── receiver_id (FK → users.id)
├── content
├── read_status              # read/unread
├── message_type            # text/property_share/document_share
├── related_to             # Optional reference to other content
├── created_at
└── updated_at

notifications
├── id (PK)
├── user_id (FK → users.id)
├── type                   # system/task/tour/etc
├── content
├── read_status
├── action_url            # Related action link
├── created_at
└── expires_at

communication_preferences
├── id (PK)
├── user_id (FK → users.id)
├── notification_type
├── enabled
├── email_enabled
└── updated_at
```

## 8. Analytics and Reporting

### Activity Tracking
```sql
user_activities
├── id (PK)
├── user_id (FK → users.id)
├── activity_type
├── activity_details
├── ip_address
├── device_info
└── created_at

analytics_events
├── id (PK)
├── event_type
├── user_id (FK → users.id)
├── properties           # JSON event properties
├── created_at
└── session_id

performance_metrics
├── id (PK)
├── user_id (FK → users.id)
├── metric_type         # response_time/conversion_rate/etc
├── value
├── period_start
└── period_end
```

## User Workflows

### Client User Flow
1. Registration Process:
   - Create record in `users` table
   - Create profile in `client_profiles`
   - Set initial preferences

2. Property Interaction:
   - Browse properties → recorded in `property_views`
   - Save favorites → stored in `saved_properties`
   - Schedule viewings → created in `tours`
   - Upload documents → stored in `documents`
   - Communicate with agents → through `messages`

### Agent User Flow
1. Registration Process:
   - Create record in `users` table
   - Create profile in `agent_profiles`
   - Set professional details

2. Property Management:
   - List properties → created in `properties`
   - Manage viewings → handle `tours`
   - Create marketing plans → in `marketing_plans`
   - Track tasks → managed in `tasks`
   - Handle documents → stored in `documents`
   - Communicate with clients → through `messages`

## Implementation Guidelines

### Data Relationships
1. Every feature table connects to `users` through foreign keys
2. Properties are linked to agents
3. Tours connect properties, clients, and agents
4. Tasks are user-specific with type distinction

### Security Measures
1. Role-based access control through user roles
2. Data encryption for sensitive information
3. Audit logging for critical operations
4. Secure file storage for documents

### Performance Optimization
1. Index Strategy:
   - All foreign key fields
   - Frequently searched columns
   - Status and date fields
   - Composite indexes for common queries

2. Caching Implementation:
   - Property listings
   - User profiles
   - Common queries
   - Document metadata

## Best Practices

### Data Integrity
1. Use transactions for related operations
2. Implement proper constraints
3. Validate data at database level
4. Maintain referential integrity

### Performance
1. Regular query optimization
2. Monitor database performance
3. Implement efficient caching
4. Regular maintenance schedule

### Security
1. Regular security audits
2. Encryption at rest
3. Secure access controls
4. Regular backup procedures

## Scaling Considerations

### Vertical Scaling
1. Query optimization
2. Proper indexing
3. Regular maintenance
4. Resource monitoring

### Horizontal Scaling
1. Database sharding for large tables
2. Read replicas for heavy read operations
3. Caching implementation
4. Load balancing

## Maintenance Guidelines

1. Regular Backups:
   - Daily incremental backups
   - Weekly full backups
   - Monthly archive backups

2. Performance Monitoring:
   - Query performance
   - Resource usage
   - User activity
   - System health

3. Data Cleanup:
   - Archive old records
   - Clean up temporary data
   - Maintain audit logs
   - Update indexes 