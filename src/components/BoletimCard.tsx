'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

interface BoletimCardProps {
  videoId: string
  title: string
  date: string
  duration: string
}

export default function BoletimCard({ videoId, title, date, duration }: BoletimCardProps) {
  const [hovering, setHovering] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Pequeno delay antes de carregar o iframe, evita lag em hover rápido
  function handleMouseEnter() {
    timerRef.current = setTimeout(() => setHovering(true), 300)
  }

  function handleMouseLeave() {
    if (timerRef.current) clearTimeout(timerRef.current)
    setHovering(false)
  }

  const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0&showinfo=0`
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`

  return (
    <div className="bg-[#0D1526] border border-white/5 rounded-xl overflow-hidden">
      {/* Área de vídeo */}
      <a
        href={watchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-video overflow-hidden group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Thumbnail do YouTube */}
        <Image
          src={thumb}
          alt={title}
          fill
          className={`object-cover transition-opacity duration-300 ${hovering ? 'opacity-0' : 'opacity-100'}`}
          sizes="(max-width: 768px) 100vw, 300px"
          unoptimized
        />

        {/* Preview iframe — só monta quando hovering */}
        {hovering && (
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
            title={title}
          />
        )}

        {/* Overlay com botão play (visível só quando NÃO está em hover) */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${hovering ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="bg-black/50 backdrop-blur-sm rounded-full p-3 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Badge duração */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-[9px] text-white font-bold px-1.5 py-0.5 rounded pointer-events-none">
          {duration}
        </div>

        {/* Badge hover: "Prévia" */}
        {hovering && (
          <div className="absolute top-2 left-2 bg-[#1B6EF3] text-[8px] text-white font-black px-2 py-0.5 rounded tracking-wider pointer-events-none">
            PRÉVIA
          </div>
        )}
      </a>

      {/* Info */}
      <div className="p-3">
        <p className="text-[10px] text-gray-400 font-medium">{date}</p>
        <p className="text-[9px] text-gray-600 mt-0.5">Boletim Oficial NoClickCerto</p>
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2.5 flex items-center justify-center gap-1.5 text-[10px] font-black bg-[#1B6EF3] hover:bg-blue-500 text-white py-2 rounded-lg tracking-wider transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-2.75 12.65 12.65 0 00-8.45 0A4.83 4.83 0 014.41 6.69 49.2 49.2 0 003 12a49.2 49.2 0 001.41 5.31 4.83 4.83 0 003.77 2.75 12.65 12.65 0 008.45 0 4.83 4.83 0 003.77-2.75A49.2 49.2 0 0021 12a49.2 49.2 0 00-1.41-5.31zM10 15V9l5 3-5 3z"/>
          </svg>
          ASSISTIR AGORA
        </a>
      </div>
    </div>
  )
}
