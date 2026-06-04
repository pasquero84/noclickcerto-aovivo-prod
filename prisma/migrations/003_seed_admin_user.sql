-- Create admin user
INSERT INTO users (email, name, status)
VALUES
  ('admin@noclickcerto.com.br', 'Admin User', 'active');

-- Create admin role for this user
INSERT INTO admin_users (user_id, role, permissions)
VALUES
  (
    (SELECT id FROM users WHERE email = 'admin@noclickcerto.com.br' LIMIT 1),
    'admin',
    ARRAY[
      'manage_users',
      'manage_cameras',
      'manage_plans',
      'manage_sponsors',
      'manage_payments',
      'view_analytics',
      'manage_admins'
    ]
  );
