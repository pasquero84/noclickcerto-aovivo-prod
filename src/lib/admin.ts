// Helpers de administração via REST API do Supabase (funciona em produção).

const BASE = process.env.NEXT_PUBLIC_SUPABASE_URL
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const PREMIUM_PLAN_ID = 'e4d11c39-cca8-40db-b103-565832bfc532'

// E-mails com acesso ao painel admin (override por env ADMIN_EMAILS)
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ||
  'pasquero84@gmail.com,admin@noclickcerto.com.br')
  .split(',')
  .map(e => e.trim().toLowerCase())
  .filter(Boolean)

export function isAdmin(email?: string | null): boolean {
  return !!email && ADMIN_EMAILS.includes(email.toLowerCase())
}

function headers(extra?: Record<string, string>) {
  return { apikey: KEY || '', Authorization: `Bearer ${KEY || ''}`, ...extra }
}

export type AdminUser = {
  id: string
  name: string | null
  email: string
  image: string | null
  status: string | null
  created_at: string
  pro: boolean
  plan_until: string | null
}

export async function listUsers(): Promise<AdminUser[]> {
  if (!BASE || !KEY) return []
  const [uRes, sRes] = await Promise.all([
    fetch(`${BASE}/rest/v1/users?select=id,name,email,image,status,created_at&order=created_at.desc`, {
      headers: headers(),
      cache: 'no-store',
    }),
    fetch(`${BASE}/rest/v1/subscriptions?select=user_id,status,current_period_end&status=eq.active`, {
      headers: headers(),
      cache: 'no-store',
    }),
  ])
  const users = (await uRes.json()) as Omit<AdminUser, 'pro' | 'plan_until'>[]
  const subs = (await sRes.json()) as { user_id: string; current_period_end: string }[]
  const now = Date.now()
  const proMap = new Map<string, string>()
  for (const s of subs) {
    if (new Date(s.current_period_end).getTime() > now) proMap.set(s.user_id, s.current_period_end)
  }
  return (Array.isArray(users) ? users : []).map(u => ({
    ...u,
    pro: proMap.has(u.id),
    plan_until: proMap.get(u.id) ?? null,
  }))
}

// Libera PRO/cortesia: cria assinatura ativa até 2099 (vitalícia) ou data informada.
export async function grantPro(userId: string, until?: string): Promise<boolean> {
  if (!BASE || !KEY) return false
  await revokePro(userId) // encerra ativas anteriores para não duplicar
  const end = until || '2099-12-31T00:00:00Z'
  const res = await fetch(`${BASE}/rest/v1/subscriptions`, {
    method: 'POST',
    headers: headers({ 'Content-Type': 'application/json', Prefer: 'return=minimal' }),
    body: JSON.stringify({
      user_id: userId,
      plan_id: PREMIUM_PLAN_ID,
      status: 'active',
      current_period_end: end,
    }),
  })
  return res.ok
}

// Remove PRO: cancela as assinaturas ativas do usuário.
export async function revokePro(userId: string): Promise<boolean> {
  if (!BASE || !KEY) return false
  const res = await fetch(
    `${BASE}/rest/v1/subscriptions?user_id=eq.${userId}&status=eq.active`,
    {
      method: 'PATCH',
      headers: headers({ 'Content-Type': 'application/json', Prefer: 'return=minimal' }),
      body: JSON.stringify({ status: 'cancelled', cancelled_at: new Date().toISOString() }),
    },
  )
  return res.ok
}
