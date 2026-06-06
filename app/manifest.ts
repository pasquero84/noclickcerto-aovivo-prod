import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NoClickCerto Ao Vivo',
    short_name: 'NoClickCerto',
    description: 'Câmeras ao vivo das praias de Ubatuba',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#060A14',
    theme_color: '#060A14',
    lang: 'pt-BR',
    categories: ['sports', 'weather', 'lifestyle'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
