-- Insert Plans
INSERT INTO plans (name, description, price_monthly, price_annual, features, is_default)
VALUES
  (
    'Free',
    'Plano gratuito com funcionalidades básicas',
    0,
    0,
    ARRAY['Todas as câmeras em 720p', 'Atualização a cada 30s', 'Sem replay'],
    TRUE
  ),
  (
    'Premium',
    'Plano premium com todas as funcionalidades',
    599,
    5990,
    ARRAY['Tempo real', '1080p', 'Replay 30 dias', 'Histórico de snapshots', 'Favoritos'],
    FALSE
  );

-- Insert Beaches
INSERT INTO beaches (name, slug, description, latitude, longitude)
VALUES
  ('Itamambuca', 'itamambuca', 'Praia de Itamambuca', '-23.8633', '-45.0733'),
  ('Praia Grande', 'praia-grande', 'Praia Grande', '-23.8733', '-45.0833'),
  ('Perequê-Açu', 'perequê-açu', 'Praia de Perequê-Açu', '-23.8533', '-45.0633'),
  ('Vermelha do Centro', 'vermelha-centro', 'Praia Vermelha do Centro', '-23.8833', '-45.0933'),
  ('A Preferida do Lado Norte de Ubatuba', 'a-preferida-norte', 'Praia A Preferida', '-23.8433', '-45.0533'),
  ('Toninhas', 'toninhas', 'Praia de Toninhas', '-23.8933', '-45.1033'),
  ('Praia do Félix', 'praia-do-felix', 'Praia do Félix (em breve)', '-23.9033', '-45.1133');

-- Insert Locations
INSERT INTO locations (beach_id, name, description)
VALUES
  ((SELECT id FROM beaches WHERE slug = 'itamambuca'), 'Canto Direito', 'Ponto de surf Canto Direito'),
  ((SELECT id FROM beaches WHERE slug = 'itamambuca'), 'Rua 1', 'Localização na Rua 1'),
  ((SELECT id FROM beaches WHERE slug = 'praia-grande'), 'Baguari', 'Ponto de surf Baguari'),
  ((SELECT id FROM beaches WHERE slug = 'praia-grande'), 'Bombeiro', 'Posto de Bombeiros'),
  ((SELECT id FROM beaches WHERE slug = 'perequê-açu'), 'Quiosque Girassol', 'Quiosque Girassol');

-- Insert Cameras (8 MVP cameras)
INSERT INTO cameras (location_id, name, description, rtsp_url, status, is_public)
VALUES
  (
    (SELECT id FROM locations WHERE name = 'Canto Direito' LIMIT 1),
    'Itamambuca - Canto Direito',
    'Camera 1080p ao vivo - Canto Direito',
    'rtsp://example.com/itamambuca-direito',
    'offline',
    TRUE
  ),
  (
    (SELECT id FROM locations WHERE name = 'Rua 1' LIMIT 1),
    'Itamambuca - Rua 1',
    'Camera 720p ao vivo - Rua 1',
    'rtsp://example.com/itamambuca-rua1',
    'offline',
    TRUE
  ),
  (
    (SELECT id FROM locations WHERE name = 'Baguari' LIMIT 1),
    'Praia Grande - Baguari',
    'Camera 1080p ao vivo - Baguari',
    'rtsp://example.com/praia-grande-baguari',
    'offline',
    TRUE
  ),
  (
    (SELECT id FROM locations WHERE name = 'Bombeiro' LIMIT 1),
    'Praia Grande - Bombeiro',
    'Camera 720p ao vivo - Bombeiro',
    'rtsp://example.com/praia-grande-bombeiro',
    'offline',
    TRUE
  ),
  (
    (SELECT id FROM locations WHERE name = 'Quiosque Girassol' LIMIT 1),
    'Perequê-Açu - Quiosque Girassol',
    'Camera 720p ao vivo - Quiosque Girassol',
    'rtsp://example.com/perequê-açu-girassol',
    'offline',
    TRUE
  ),
  (
    (SELECT id FROM beaches WHERE slug = 'vermelha-centro' LIMIT 1),
    'Vermelha do Centro',
    'Camera 720p ao vivo',
    'rtsp://example.com/vermelha-centro',
    'offline',
    TRUE
  ),
  (
    (SELECT id FROM beaches WHERE slug = 'a-preferida-norte' LIMIT 1),
    'A Preferida do Lado Norte',
    'Camera 720p ao vivo',
    'rtsp://example.com/a-preferida-norte',
    'offline',
    TRUE
  ),
  (
    (SELECT id FROM beaches WHERE slug = 'toninhas' LIMIT 1),
    'Toninhas',
    'Camera 720p ao vivo',
    'rtsp://example.com/toninhas',
    'offline',
    TRUE
  );
