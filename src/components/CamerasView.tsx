import Link from 'next/link'
import Navbar from '@/components/Navbar'
import CameraGrid from '@/components/CameraGrid'
import { getBeachesWithCameras } from '@/lib/cameras'

// Página única das câmeras das praias (usada em / e /praias)
export default async function CamerasView() {
  const beachesData = await getBeachesWithCameras()

  return (
    <div className="min-h-screen bg-[#060A14] text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Câmeras ao Vivo</h1>
          <p className="text-gray-400">
            {beachesData.reduce((acc, b) => acc + b.cameras.length, 0)} câmeras em{' '}
            {beachesData.length} praias de Ubatuba
          </p>
        </div>

        {/* Banner Free */}
        <div className="bg-[#1B6EF3]/10 border border-[#1B6EF3]/30 rounded-xl p-4 mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-[#1B6EF3]">Você está no plano Gratuito</p>
            <p className="text-xs text-gray-400 mt-0.5">Câmeras em 720p · Atualização a cada 30s · Sem replay</p>
          </div>
          <Link
            href="/premium"
            className="text-xs bg-[#1B6EF3] hover:bg-blue-600 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
          >
            Ver Premium
          </Link>
        </div>

        {/* Grid de praias + modal de zoom */}
        <CameraGrid beaches={beachesData} />

        {/* Redes Sociais */}
        <div className="mt-12 bg-[#0D1526] border border-white/5 rounded-2xl p-8">
          <p className="text-xs text-gray-600 uppercase tracking-widest mb-6">Siga-nos</p>
          <div className="flex gap-4 items-center">
            <a
              href="https://youtube.com/@noclickcerto"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#1B6EF3]/10 hover:bg-[#1B6EF3]/20 border border-[#1B6EF3]/30 rounded-lg transition-all group"
            >
              <span className="text-lg">▶️</span>
              <span className="text-sm font-semibold text-[#1B6EF3] group-hover:text-white">YouTube</span>
            </a>
            <a
              href="https://instagram.com/noclickcerto"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#1B6EF3]/10 hover:bg-[#1B6EF3]/20 border border-[#1B6EF3]/30 rounded-lg transition-all group"
            >
              <span className="text-lg">📷</span>
              <span className="text-sm font-semibold text-[#1B6EF3] group-hover:text-white">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
