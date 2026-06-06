import { NextResponse } from 'next/server'
import { getConditions } from '@/lib/conditions'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const lat = parseFloat(searchParams.get('lat') || '')
  const lng = parseFloat(searchParams.get('lng') || '')
  const cond = await getConditions(
    Number.isFinite(lat) ? lat : undefined,
    Number.isFinite(lng) ? lng : undefined,
  )
  if (!cond) return NextResponse.json({ error: 'indisponível' }, { status: 502 })
  return NextResponse.json(cond)
}
