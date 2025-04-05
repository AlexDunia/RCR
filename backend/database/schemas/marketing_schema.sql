-- Marketing database schema for PostgreSQL
-- This file defines the tables needed for the marketing module

-- Create marketing schema for organization
CREATE SCHEMA IF NOT EXISTS marketing;

-- Enable row-level security for proper data isolation
ALTER DATABASE rcr_database SET row_security = on;

-- ========== MARKETING PLANS ==========
CREATE TABLE marketing.plans (
    id SERIAL PRIMARY KEY,
    agent_id INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    strategy_overview TEXT,
    target_audience TEXT,
    goals JSONB,
    start_date DATE,
    end_date DATE,
    status VARCHAR(50) DEFAULT 'draft', -- draft, active, completed, archived
    creation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Plan channels (associated marketing channels for a plan)
CREATE TABLE marketing.plan_channels (
    id SERIAL PRIMARY KEY,
    plan_id INTEGER NOT NULL REFERENCES marketing.plans(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    highlight BOOLEAN DEFAULT false,
    target_metrics JSONB,
    sort_order INTEGER DEFAULT 0
);

-- Row-level security for plans
ALTER TABLE marketing.plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY plans_isolation_policy ON marketing.plans
    USING (agent_id = current_setting('app.current_user_id')::INTEGER);

ALTER TABLE marketing.plan_channels ENABLE ROW LEVEL SECURITY;
CREATE POLICY plan_channels_isolation_policy ON marketing.plan_channels
    USING (plan_id IN (SELECT id FROM marketing.plans WHERE agent_id = current_setting('app.current_user_id')::INTEGER));

-- ========== CHECKLISTS ==========
CREATE TABLE marketing.checklists (
    id SERIAL PRIMARY KEY,
    agent_id INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    status VARCHAR(50) DEFAULT 'active', -- active, completed, archived
    completion_percentage INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Individual checklist items
CREATE TABLE marketing.checklist_items (
    id SERIAL PRIMARY KEY,
    checklist_id INTEGER NOT NULL REFERENCES marketing.checklists(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    completed BOOLEAN DEFAULT false,
    completion_date TIMESTAMP WITH TIME ZONE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Row-level security for checklists
ALTER TABLE marketing.checklists ENABLE ROW LEVEL SECURITY;
CREATE POLICY checklists_isolation_policy ON marketing.checklists
    USING (agent_id = current_setting('app.current_user_id')::INTEGER);

ALTER TABLE marketing.checklist_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY checklist_items_isolation_policy ON marketing.checklist_items
    USING (checklist_id IN (SELECT id FROM marketing.checklists WHERE agent_id = current_setting('app.current_user_id')::INTEGER));

-- ========== SOCIAL MEDIA ==========
CREATE TABLE marketing.social_platforms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Agent's social platform connections
CREATE TABLE marketing.agent_social_accounts (
    id SERIAL PRIMARY KEY,
    agent_id INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    platform_id INTEGER NOT NULL REFERENCES marketing.social_platforms(id) ON DELETE CASCADE,
    account_name VARCHAR(100) NOT NULL,
    account_url VARCHAR(255),
    access_token TEXT,
    refresh_token TEXT,
    token_expires_at TIMESTAMP WITH TIME ZONE,
    connected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_synced_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(agent_id, platform_id)
);

-- Social media posts
CREATE TABLE marketing.social_posts (
    id SERIAL PRIMARY KEY,
    agent_id INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title VARCHAR(255),
    content TEXT NOT NULL,
    images TEXT[],
    platforms INTEGER[] NOT NULL, -- Array of platform IDs
    status VARCHAR(50) DEFAULT 'draft', -- draft, scheduled, published, archived
    scheduled_date TIMESTAMP WITH TIME ZONE,
    published_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Social media metrics (time-series data)
CREATE TABLE marketing.social_metrics (
    id SERIAL PRIMARY KEY,
    agent_id INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    platform_id INTEGER NOT NULL REFERENCES marketing.social_platforms(id) ON DELETE CASCADE,
    post_id INTEGER REFERENCES marketing.social_posts(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    followers INTEGER,
    likes INTEGER,
    comments INTEGER,
    shares INTEGER,
    impressions INTEGER,
    reach INTEGER,
    engagement_rate DECIMAL(5,2),
    video_views INTEGER,
    avg_watch_time INTEGER, -- in seconds
    additional_metrics JSONB,
    UNIQUE(agent_id, platform_id, post_id, date)
);

-- Row-level security for social media
ALTER TABLE marketing.agent_social_accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY agent_social_accounts_isolation_policy ON marketing.agent_social_accounts
    USING (agent_id = current_setting('app.current_user_id')::INTEGER);

ALTER TABLE marketing.social_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY social_posts_isolation_policy ON marketing.social_posts
    USING (agent_id = current_setting('app.current_user_id')::INTEGER);

ALTER TABLE marketing.social_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY social_metrics_isolation_policy ON marketing.social_metrics
    USING (agent_id = current_setting('app.current_user_id')::INTEGER);

-- ========== MARKETING TEMPLATES ==========
CREATE TABLE marketing.template_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Pre-built marketing templates
CREATE TABLE marketing.templates (
    id SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL REFERENCES marketing.template_categories(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    thumbnail_url VARCHAR(255),
    content_template TEXT NOT NULL,
    metadata JSONB,
    is_premium BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Agent's custom templates
CREATE TABLE marketing.agent_custom_templates (
    id SERIAL PRIMARY KEY,
    agent_id INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES marketing.template_categories(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    thumbnail_url VARCHAR(255),
    metadata JSONB,
    is_favorite BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Row-level security for templates
ALTER TABLE marketing.agent_custom_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY agent_custom_templates_isolation_policy ON marketing.agent_custom_templates
    USING (agent_id = current_setting('app.current_user_id')::INTEGER);

-- Insert initial data
INSERT INTO marketing.social_platforms (name, icon) VALUES 
    ('X', 'twitter'),
    ('Facebook', 'facebook'),
    ('LinkedIn', 'linkedin'),
    ('Instagram', 'instagram'),
    ('Pinterest', 'pinterest');

INSERT INTO marketing.template_categories (name, icon) VALUES
    ('Email', 'email'),
    ('Social Media', 'social'),
    ('Flyers', 'document'),
    ('Postcards', 'mail');

-- Indexes for performance
CREATE INDEX idx_plans_agent_id ON marketing.plans(agent_id);
CREATE INDEX idx_plans_status ON marketing.plans(status);
CREATE INDEX idx_checklists_agent_id ON marketing.checklists(agent_id);
CREATE INDEX idx_checklist_items_checklist_id ON marketing.checklist_items(checklist_id);
CREATE INDEX idx_social_posts_agent_id ON marketing.social_posts(agent_id);
CREATE INDEX idx_social_posts_status ON marketing.social_posts(status);
CREATE INDEX idx_social_metrics_agent_platform ON marketing.social_metrics(agent_id, platform_id);
CREATE INDEX idx_social_metrics_post_id ON marketing.social_metrics(post_id);
CREATE INDEX idx_social_metrics_date ON marketing.social_metrics(date);
CREATE INDEX idx_agent_custom_templates_agent_id ON marketing.agent_custom_templates(agent_id); 