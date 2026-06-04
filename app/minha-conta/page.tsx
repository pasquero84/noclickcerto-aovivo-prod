import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import SignOutButton from './SignOutButton'

export default async function MinhaContaPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/auth/login')

  const initials = session.user?.name
    ? session.user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U'

  return (
    <div className="min-h-screen bg-[#060A14] text-white">
      {/* Nav */}
      <nav className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-white">
          NoClickCerto <span className="text-[#1B6EF3]">AO VIVO</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/praias" className="text-sm text-gray-400 hover:text-white transition-colors">
            Câmeras
          </Link>
          <SignOutButton />
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Avatar */}
        <div className="flex items-center gap-4 mb-10">
          {session.user?.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={session.user.image}
              alt={session.user.name || 'Avatar'}
              className="w-16 h-16 rounded-full"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-[#1B6EF3] flex items-center justify-center text-xl font-bold">
              {initials}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold">{session.user?.name}</h1>
            <p className="text-gray-400">{session.user?.email}</p>
          </div>
        </div>

        {/* Plano atual */}
        <div className="bg-[#0D1526] rounded-2xl p-6 border border-white/5 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Plano atual</p>
              <p className="text-xl font-bold">Gratuito</p>
              <p className="text-sm text-gray-500 mt-1">Câmeras em 720p · Atualização a cada 30s</p>
            </div>
            <Link
              href="/premium"
              className="bg-[#1B6EF3] hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Upgrade Premium
            </Link>
          </div>
        </div>

        {/* Links rápidos */}
        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/praias"
            className="bg-[#0D1526] hover:bg-[#1B6EF3]/10 border border-white/5 hover:border-[#1B6EF3]/30 rounded-xl p-5 transition-all"
          >
            <div className="text-2xl mb-2">🎥</div>
            <p className="font-semibold">Ver câmeras</p>
            <p className="text-sm text-gray-500 mt-1">8 praias ao vivo</p>
          </Link>
          <Link
            href="/premium"
            className="bg-[#0D1526] hover:bg-[#1B6EF3]/10 border border-white/5 hover:border-[#1B6EF3]/30 rounded-xl p-5 transition-all"
          >
            <div className="text-2xl mb-2">⚡</div>
            <p className="font-semibold">Premium</p>
            <p className="text-sm text-gray-500 mt-1">R$ 5,99/mês</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
