'use client'

import { useEffect, useState } from 'react'

export type FlatCamera = {
  id: string
  name: string
  main: string
  sub: string
  viewers: number
}

// Thumbnail (print WavesNow) por câmera
function getCameraImage(name: string): string {
  const n = name.toUpperCase()
  if (n.includes('ITAMAMBUCA')) return '/cameras/itamambuca.png'
  if (n.includes('VERMELHA') && n.includes('CENTRO')) return '/cameras/vermelha-centro.png'
  if (n.includes('PEREQUÊ') || n.includes('PEREQUE')) return '/cameras/pereque-acu.png'
  if (n.includes('PRAIA GRANDE')) return '/cameras/praia-grande.png'
  if (n.includes('PREFERIDA') || n.includes('LADO NORTE')) return '/cameras/vermelha-norte.png'
  if (n.includes('TONINHAS')) return '/cameras/toninhas.png'
  return '/cameras/itamambuca.png'
}

// Stream do WavesNow no YouTube (uso autorizado, provisório)
const PRAIA_GRANDE = '-_iOULj_d7Q'
function getYoutubeId(name: string): string {
  const n = name.toUpperCase()
  if (n.includes('ITAMAMBUCA')) return '4K4TEa1Q2H4'
  if (n.includes('TONINHAS')) return 'PUcA3w2Bl0c'
  return PRAIA_GRANDE
}

export default function HomeCameras({ cameras }: { cameras: FlatCamera[] }) {
  const [selected, setSelected] = useState<FlatCamera | null>(null)

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
      {/* Grid de câmeras — 2 cols mobile, 4 cols desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {cameras.map((cam, i) => (
          <button
            key={cam.id}
            onClick={() => setSelected(cam)}
            className="group block text-left"
          >
            <div className="bg-[#0D1526] border border-white/5 group-hover:border-[#1B6EF3]/40 rounded-xl overflow-hidden transition-all duration-200 group-hover:scale-[1.02]">
              {/* Thumbnail */}
              <div className="aspect-video relative overflow-hidden bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={getCameraImage(cam.name)} alt={cam.main} className="w-full h-full object-cover" />

                {/* Badge AO VIVO */}
                <div className="absolute top-1.5 left-1.5 flex items-center gap-1 bg-red-600 text-white px-1.5 py-[2px] rounded-sm text-[8px] font-black tracking-wider z-10">
                  <span className="w-1 h-1 bg-white rounded-full animate-pulse" />
                  AO VIVO
                </div>

                {/* Número */}
                <div className="absolute bottom-1.5 left-1.5 w-4 h-4 bg-[#1B6EF3] rounded text-[8px] font-black flex items-center justify-center z-10">
                  {i + 1}
                </div>

                {/* Play no hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center z-10">
                  <span className="w-10 h-10 rounded-full bg-white/15 group-hover:bg-[#1B6EF3] backdrop-blur flex items-center justify-center transition-all scale-90 group-hover:scale-100">
                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="px-2 py-1.5">
                <p className="text-[10px] font-black leading-tight text-white truncate">{cam.main}</p>
                {cam.sub && <p className="text-[9px] text-gray-500 leading-tight truncate">{cam.sub}</p>}
                <p className="text-[9px] text-gray-600 mt-1 flex items-center gap-1">
                  <span className="w-1 h-1 bg-green-500 rounded-full inline-block" />
                  {cam.viewers} online
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal — câmera em tamanho grande (YouTube) */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-5xl" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelected(null)}
              aria-label="Fechar"
              className="absolute -top-10 right-0 md:-top-2 md:-right-12 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white text-xl transition-colors"
            >
              ✕
            </button>

            <div className="bg-[#0D1526] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="relative bg-black aspect-video">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${getYoutubeId(selected.name)}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`}
                  title={selected.name}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="px-5 py-4 flex items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-white">{selected.main}{selected.sub ? ` · ${selected.sub}` : ''}</p>
                  <p className="text-sm text-gray-500 mt-0.5">Ubatuba · SP</p>
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
