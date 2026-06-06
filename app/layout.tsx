import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Providers } from '@/components/providers'

export const metadata: Metadata = {
  title: 'NoClickCerto Ao Vivo',
  description: 'Câmeras ao vivo de Ubatuba - NoClickCerto',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://camerasaovivo.noclickcerto.com.br'),
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'NoClickCerto',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/icons/icon-192.png',
    apple: '/icons/icon-180.png',
  },
  openGraph: {
    title: 'NoClickCerto Ao Vivo',
    description: 'Câmeras ao vivo de Ubatuba',
    type: 'website',
    locale: 'pt_BR',
  },
}

export const viewport: Viewport = {
  themeColor: '#060A14',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="bg-[#060A14] text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
