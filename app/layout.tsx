import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/providers'

export const metadata: Metadata = {
  title: 'NoClickCerto Ao Vivo',
  description: 'Câmeras ao vivo de Ubatuba - NoClickCerto',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'NoClickCerto Ao Vivo',
    description: 'Câmeras ao vivo de Ubatuba',
    type: 'website',
    locale: 'pt_BR',
  },
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
