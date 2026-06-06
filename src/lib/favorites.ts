// Favoritos de câmeras via REST API do Supabase.
import { findUserByEmail } from './users-rest'

const BASE = process.env.NEXT_PUBLIC_SUPABASE_URL
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

function headers(extra?: Record<string, string>) {
  return { apikey: KEY || '', Authorization: `Bearer ${KEY || ''}`, ...extra }
}

export async function listFavoriteCameraIds(email?: string | null): Promise<string[]> {
  if (!BASE || !KEY || !email) return []
  const user = await findUserByEmail(email)
  if (!user) return []
  const res = await fetch(
    `${BASE}/rest/v1/favorite_cameras?user_id=eq.${user.id}&select=camera_id`,
    { headers: headers(), cache: 'no-store' },
  )
  if (!res.ok) return []
  const rows = (await res.json()) as { camera_id: string }[]
  return Array.isArray(rows) ? rows.map(r => r.camera_id) : []
}

export async function toggleFavorite(
  email: string,
  cameraId: string,
): Promise<{ favorited: boolean } | null> {
  if (!BASE || !KEY) return null
  const user = await findUserByEmail(email)
  if (!user) return null

  const check = await fetch(
    `${BASE}/rest/v1/favorite_cameras?user_id=eq.${user.id}&camera_id=eq.${cameraId}&select=id`,
    { headers: headers(), cache: 'no-store' },
  )
  const rows = (await check.json()) as { id: string }[]

  if (Array.isArray(rows) && rows.length > 0) {
    await fetch(
      `${BASE}/rest/v1/favorite_cameras?user_id=eq.${user.id}&camera_id=eq.${cameraId}`,
      { method: 'DELETE', headers: headers() },
    )
    return { favorited: false }
  }

  await fetch(`${BASE}/rest/v1/favorite_cameras`, {
    method: 'POST',
    headers: headers({ 'Content-Type': 'application/json', Prefer: 'return=minimal' }),
    body: JSON.stringify({ user_id: user.id, camera_id: cameraId }),
  })
  return { favorited: true }
}
