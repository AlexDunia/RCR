# Laravel API Structure for Marketing Features

This document outlines the API structure needed to implement the backend for the marketing features.

## Overview

The marketing API follows a RESTful design with the following main resources:
- Marketing Plans
- Checklists
- Social Media Posts
- Templates

All endpoints are prefixed with `/api/marketing/` and require authentication.

## Authentication

All endpoints require a valid JWT token passed via the Authorization header:
```
Authorization: Bearer {token}
```

## API Endpoints

### Marketing Plans

**Get all marketing plans**
```
GET /api/marketing/plans
```

**Get a specific marketing plan**
```
GET /api/marketing/plans/{id}
```

**Create a new marketing plan**
```
POST /api/marketing/plans
```
Payload:
```json
{
  "title": "Q1 Marketing Plan",
  "strategyOverview": "Focus on digital channels",
  "targetAudience": "Small business owners",
  "marketingChannels": ["social", "email", "content"],
  "timeline": "Q1 2025",
  "status": "draft"
}
```

**Update a marketing plan**
```
PUT /api/marketing/plans/{id}
```
Payload: Same as create

**Delete a marketing plan**
```
DELETE /api/marketing/plans/{id}
```

### Checklists

**Get all checklists**
```
GET /api/marketing/checklists
```

**Get a specific checklist**
```
GET /api/marketing/checklists/{id}
```

**Create a new checklist**
```
POST /api/marketing/checklists
```
Payload:
```json
{
  "title": "Website Launch Checklist",
  "description": "Tasks to complete before launching the website",
  "dueDate": "2025-06-30T23:59:59Z",
  "items": [
    {
      "text": "Test all forms",
      "completed": false
    },
    {
      "text": "Check mobile responsiveness",
      "completed": false
    }
  ],
  "status": "draft",
  "progress": 0
}
```

**Update a checklist**
```
PUT /api/marketing/checklists/{id}
```
Payload: Same as create

**Delete a checklist**
```
DELETE /api/marketing/checklists/{id}
```

### Social Media Posts

**Get all social media posts**
```
GET /api/marketing/social/posts
```
Query parameters:
- `status`: Filter by status (draft, scheduled, published)

**Get a specific post**
```
GET /api/marketing/social/posts/{id}
```

**Create a new social media post**
```
POST /api/marketing/social/posts
```
Payload:
```json
{
  "title": "Product Launch Announcement",
  "content": "We're excited to announce our new product!",
  "platforms": ["facebook", "linkedin", "twitter"],
  "scheduledDate": "2025-05-15T09:00:00Z",
  "mediaUrls": ["https://example.com/image1.jpg"],
  "status": "scheduled"
}
```

**Update a social media post**
```
PUT /api/marketing/social/posts/{id}
```
Payload: Same as create

**Delete a social media post**
```
DELETE /api/marketing/social/posts/{id}
```

**Get social media metrics**
```
GET /api/marketing/social/metrics
```
Returns metrics for all connected platforms

**Get metrics for a specific platform**
```
GET /api/marketing/social/metrics/{platformId}
```

### Templates

**Get all templates**
```
GET /api/marketing/templates
```
Query parameters:
- `category`: Filter by category (email, social, content)

**Get a specific template**
```
GET /api/marketing/templates/{id}
```

## Database Schema

### Marketing Plans Table
```
id - bigint, primary key
user_id - bigint, foreign key
title - string
strategy_overview - text
target_audience - text
marketing_channels - json
timeline - string
status - string
created_at - timestamp
updated_at - timestamp
```

### Checklists Table
```
id - bigint, primary key
user_id - bigint, foreign key
title - string
description - text
due_date - timestamp
status - string
progress - integer
completed - boolean
created_at - timestamp
updated_at - timestamp
```

### Checklist Items Table
```
id - bigint, primary key
checklist_id - bigint, foreign key
text - string
completed - boolean
created_at - timestamp
updated_at - timestamp
```

### Social Posts Table
```
id - bigint, primary key
user_id - bigint, foreign key
title - string
content - text
platforms - json
scheduled_date - timestamp
media_urls - json
status - string
created_at - timestamp
updated_at - timestamp
```

## Error Responses

All errors follow a standard format:
```json
{
  "error": true,
  "message": "Error message",
  "errors": {
    "field_name": ["Error message for field"]
  }
}
```

## Status Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 422: Validation Error
- 500: Server Error 