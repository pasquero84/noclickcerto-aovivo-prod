# INSTALAÇÃO — NoClickCerto AO VIVO

## Pré-requisitos

- Node.js >= 20.0.0
- npm ou yarn
- Git
- Conta Supabase (PostgreSQL)
- Credenciais Google OAuth (opcional para MVP)
- Chave Mercado Pago (opcional para MVP)

## Passo 1: Clonar o repositório

```bash
git clone <seu-repositorio> noclickcerto-aovivo
cd noclickcerto-aovivo
```

## Passo 2: Instalar dependências

```bash
npm install
```

Tempo estimado: 2-5 minutos

Dependências instaladas:
- Next.js 14 com App Router
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- Drizzle ORM
- NextAuth
- Supabase
- Zod (validações)
- Jest (testes)

## Passo 3: Configurar variáveis de ambiente

```bash
cp .env.example .env.local
```

Abrir `.env.local` e preencher:

### Supabase (Obrigatório)

1. Ir para https://supabase.com
2. Criar novo projeto PostgreSQL
3. Na dashboard, copiar:
   - URL do projeto → `NEXT_PUBLIC_SUPABASE_URL`
   - Anon key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Service Role key → `SUPABASE_SERVICE_ROLE_KEY`

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxxx
```

### NextAuth (Obrigatório)

Gerar secret e URL:

```bash
# Linux/Mac
openssl rand -base64 32

# Windows (PowerShell)
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

```env
NEXTAUTH_SECRET=seu-secret-gerado-acima
NEXTAUTH_URL=http://localhost:3000
```

### Database Connection (Obrigatório)

Na dashboard Supabase, copiar connection string PostgreSQL:

```env
DATABASE_URL=postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres
```

### Google OAuth (Opcional para MVP)

1. Ir para https://console.cloud.google.com
2. Criar novo projeto
3. Enable Google+ API
4. Criar OAuth 2.0 credentials (Web application)
5. Adicionar localhost:3000 nas authorized origins
6. Copiar Client ID e Secret

```env
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx
```

### Mercado Pago (Opcional para MVP)

1. Ir para https://www.mercadopago.com.br/developers
2. Copiar credenciais

```env
NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY=APP_USR-xxxxx
MERCADO_PAGO_ACCESS_TOKEN=APP_USR-xxxxx
```

### App Config

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=NoClickCerto Ao Vivo
NODE_ENV=development
```

## Passo 4: Inicializar banco de dados

```bash
# Gerar migrations
npm run db:generate

# Aplicar migrations
npm run db:push
```

Se ocorrer erro de conexão:
1. Verificar `DATABASE_URL` em `.env.local`
2. Verificar se Supabase está online
3. Verificar credenciais

## Passo 5: Iniciar servidor de desenvolvimento

```bash
npm run dev
```

Output esperado:
```
> next dev

  ▲ Next.js 14.2.0
  - Local:        http://localhost:3000
  - Environment:  development

✓ Ready in 2.5s
```

Acessar em `http://localhost:3000`

## Passo 6: Verificar setup

1. Abrir http://localhost:3000
2. Deve ver página "NoClickCerto Ao Vivo - Foundation setup - Sprint 1"
3. Não deve ter erros no console

Se houver erro 500:
```bash
# Limpar cache
rm -rf .next

# Reiniciar
npm run dev
```

## Scripts Úteis

```bash
# Lint
npm run lint

# Lint com auto-fix
npm run lint:fix

# Formatar código
npm run format

# Verificar tipos TypeScript
npm run type-check

# Abrir Drizzle Studio (visualizar DB)
npm run db:studio

# Testes
npm run test
npm run test:watch
npm run test:coverage

# Build para produção
npm run build
npm start

# Limpar build
npm run clean
```

## Troubleshooting

### Erro: "Cannot find module '@/lib/...'"

Certifique-se que `tsconfig.json` tem paths corretos:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/lib/*": ["./src/lib/*"]
    }
  }
}
```

### Erro: "DATABASE_URL is required"

1. Verificar `.env.local` tem `DATABASE_URL`
2. Verificar formato PostgreSQL correto
3. Verificar credenciais Supabase

### Erro: "NEXTAUTH_SECRET not provided"

Você está em produção. Adicionar em variáveis de produção:
```bash
NEXTAUTH_SECRET=seu-secret-longo-aqui
```

### Erro: "EADDRINUSE: address already in use"

Porta 3000 está em uso. Matar processo ou usar porta diferente:
```bash
# Verificar processo
lsof -i :3000

# Kill
kill -9 <PID>

# Ou usar porta diferente
npm run dev -- -p 3001
```

### Componentes não carregam

Limpar node_modules e reinstalar:
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Próximos Passos

Sprint 2: Banco de Dados
- Criar seeds com praias, localizações e câmeras
- Criar usuários admin
- Testar schema completo

Sprint 3: Autenticação
- Implementar login/cadastro
- Integração Google OAuth
- Recuperação de senha

Sprint 4: Frontend Público
- Home page
- Listagem de câmeras
- Página premium
- Layout responsive

## Suporte

Documentação:
- [README.md](./README.md) — Visão geral do projeto
- [SPRINT_1.md](./SPRINT_1.md) — Detalhes da Sprint 1
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team)
