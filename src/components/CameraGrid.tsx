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

// Imagem (poster) de cada câmera — câmeras WavesNow de Ubatuba (provisório)
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

// Vídeo (feed) — vídeos públicos de Ubatuba do WavesNow, hospedados localmente.
// Alterna entre os 2 disponíveis para dar variedade enquanto as câmeras
// próprias não são instaladas.
const VIDEOS = ['/cameras/ubatuba-1.mp4', '/cameras/ubatuba-2.mp4']
function getCameraVideo(index: number): string {
  return VIDEOS[index % VIDEOS.length]
}

export default function CameraGrid({ beaches }: { beaches: Beach[] }) {
  const [selected, setSelected] = useState<{ camera: Camera; image: string; video: string } | null>(null)

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

  // índice global para alternar vídeos entre todas as câmeras
  let cameraIndex = -1

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
                beach.cameras.map(camera => {
                  cameraIndex += 1
                  const image = getCameraImage(camera.name)
                  const video = getCameraVideo(cameraIndex)
                  return (
                    <CameraCard
                      key={camera.id}
                      camera={camera}
                      image={image}
                      video={video}
                      onOpen={() => setSelected({ camera, image, video })}
                    />
                  )
                })
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal — câmera ao vivo em tamanho grande */}
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
              {/* Vídeo grande */}
              <div className="relative bg-black">
                <video
                  src={selected.video}
                  poster={selected.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full max-h-[75vh] object-contain bg-black"
                />
                {/* Badge AO VIVO */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-600 text-white px-2.5 py-1 rounded text-[11px] font-black tracking-wider">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  AO VIVO
                </div>
              </div>

              {/* Rodapé */}
              <div className="px-5 py-4 flex items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-white">{selected.camera.name}</p>
                  {selected.camera.description && (
                    <p className="text-sm text-gray-500 mt-0.5">{selected.camera.description}</p>
                  )}
                </div>
                <span className="text-[10px] text-gray-500 bg-white/5 px-2.5 py-1 rounded-full whitespace-nowrap">
                  720p · ao vivo
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
  video,
  onOpen,
}: {
  camera: Camera
  image: string
  video: string
  onOpen: () => void
}) {
  return (
    <div
      onClick={onOpen}
      className="bg-[#060A14] rounded-xl border border-white/5 overflow-hidden group cursor-pointer transition-all hover:border-[#1B6EF3]/40 hover:scale-[1.02]"
    >
      {/* Feed da câmera (vídeo em loop) */}
      <div className="aspect-video relative bg-black overflow-hidden">
        <video
          src={video}
          poster={image}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />

        {/* Badge AO VIVO (estilo WavesNow) */}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-600 text-white px-1.5 py-[3px] rounded-sm text-[9px] font-black tracking-wider z-10">
          <span className="w-1 h-1 bg-white rounded-full animate-pulse" />
          AO VIVO
        </div>

        {/* Overlay "Ampliar" no hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center z-10">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-semibold bg-black/50 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
            </svg>
            Ampliar
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
