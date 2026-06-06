// Operações de usuário via REST API do Supabase (IPv4 — funciona em produção,
// ao contrário da conexão Postgres direta que é IPv6-only no Vercel).

const BASE = process.env.NEXT_PUBLIC_SUPABASE_URL
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

function headers(extra?: Record<string, string>) {
  return {
    apikey: KEY || '',
    Authorization: `Bearer ${KEY || ''}`,
    ...extra,
  }
}

export type DbUser = {
  id: string
  email: string
  name: string | null
  image: string | null
  status: string | null
  password_hash: string | null
}

export async function findUserByEmail(email: string): Promise<DbUser | null> {
  if (!BASE || !KEY) return null
  const res = await fetch(
    `${BASE}/rest/v1/users?email=eq.${encodeURIComponent(email)}&select=id,email,name,image,status,password_hash&limit=1`,
    { headers: headers(), cache: 'no-store' },
  )
  if (!res.ok) return null
  const rows = (await res.json()) as DbUser[]
  return Array.isArray(rows) && rows.length > 0 ? rows[0] : null
}

export async function createUser(data: {
  email: string
  name: string
  passwordHash?: string | null
  image?: string | null
}): Promise<boolean> {
  if (!BASE || !KEY) return false
  const res = await fetch(`${BASE}/rest/v1/users`, {
    method: 'POST',
    headers: headers({ 'Content-Type': 'application/json', Prefer: 'return=minimal' }),
    body: JSON.stringify({
      email: data.email,
      name: data.name,
      password_hash: data.passwordHash ?? null,
      image: data.image ?? null,
      status: 'active',
    }),
  })
  return res.ok
}
