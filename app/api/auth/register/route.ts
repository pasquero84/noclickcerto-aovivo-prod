import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { registerSchema } from '@/lib/validations'
import { findUserByEmail, createUser } from '@/lib/users-rest'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = registerSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })
    }

    const { name, email, password } = parsed.data

    const existing = await findUserByEmail(email)
    if (existing) {
      return NextResponse.json({ error: 'Este email já está cadastrado' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 12)
    const ok = await createUser({ name, email, passwordHash })

    if (!ok) {
      return NextResponse.json({ error: 'Não foi possível concluir o cadastro.' }, { status: 502 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('Register error:', err)
    return NextResponse.json({ error: 'Erro interno. Tente novamente.' }, { status: 500 })
  }
}
