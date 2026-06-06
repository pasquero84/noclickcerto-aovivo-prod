'use client'

import { useEffect, useState } from 'react'

type Camera = {
  id: string
  name: string
  status: string
  description: string | null
}

type Beach = {
  id: string
  name: string
  description: string | null
  cameras: Camera[]
}

// Imagem (thumbnail) de cada câmera — prints WavesNow de Ubatuba
function getCameraImage(cameraName: string): string {
  const n = cameraName.toUpperCase()
  if (n.includes('ITAMAMBUCA')) return '/cameras/itamambuca.png'
  if (n.includes('VERMELHA') && n.includes('CENTRO')) return '/cameras/vermelha-centro.png'
  if (n.includes('PEREQUÊ') || n.includes('PEREQUE')) return '/cameras/pereque-acu.png'
  if (n.includes('PRAIA GRANDE')) return '/cameras/praia-grande.png'
  if (n.includes('PREFERIDA') || n.includes('LADO NORTE')) return '/cameras/vermelha-norte.png'
  if (n.includes('TONINHAS')) return '/cameras/toninhas.png'
  return '/cameras/itamambuca.png'
}

// Stream ao vivo no YouTube — câmeras do WavesNow de Ubatuba (uso provisório
// autorizado, até as câmeras próprias serem instaladas).
// IDs confirmados: Itamambuca, Praia Grande, Toninhas.
// Os demais usam Praia Grande provisoriamente até receber o link ao vivo certo.
const PRAIA_GRANDE = '-_iOULj_d7Q'
function getYoutubeId(cameraName: string): string {
  const n = cameraName.toUpperCase()
  if (n.includes('ITAMAMBUCA')) return '4K4TEa1Q2H4'
  if (n.includes('TONINHAS')) return 'PUcA3w2Bl0c'
  if (n.includes('PRAIA GRANDE')) return PRAIA_GRANDE
  // Vermelha / Perequê / Preferida — provisório até receber o link ao vivo
  return PRAIA_GRANDE
}

export default function CameraGrid({ beaches }: { beaches: Beach[] }) {
  const [selected, setSelected] = useState<{ camera: Camera; youtubeId: string } | null>(null)

  // Fechar modal com Esc + travar scroll do body
  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [selected])

  return (
    <>
      {/* Grid de praias */}
      <div className="grid gap-6">
        {beaches.map(beach => (
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
                  <CameraCard
                    key={camera.id}
                    camera={camera}
                    image={getCameraImage(camera.name)}
                    onOpen={() => setSelected({ camera, youtubeId: getYoutubeId(camera.name) })}
                  />
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal — câmera ao vivo (YouTube) em tamanho grande */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-5xl" onClick={e => e.stopPropagation()}>
            {/* Fechar */}
            <button
              onClick={() => setSelected(null)}
              aria-label="Fechar"
              className="absolute -top-10 right-0 md:-top-2 md:-right-12 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white text-xl transition-colors"
            >
              ✕
            </button>

            <div className="bg-[#0D1526] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              {/* Player ao vivo */}
              <div className="relative bg-black aspect-video">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${selected.youtubeId}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`}
                  title={selected.camera.name}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Rodapé */}
              <div className="px-5 py-4 flex items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-white">{selected.camera.name}</p>
                  {selected.camera.description && (
                    <p className="text-sm text-gray-500 mt-0.5">{selected.camera.description}</p>
                  )}
                </div>
                <span className="flex items-center gap-1.5 text-[11px] font-black text-white bg-red-600 px-2.5 py-1 rounded whitespace-nowrap">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  AO VIVO
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function CameraCard({
  camera,
  image,
  onOpen,
}: {
  camera: Camera
  image: string
  onOpen: () => void
}) {
  return (
    <div
      onClick={onOpen}
      className="bg-[#060A14] rounded-xl border border-white/5 overflow-hidden group cursor-pointer transition-all hover:border-[#1B6EF3]/40 hover:scale-[1.02]"
    >
      {/* Thumbnail da câmera */}
      <div className="aspect-video relative bg-black overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={camera.name} className="w-full h-full object-cover" />

        {/* Badge AO VIVO (estilo WavesNow) */}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-600 text-white px-1.5 py-[3px] rounded-sm text-[9px] font-black tracking-wider z-10">
          <span className="w-1 h-1 bg-white rounded-full animate-pulse" />
          AO VIVO
        </div>

        {/* Overlay play/ampliar no hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center z-10">
          <span className="w-12 h-12 rounded-full bg-white/15 group-hover:bg-[#1B6EF3] backdrop-blur flex items-center justify-center transition-all scale-90 group-hover:scale-100">
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
      </div>

      <div className="p-3">
        <p className="text-sm font-medium text-white truncate">{camera.name}</p>
        {camera.description && (
          <p className="text-xs text-gray-600 mt-0.5 truncate">{camera.description}</p>
        )}
      </div>
    </div>
  )
}
