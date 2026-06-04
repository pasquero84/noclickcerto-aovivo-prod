# Setup do Banco de Dados — Sprint 2

## Pré-requisitos

1. Projeto Node.js rodando
2. Conta Supabase criada
3. Projeto PostgreSQL criado no Supabase

## Passo 1: Configurar DATABASE_URL

### No Supabase:
1. Ir para **Settings** → **Database**
2. Copiar a **Connection string** (URI)
3. Escolher **Connection pooling** se disponível

### No projeto:
Adicionar em `.env.local`:

```bash
DATABASE_URL=postgresql://[user]:[password]@[host]:[port]/[database]
DIRECT_URL=postgresql://[user]:[password]@[host]:[port]/[database]
```

**Nota:** `DIRECT_URL` é necessário para Supabase com pooling.

## Passo 2: Executar Migrations

### Opção A - Supabase Dashboard (Recomendado para MVP)

1. Abrir **SQL Editor** no Supabase
2. Copiar conteúdo de `prisma/migrations/001_init_schema.sql`
3. Colar e executar
4. Repetir para `002_seed_initial_data.sql`
5. Repetir para `003_seed_admin_user.sql`

### Opção B - Drizzle-kit CLI

```bash
# Após configurar DATABASE_URL
npx drizzle-kit push
```

### Opção C - psql CLI

```bash
psql postgresql://[user]:[password]@[host]:[port]/[database] < prisma/migrations/001_init_schema.sql
psql postgresql://[user]:[password]@[host]:[port]/[database] < prisma/migrations/002_seed_initial_data.sql
psql postgresql://[user]:[password]@[host]:[port]/[database] < prisma/migrations/003_seed_admin_user.sql
```

## Validação

### 1. Verificar Tabelas

```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

Resultado esperado: **21 tabelas**

### 2. Verificar ENUMs

```sql
SELECT typname FROM pg_type 
WHERE typtype = 'e' AND typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public');
```

Resultado esperado: **5 ENUMs**

### 3. Verificar Seeds

```sql
SELECT COUNT(*) FROM plans;     -- Resultado: 2
SELECT COUNT(*) FROM beaches;   -- Resultado: 7
SELECT COUNT(*) FROM locations; -- Resultado: 5
SELECT COUNT(*) FROM cameras;   -- Resultado: 8
SELECT COUNT(*) FROM users;     -- Resultado: 1 (admin)
```

### 4. Verificar Admin

```sql
SELECT u.email, a.role 
FROM users u 
JOIN admin_users a ON u.id = a.user_id;
```

Resultado esperado: `admin@noclickcerto.com.br | admin`

## Arquivos de Migration

```
prisma/migrations/
├── 001_init_schema.sql          (21 tabelas + 5 ENUMs)
├── 002_seed_initial_data.sql    (Planos, praias, locais, câmeras)
└── 003_seed_admin_user.sql      (Admin user)
```

## Próximos Passos (Sprint 3)

Após confirmar que as migrations foram executadas:

1. Autenticação (login/cadastro)
2. API endpoints para database
3. Páginas com dados reais

## Troubleshooting

### Erro: "ROLE does not exist"

Supabase gerencia roles automaticamente. Usar a role padrão do projeto.

### Erro: "relation does not exist"

Migration anterior não foi executada. Executar na ordem:
1. 001_init_schema.sql
2. 002_seed_initial_data.sql
3. 003_seed_admin_user.sql

### Erro: "permission denied"

Verificar se o usuário tem permissão para criar tabelas. Em Supabase, usar a conta de admin.

## Verificação Final

Execute este script para validar tudo:

```sql
-- Verificar schema
SELECT 
  'Tabelas' as tipo,
  COUNT(*) as quantidade
FROM information_schema.tables 
WHERE table_schema = 'public'
UNION ALL
SELECT 
  'ENUMs' as tipo,
  COUNT(*) as quantidade
FROM pg_type 
WHERE typtype = 'e' AND typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
UNION ALL
SELECT 
  'Usuários' as tipo,
  COUNT(*) as quantidade
FROM users
UNION ALL
SELECT 
  'Planos' as tipo,
  COUNT(*) as quantidade
FROM plans
UNION ALL
SELECT 
  'Praias' as tipo,
  COUNT(*) as quantidade
FROM beaches
UNION ALL
SELECT 
  'Câmeras' as tipo,
  COUNT(*) as quantidade
FROM cameras;
```

Resultado esperado:
```
Tabelas  | 21
ENUMs    | 5
Usuários | 1
Planos   | 2
Praias   | 7
Câmeras  | 8
```
