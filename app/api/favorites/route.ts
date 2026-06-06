import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { listFavoriteCameraIds, toggleFavorite } from '@/lib/favorites'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email
  if (!email) return NextResponse.json({ favorites: [] })
  const favorites = await listFavoriteCameraIds(email)
  return NextResponse.json({ favorites })
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email
  if (!email) {
    return NextResponse.json({ error: 'Faça login para favoritar' }, { status: 401 })
  }
  let body: { cameraId?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Requisição inválida' }, { status: 400 })
  }
  if (!body.cameraId) {
    return NextResponse.json({ error: 'cameraId faltando' }, { status: 400 })
  }
  const result = await toggleFavorite(email, body.cameraId)
  if (!result) return NextResponse.json({ error: 'Falha' }, { status: 502 })
  return NextResponse.json(result)
}
