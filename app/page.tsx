import { redirect } from 'next/navigation'

// AO VIVO = página única das câmeras das praias
export default function Home() {
  redirect('/praias')
}
