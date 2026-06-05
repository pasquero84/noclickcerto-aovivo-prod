import { supabase } from '@/lib/supabase'

import Link from 'next/link'
import Navbar from '@/components/Navbar'

export const dynamic = 'force-dynamic'
export const revalidate = 60

type BeachRow = { id: string; name: string; description: string | null }
type LocationRow = { id: string; beach_id: string }
type CameraRow = {
  id: string
  location_id: string
  name: string
  status: string
  description: string | null
}

async function getBeachesWithCameras() {
  try {
    const [beachesRes, locationsRes, camerasRes] = await Promise.all([
      supabase.from('beaches').select('id,name,description').order('name'),
      supabase.from('locations').select('id,beach_id'),
      supabase.from('cameras').select('id,location_id,name,status,description'),
    ])

    if (beachesRes.error) throw beachesRes.error
    if (locationsRes.error) throw locationsRes.error
    if (camerasRes.error) throw camerasRes.error

    const allBeaches = (beachesRes.data ?? []) as BeachRow[]
    const allLocations = (locationsRes.data ?? []) as LocationRow[]
    const allCameras = (camerasRes.data ?? []) as CameraRow[]

    return allBeaches.map(beach => {
      const beachLocationIds = allLocations
        .filter(l => l.beach_id === beach.id)
        .map(l => l.id)
      const beachCameras = allCameras.filter(c =>
        beachLocationIds.includes(c.location_id)
      )
      return { ...beach, cameras: beachCameras }
    })
  } catch (error) {
    console.error('❌ Error fetching beaches data:', error)
    return []
  }
}

export default async function PraiasPage() {
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

        {/* Grid de praias */}
        <div className="grid gap-6">
          {beachesData.map(beach => (
            <div key={beach.id} className="bg-[#0D1526] rounded-2xl border border-white/5 overflow-hidden">
              {/* Header da praia */}
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-lg">{beach.name}</h2>
                  {beach.description && (
                    <p className="text-sm text-gray-500">{beach.description}</p>
                  )}
                </div>
                <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-full">
                  {beach.cameras.length} câmera{beach.cameras.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Câmeras da praia */}
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {beach.cameras.length === 0 ? (
                  <div className="col-span-full text-center py-8 text-gray-600">
                    <p className="text-3xl mb-2">🎥</p>
                    <p className="text-sm">Câmera em breve</p>
                  </div>
                ) : (
                  beach.cameras.map(camera => (
                    <CameraCard key={camera.id} camera={camera} />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

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

function CameraCard({ camera }: { camera: { id: string; name: string; status: string; description: string | null } }) {
  const isOnline = camera.status === 'online'

  // Mapear câmeras de Ubatuba para imagens WavesNow (provisório)
  const getWavesNowImage = (cameraName: string): string | null => {
    const nameUpper = cameraName.toUpperCase()

    if (nameUpper.includes('ITAMAMBUCA')) {
      return 'https://wavesnow.sfo3.cdn.digitaloceanspaces.com/cameras/itamambuca1.png'
    }
    if (nameUpper.includes('VERMELHA') && nameUpper.includes('CENTRO')) {
      return 'https://wavesnow.sfo3.cdn.digitaloceanspaces.com/cameras/vermelha-centro0.png'
    }
    if (nameUpper.includes('PEREQUÊ') || nameUpper.includes('PEREQUE')) {
      return 'https://wavesnow.sfo3.cdn.digitaloceanspaces.com/cameras/pereque-acu.png'
    }
    if (nameUpper.includes('PRAIA GRANDE')) {
      return 'https://wavesnow.sfo3.cdn.digitaloceanspaces.com/cameras/praia-grande2.png'
    }
    // A Preferida e Toninhas não têm imagens no WavesNow ainda
    return null
  }

  const cameraImage = getWavesNowImage(camera.name)

  return (
    <div className="bg-[#060A14] rounded-xl border border-white/5 overflow-hidden group hover:border-[#1B6EF3]/30 transition-all">
      {/* Thumbnail */}
      <div className="aspect-video relative flex items-center justify-center bg-gradient-to-br from-[#0D1526] to-[#060A14] overflow-hidden">
        {cameraImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cameraImage}
              alt={camera.name}
              className="w-full h-full object-cover"
            />
            {/* Overlay gradient para melhor contraste com badge */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            {/* Crédito WavesNow */}
            <div className="absolute bottom-1 right-1 text-[9px] text-white/60 bg-black/50 px-1.5 py-0.5 rounded">
              WavesNow
            </div>
          </>
        ) : (
          <>
            {isOnline ? (
              <div className="text-center">
                <div className="text-4xl mb-2">🌊</div>
                <p className="text-xs text-gray-500">Ao vivo</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-4xl mb-2 opacity-30">📷</div>
                <p className="text-xs text-gray-600">Câmera offline</p>
                <p className="text-[10px] text-gray-700 mt-1">Em instalação</p>
              </div>
            )}
          </>
        )}

        {/* Badge status */}
        <div className={`absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-semibold ${
          isOnline
            ? 'bg-green-500/20 text-green-400'
            : 'bg-yellow-500/20 text-yellow-500'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-400 animate-pulse' : 'bg-yellow-500'}`} />
          {isOnline ? 'AO VIVO' : 'EM BREVE'}
        </div>
      </div>

      <div className="p-3">
        <p className="text-sm font-medium text-white truncate">{camera.name}</p>
        {camera.description && (
          <p className="text-xs text-gray-600 mt-0.5 truncate">{camera.description}</p>
        )}
      </div>

      {/* Patrocinadores da câmera */}
      <div className="border-t border-white/5 px-3 py-2">
        <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-2">Apoiadores</p>
        <div className="grid grid-cols-3 gap-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Link
              key={i}
              href="/patrocinadores"
              className="aspect-square bg-[#0D1526]/50 border border-white/5 hover:border-[#1B6EF3]/20 rounded-lg flex items-center justify-center transition-all group/sponsor"
            >
              <span className="text-[9px] text-gray-700 group-hover/sponsor:text-[#1B6EF3] text-center px-0.5 leading-tight">
                ANUNCIE
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
