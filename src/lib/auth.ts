import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'
import { findUserByEmail } from '@/lib/users-rest'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        try {
          const user = await findUserByEmail(credentials.email)
          if (!user || !user.password_hash) return null
          if (user.status !== 'active') return null
          const valid = await bcrypt.compare(credentials.password, user.password_hash)
          if (!valid) return null
          return { id: user.id, email: user.email, name: user.name, image: user.image }
        } catch {
          return null
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/cadastro',
  },
  callbacks: {
    async signIn({ user, account }) {
      // Salva/atualiza o usuário do Google via REST API do Supabase (IPv4,
      // funciona em produção). Best-effort: NUNCA bloqueia o login se falhar.
      if (account?.provider === 'google' && user.email) {
        try {
          const base = process.env.NEXT_PUBLIC_SUPABASE_URL
          const key = process.env.SUPABASE_SERVICE_ROLE_KEY
          if (base && key) {
            const headers = { apikey: key, Authorization: `Bearer ${key}` }
            const check = await fetch(
              `${base}/rest/v1/users?email=eq.${encodeURIComponent(user.email)}&select=id`,
              { headers },
            )
            const rows = await check.json()
            if (Array.isArray(rows) && rows.length === 0) {
              await fetch(`${base}/rest/v1/users`, {
                method: 'POST',
                headers: {
                  ...headers,
                  'Content-Type': 'application/json',
                  Prefer: 'return=minimal',
                },
                body: JSON.stringify({
                  email: user.email,
                  name: user.name || 'Usuário',
                  image: user.image || null,
                  status: 'active',
                  email_verified_at: new Date().toISOString(),
                }),
              })
            }
          }
        } catch {
          // não bloqueia o login se o salvamento falhar
        }
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string
      return session
    },
  },
}
