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

// Mapear câmeras de Ubatuba para imagens WavesNow (provisório)
function getWavesNowImage(cameraName: string): string | null {
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
  // "A Preferida do Lado Norte" = Praia Vermelha do Norte no WavesNow
  if (nameUpper.includes('PREFERIDA') || nameUpper.includes('LADO NORTE')) {
    return 'https://wavesnow.sfo3.cdn.digitaloceanspaces.com/cameras/vermelha-norte2.png'
  }
  // Toninhas não tem imagem no WavesNow ainda
  return null
}

export default function CameraGrid({ beaches }: { beaches: Beach[] }) {
  const [selected, setSelected] = useState<{ camera: Camera; image: string } | null>(null)

  // Fechar modal com a tecla Esc + travar scroll do body enquanto aberto
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
                beach.cameras.map(camera => {
                  const image = getWavesNowImage(camera.name)
                  return (
                    <CameraCard
                      key={camera.id}
                      camera={camera}
                      image={image}
                      onOpen={() => image && setSelected({ camera, image })}
                    />
                  )
                })
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal de zoom da câmera */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Botão fechar */}
            <button
              onClick={() => setSelected(null)}
              aria-label="Fechar"
              className="absolute -top-10 right-0 md:-top-2 md:-right-12 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white text-xl transition-colors"
            >
              ✕
            </button>

            <div className="bg-[#0D1526] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              {/* Imagem grande */}
              <div className="relative bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selected.image}
                  alt={selected.camera.name}
                  className="w-full max-h-[75vh] object-contain"
                />
              </div>

              {/* Rodapé com nome */}
              <div className="px-5 py-4 flex items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-white">{selected.camera.name}</p>
                  {selected.camera.description && (
                    <p className="text-sm text-gray-500 mt-0.5">{selected.camera.description}</p>
                  )}
                </div>
                <span className="text-[10px] text-gray-500 bg-white/5 px-2.5 py-1 rounded-full whitespace-nowrap">
                  Print do momento
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
  image: string | null
  onOpen: () => void
}) {
  const clickable = image !== null

  return (
    <div
      onClick={clickable ? onOpen : undefined}
      className={`bg-[#060A14] rounded-xl border border-white/5 overflow-hidden group transition-all ${
        clickable ? 'cursor-pointer hover:border-[#1B6EF3]/40 hover:scale-[1.02]' : ''
      }`}
    >
      {/* Thumbnail */}
      <div className="aspect-video relative flex items-center justify-center bg-gradient-to-br from-[#0D1526] to-[#060A14] overflow-hidden">
        {image ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={camera.name}
              className="w-full h-full object-cover"
            />
            {/* Indicador de "clique para ampliar" no hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-semibold bg-black/50 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
                Ampliar
              </span>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="text-4xl mb-2 opacity-30">📷</div>
            <p className="text-xs text-gray-600">Câmera offline</p>
            <p className="text-[10px] text-gray-700 mt-1">Em instalação</p>
          </div>
        )}

        {/* Badge status — apenas nas câmeras sem imagem (em instalação) */}
        {!image && (
          <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-semibold bg-yellow-500/20 text-yellow-500">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
            EM BREVE
          </div>
        )}
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
