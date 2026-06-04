-- Create ENUMs
CREATE TYPE user_status AS ENUM ('active', 'suspended', 'deleted');
CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'expired');
CREATE TYPE camera_status AS ENUM ('online', 'offline', 'maintenance');
CREATE TYPE sponsor_status AS ENUM ('active', 'inactive');
CREATE TYPE payment_status AS ENUM ('pending', 'success', 'failed', 'refunded');

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  image TEXT,
  status user_status NOT NULL DEFAULT 'active',
  email_verified_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);

-- Password Resets table
CREATE TABLE password_resets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  token VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_password_resets_user_id ON password_resets(user_id);
CREATE INDEX idx_password_resets_token ON password_resets(token);

-- Plans table
CREATE TABLE plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  price_monthly INTEGER,
  price_annual INTEGER,
  features TEXT[],
  is_default BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_plans_name ON plans(name);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  plan_id UUID NOT NULL,
  status subscription_status NOT NULL DEFAULT 'active',
  current_period_start TIMESTAMP NOT NULL DEFAULT NOW(),
  current_period_end TIMESTAMP NOT NULL,
  cancelled_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_plan_id ON subscriptions(plan_id);
CREATE UNIQUE INDEX idx_subscription_active ON subscriptions(user_id) WHERE status = 'active';

-- Beaches table
CREATE TABLE beaches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  latitude TEXT,
  longitude TEXT,
  image TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_beaches_slug ON beaches(slug);

-- Locations table
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  beach_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  latitude TEXT,
  longitude TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_locations_beach_id ON locations(beach_id);

-- Cameras table
CREATE TABLE cameras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  rtsp_url TEXT NOT NULL,
  status camera_status NOT NULL DEFAULT 'offline',
  is_public BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_cameras_location_id ON cameras(location_id);
CREATE INDEX idx_cameras_status ON cameras(status);

-- Camera Streams table
CREATE TABLE camera_streams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  camera_id UUID NOT NULL,
  hls_url_720p TEXT,
  hls_url_1080p TEXT,
  status camera_status NOT NULL DEFAULT 'offline',
  last_health_check TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_camera_streams_camera_id ON camera_streams(camera_id);

-- Camera Snapshots table
CREATE TABLE camera_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  camera_id UUID NOT NULL,
  image_url TEXT NOT NULL,
  taken_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_camera_snapshots_camera_id ON camera_snapshots(camera_id);
CREATE INDEX idx_camera_snapshots_taken_at ON camera_snapshots(taken_at);

-- Camera Replays table
CREATE TABLE camera_replays (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  camera_id UUID NOT NULL,
  playlist_url TEXT NOT NULL,
  resolution VARCHAR(20) NOT NULL DEFAULT '720p',
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_camera_replays_camera_id ON camera_replays(camera_id);
CREATE INDEX idx_camera_replays_expires_at ON camera_replays(expires_at);

-- Camera Views table
CREATE TABLE camera_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  camera_id UUID NOT NULL,
  user_id UUID,
  watched_at TIMESTAMP NOT NULL DEFAULT NOW(),
  watch_duration INTEGER,
  quality VARCHAR(20),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_camera_views_camera_id ON camera_views(camera_id);
CREATE INDEX idx_camera_views_user_id ON camera_views(user_id);
CREATE INDEX idx_camera_views_watched_at ON camera_views(watched_at);

-- Favorite Cameras table
CREATE TABLE favorite_cameras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  camera_id UUID NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_favorite_cameras_user_id ON favorite_cameras(user_id);
CREATE INDEX idx_favorite_cameras_camera_id ON favorite_cameras(camera_id);
CREATE UNIQUE INDEX idx_favorite_cameras_user_camera ON favorite_cameras(user_id, camera_id);

-- Sponsors table
CREATE TABLE sponsors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  website TEXT,
  logo TEXT,
  status sponsor_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sponsors_name ON sponsors(name);

-- Sponsor Packages table
CREATE TABLE sponsor_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price_monthly INTEGER NOT NULL,
  slots INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Sponsor Placements table
CREATE TABLE sponsor_placements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sponsor_id UUID NOT NULL,
  beach_id UUID,
  camera_id UUID,
  position INTEGER NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sponsor_placements_sponsor_id ON sponsor_placements(sponsor_id);
CREATE INDEX idx_sponsor_placements_beach_id ON sponsor_placements(beach_id);
CREATE INDEX idx_sponsor_placements_camera_id ON sponsor_placements(camera_id);

-- Payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID NOT NULL,
  amount INTEGER NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'BRL',
  status payment_status NOT NULL DEFAULT 'pending',
  method VARCHAR(50),
  mercado_pago_id VARCHAR(255),
  due_at TIMESTAMP,
  paid_at TIMESTAMP,
  failure_reason TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_payments_subscription_id ON payments(subscription_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_mercado_pago_id ON payments(mercado_pago_id);

-- Admin Users table
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'moderator',
  permissions TEXT[],
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_admin_users_user_id ON admin_users(user_id);

-- Audit Logs table
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  action VARCHAR(255) NOT NULL,
  resource VARCHAR(255) NOT NULL,
  resource_id UUID,
  changes TEXT,
  ip_address VARCHAR(50),
  user_agent TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- Camera Status Logs table
CREATE TABLE camera_status_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  camera_id UUID NOT NULL,
  previous_status camera_status NOT NULL,
  new_status camera_status NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_camera_status_logs_camera_id ON camera_status_logs(camera_id);
CREATE INDEX idx_camera_status_logs_created_at ON camera_status_logs(created_at);

-- Daily Camera Stats table
CREATE TABLE daily_camera_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  camera_id UUID NOT NULL,
  date TIMESTAMP NOT NULL,
  views INTEGER NOT NULL DEFAULT 0,
  unique_users INTEGER NOT NULL DEFAULT 0,
  watch_time_seconds INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_daily_camera_stats_camera_id ON daily_camera_stats(camera_id);
CREATE INDEX idx_daily_camera_stats_date ON daily_camera_stats(date);

-- App Settings table
CREATE TABLE app_settings (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
