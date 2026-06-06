import { getServerSession } from 'next-auth'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import AdminPanel from '@/components/AdminPanel'
import { authOptions } from '@/lib/auth'
import { isAdmin, listUsers } from '@/lib/admin'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!isAdmin(session?.user?.email)) {
    return (
      <div className="min-h-screen bg-[#060A14] text-white">
        <Navbar />
        <div className="max-w-md mx-auto px-4 py-24 text-center">
          <p className="text-5xl mb-4">🔒</p>
          <h1 className="text-2xl font-bold mb-2">Acesso restrito</h1>
          <p className="text-gray-400 mb-6">Esta área é só para administradores.</p>
          <Link href="/auth/login" className="text-[#1B6EF3] hover:underline">
            Entrar como admin
          </Link>
        </div>
      </div>
    )
  }

  const users = await listUsers()

  return (
    <div className="min-h-screen bg-[#060A14] text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Painel de Controle</h1>
          <p className="text-gray-400 text-sm">
            Gerencie assinantes, veja quem está ativo e libere contas de cortesia.
          </p>
        </div>
        <AdminPanel initialUsers={users} />
      </div>
    </div>
  )
}
