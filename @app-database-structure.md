# Real Estate Application Database Structure

[Previous content remains the same until "User Workflows" section]

## Database Relationships

### Core Entity Relationships
```mermaid
erDiagram
    users ||--o{ client_profiles : has
    users ||--o{ agent_profiles : has
    users ||--o{ documents : owns
    users ||--o{ messages : sends
    users ||--o{ tasks : manages
    users ||--o{ notifications : receives

    client_profiles ||--o{ client_preferences : has
    client_profiles ||--o{ saved_properties : saves
    client_profiles ||--o{ property_views : views
    client_profiles ||--o{ tours : books

    agent_profiles ||--o{ agent_specializations : has
    agent_profiles ||--o{ properties : lists
    agent_profiles ||--o{ marketing_plans : creates
    agent_profiles ||--o{ checklists : manages

    properties ||--o{ property_media : has
    properties ||--o{ property_features : contains
    properties ||--o{ property_views : tracked_in
    properties ||--o{ saved_properties : saved_in
    properties ||--o{ tours : scheduled_for

    marketing_plans ||--o{ marketing_activities : includes
    marketing_plans ||--o{ marketing_expenses : tracks

    checklists ||--o{ checklist_items : contains
    checklists }o--|| checklist_templates : based_on

    documents ||--o{ document_shares : shared_through
    documents ||--o{ document_versions : versioned_in

    tasks ||--o{ task_reminders : has
    tasks ||--o{ task_comments : contains

    tours ||--o{ tour_attendees : includes
    tours ||--o{ tour_feedback : receives
```

### Analytics and Communication Flow
```mermaid
flowchart TD
    User[User Activity] --> UA[user_activities]
    User --> AE[analytics_events]
    User --> PM[performance_metrics]
    
    UA --> Analytics[Analytics Dashboard]
    AE --> Analytics
    PM --> Analytics
    
    Client[Client] --> M[Messages]
    Agent[Agent] --> M
    M --> N[Notifications]
    
    Client --> CP[Communication Preferences]
    Agent --> CP
    CP --> N
    
    N --> Email[Email Notifications]
    N --> Push[Push Notifications]
    N --> InApp[In-App Notifications]
```

### Property and Tour Management Flow
```mermaid
flowchart LR
    Agent[Agent] --> CreateListing[Create Listing]
    CreateListing --> Property[Property]
    Property --> Media[Property Media]
    Property --> Features[Property Features]
    
    Client[Client] --> ViewProperty[View Property]
    ViewProperty --> PropertyView[Property Views]
    Client --> SaveProperty[Save Property]
    SaveProperty --> SavedProperties[Saved Properties]
    
    Client --> RequestTour[Request Tour]
    RequestTour --> Tour[Tour]
    Tour --> TourAttendees[Tour Attendees]
    Tour --> TourFeedback[Tour Feedback]
    
    Agent --> ManageTour[Manage Tour]
    ManageTour --> Tour
    
    Client --> Inquire[Make Inquiry]
    Inquire --> PropertyInquiry[Property Inquiry]
    Agent --> RespondInquiry[Respond to Inquiry]
    RespondInquiry --> PropertyInquiry
```

## Key Relationships Explained

### User-Based Relationships
1. **User to Profiles**
   - One user can have either a client profile or an agent profile
   - Profiles contain role-specific information
   - Both profiles link back to the base user record

2. **User to Activities**
   - All user actions are tracked in user_activities
   - Analytics events are associated with users
   - Performance metrics are tracked per user

### Property-Based Relationships
1. **Property to Agent**
   - Each property must be associated with an agent
   - Agents can have multiple properties
   - Property features and media are linked to properties

2. **Property to Client Interactions**
   - Clients can view properties (tracked in property_views)
   - Clients can save properties (saved_properties)
   - Clients can make inquiries about properties

### Tour-Based Relationships
1. **Tour Connections**
   - Tours connect properties, clients, and agents
   - Tours can have multiple attendees
   - Tours can receive feedback
   - Tours status is tracked and managed

### Task-Based Relationships
1. **Task Management**
   - Tasks can be associated with any user type
   - Tasks can be related to various entities (properties, tours, etc.)
   - Tasks can have reminders and comments

### Document-Based Relationships
1. **Document Management**
   - Documents can be owned by any user type
   - Documents can be shared with multiple users
   - Documents can have multiple versions
   - Document access is controlled through shares

## Implementation Notes

### Database Constraints
1. **Foreign Key Constraints**
   - All FK relationships should be properly constrained
   - Use ON DELETE CASCADE where appropriate
   - Use ON DELETE RESTRICT to prevent orphaned records

2. **Unique Constraints**
   - Email addresses in users table
   - License numbers in agent_profiles
   - Property-client combinations in saved_properties

### Indexing Strategy
1. **Primary Indexes**
   - All PK fields are automatically indexed
   - All FK fields should be indexed

2. **Secondary Indexes**
   - Status fields for filtering
   - Date fields for sorting and filtering
   - Search fields (email, name, title)

3. **Composite Indexes**
   - (property_id, client_id) for property interactions
   - (sender_id, receiver_id) for messages
   - (user_id, created_at) for activities

### Performance Considerations
1. **Query Optimization**
   - Use appropriate indexes for common queries
   - Consider partitioning for large tables
   - Implement caching for frequent reads

2. **Data Distribution**
   - Shard based on user_id for large deployments
   - Consider read replicas for analytics
   - Cache frequently accessed data

[Previous sections on Best Practices, Scaling Considerations, and Maintenance Guidelines remain the same] 