# NoClickCerto Ao Vivo

Plataforma SaaS de câmeras ao vivo de Ubatuba.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase (PostgreSQL)
- Drizzle ORM
- NextAuth

## Setup

### 1. Clonar repositório
```bash
git clone <repo> noclickcerto-aovivo
cd noclickcerto-aovivo
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente
```bash
cp .env.example .env.local
```

Preencher:
- `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXTAUTH_SECRET` e `NEXTAUTH_URL`
- `GOOGLE_CLIENT_ID` e `GOOGLE_CLIENT_SECRET`
- `DATABASE_URL`
- `MERCADO_PAGO_ACCESS_TOKEN`

### 4. Inicializar banco de dados
```bash
npm run db:push
```

### 5. Iniciar desenvolvimento
```bash
npm run dev
```

Acessar em `http://localhost:3000`

## Scripts

- `npm run dev` — Iniciar dev server
- `npm run build` — Build para produção
- `npm run start` — Iniciar produção
- `npm run lint` — Verificar linting
- `npm run lint:fix` — Corrigir linting
- `npm run format` — Formatar código
- `npm run type-check` — Verificar tipos TypeScript
- `npm run db:generate` — Gerar migrations
- `npm run db:push` — Aplicar migrations
- `npm run db:studio` — Abrir Drizzle Studio
- `npm run test` — Rodar testes
- `npm run test:watch` — Rodar testes em watch mode

## Estrutura

```
app/                    # Next.js App Router
  api/                  # API routes
  admin/                # Admin dashboard
  auth/                 # Auth pages
  layouts/              # Layout components
  (cameras)/            # Cameras group
src/
  components/           # React components
  hooks/                # Custom hooks
  lib/                  # Utilities and database
  middleware/           # NextAuth middleware
  types/                # TypeScript types
  utils/                # Helper functions
  constants/            # App constants
prisma/
  migrations/           # Database migrations
public/                 # Static files
```

## Documentação

- [Arquitetura](./docs/ARCHITECTURE.md)
- [API](./docs/API.md)
- [Banco de Dados](./docs/DATABASE.md)

## Roadmap

Sprint 1: Foundation (✓)
Sprint 2: Database Schema
Sprint 3: Authentication
Sprint 4: Public Frontend
Sprint 5: User Dashboard
Sprint 6: Admin Panel
Sprint 7: Streaming
Sprint 8: First Live Camera

## License

Proprietary
