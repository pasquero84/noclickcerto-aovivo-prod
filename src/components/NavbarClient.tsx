'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import type { Session } from 'next-auth'

export default function NavbarClient({ session }: { session: Session | null }) {
  if (session) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/minha-conta" className="text-[11px] font-bold text-gray-400 hover:text-white tracking-widest transition-colors">
          {session.user?.name?.split(' ')[0]?.toUpperCase()}
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="text-[11px] font-bold border border-white/15 text-gray-400 hover:text-white hover:border-white/30 px-4 py-1.5 rounded tracking-widest transition-colors"
        >
          SAIR
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/auth/login"
        className="text-[11px] font-bold border border-white/15 text-gray-300 hover:text-white hover:border-white/40 px-4 py-1.5 rounded tracking-widest transition-colors"
      >
        ENTRAR
      </Link>
      <Link
        href="/checkout"
        className="text-[11px] font-black bg-[#1B6EF3] hover:bg-blue-500 text-white px-4 py-1.5 rounded tracking-widest transition-colors"
      >
        ASSINAR AGORA
      </Link>
    </div>
  )
}
