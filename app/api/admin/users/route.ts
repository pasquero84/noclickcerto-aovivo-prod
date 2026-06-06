import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { isAdmin, listUsers, grantPro, revokePro } from '@/lib/admin'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!isAdmin(session?.user?.email)) {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
  }
  const users = await listUsers()
  return NextResponse.json({ users })
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!isAdmin(session?.user?.email)) {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
  }
  let body: { userId?: string; action?: string; until?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Requisição inválida' }, { status: 400 })
  }
  if (!body.userId || !body.action) {
    return NextResponse.json({ error: 'Dados faltando' }, { status: 400 })
  }
  const ok =
    body.action === 'grant'
      ? await grantPro(body.userId, body.until)
      : body.action === 'revoke'
        ? await revokePro(body.userId)
        : false
  if (!ok) return NextResponse.json({ error: 'Falha na operação' }, { status: 502 })
  return NextResponse.json({ success: true })
}
