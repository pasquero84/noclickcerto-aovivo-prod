import CamerasView from '@/components/CamerasView'

export const dynamic = 'force-dynamic'
export const revalidate = 60

// AO VIVO = página única das câmeras das praias
export default function Home() {
  return <CamerasView />
}
