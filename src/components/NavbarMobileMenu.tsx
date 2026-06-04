'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import type { Session } from 'next-auth'

const links = [
  { href: '/', label: 'AO VIVO' },
  { href: '/boletim', label: 'BOLETIM' },
  { href: '/praias', label: 'PRAIAS' },
  { href: '/videos', label: 'VÍDEOS' },
  { href: '/premium', label: 'PREMIUM' },
  { href: '/sobre', label: 'SOBRE' },
]

export default function NavbarMobileMenu({ session }: { session: Session | null }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Hamburguer */}
      <button
        onClick={() => setOpen(v => !v)}
        className="md:hidden flex flex-col gap-1.5 p-2"
        aria-label="Menu"
      >
        <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Drawer mobile */}
      {open && (
        <div className="absolute top-14 left-0 right-0 bg-[#070C18] border-b border-white/10 z-50 md:hidden">
          <nav className="flex flex-col py-2">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-6 py-3 text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 tracking-wider"
              >
                {l.label}
              </Link>
            ))}
            <div className="border-t border-white/10 mt-2 pt-2 px-6 pb-3 flex flex-col gap-2">
              {session ? (
                <>
                  <Link href="/minha-conta" onClick={() => setOpen(false)} className="text-sm font-semibold text-gray-300 py-2">
                    MINHA CONTA
                  </Link>
                  <button
                    onClick={() => { setOpen(false); signOut({ callbackUrl: '/' }) }}
                    className="text-sm font-semibold text-gray-500 py-2 text-left"
                  >
                    SAIR
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setOpen(false)}
                    className="text-center border border-white/20 text-gray-300 font-bold py-2.5 rounded-lg text-sm tracking-wide"
                  >
                    ENTRAR
                  </Link>
                  <Link
                    href="/auth/cadastro"
                    onClick={() => setOpen(false)}
                    className="text-center bg-[#1B6EF3] text-white font-bold py-2.5 rounded-lg text-sm tracking-wide"
                  >
                    ASSINAR AGORA
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
