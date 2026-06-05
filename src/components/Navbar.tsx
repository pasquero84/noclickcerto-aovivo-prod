import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import NavbarClient from './NavbarClient'
import NavbarMobileMenu from './NavbarMobileMenu'

const links = [
  { href: '/praias', label: 'AO VIVO' },
  { href: '/premium', label: 'PREMIUM' },
]

export default async function Navbar() {
  const session = await getServerSession(authOptions)

  return (
    <nav className="relative bg-[#060d1e] border-b border-white/8 h-14 flex items-center px-4 md:px-6 sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 shrink-0 mr-6">
        <svg className="w-6 h-6 text-[#1B6EF3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" d="M2 14c2-4 5-6 10-6s8 2 10 6"/>
          <path strokeLinecap="round" d="M2 18c2-4 5-6 10-6s8 2 10 6" opacity="0.5"/>
          <circle cx="12" cy="10" r="2" fill="currentColor" stroke="none"/>
        </svg>
        <span className="font-black text-white text-sm tracking-widest hidden sm:block">NOCLICKCERTO</span>
        <span className="bg-[#1B6EF3] text-white text-[9px] font-black px-1.5 py-0.5 rounded tracking-widest">AO VIVO</span>
      </Link>

      {/* Links — desktop */}
      <div className="hidden md:flex items-center gap-0 flex-1">
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            className="text-[11px] font-bold text-gray-400 hover:text-white px-3 py-1 tracking-widest transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </div>

      {/* Auth — desktop */}
      <div className="hidden md:flex items-center">
        <NavbarClient session={session} />
      </div>

      {/* Mobile: ASSINAR + hamburger */}
      <div className="flex items-center gap-2 ml-auto md:hidden">
        <Link
          href="/auth/cadastro"
          className="text-[10px] bg-[#1B6EF3] text-white font-black px-3 py-1.5 rounded tracking-wider"
        >
          ASSINAR
        </Link>
        <NavbarMobileMenu session={session} />
      </div>
    </nav>
  )
}
