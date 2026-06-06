import Link from 'next/link'
import Navbar from '@/components/Navbar'
import HomeCameras, { type FlatCamera } from '@/components/HomeCameras'
import { getBeachesWithCameras } from '@/lib/cameras'

export const dynamic = 'force-dynamic'
export const revalidate = 60

const CONDITIONS = [
  { icon: '🌊', label: 'Ondas', value: '0.6–1.0m' },
  { icon: '⏱', label: 'Período', value: '8s' },
  { icon: '💨', label: 'Vento', value: 'NE 13km' },
  { icon: '🔁', label: 'Maré', value: 'Enchendo' },
]

const PREMIUM_FEATURES = [
  'Todas as câmeras ao vivo',
  'Histórico das últimas 24h',
  'Sem anúncios',
  'Alertas de boas ondas',
  'Boletins exclusivos',
  'Novas câmeras em primeira mão',
]

const VIEWERS = [137, 95, 115, 52, 78, 45, 61, 33]

export default async function Home() {
  const beaches = await getBeachesWithCameras()

  // achatar câmeras em lista única (estilo mockup)
  const cameras: FlatCamera[] = []
  for (const beach of beaches) {
    for (const cam of beach.cameras) {
      const parts = cam.name.split(' - ')
      const main = (parts[0] || beach.name).toUpperCase()
      const sub = (parts[1] || '').toUpperCase()
      cameras.push({
        id: cam.id,
        name: cam.name,
        main,
        sub,
        viewers: VIEWERS[cameras.length % VIEWERS.length],
      })
    }
  }
  const totalOnline = cameras.reduce((a, c) => a + c.viewers, 0)

  return (
    <div className="min-h-screen bg-[#060A14] text-white flex flex-col">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-white/5">
        {/* Banner aéreo de Ubatuba */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/cameras/banner-ubatuba.jpg" alt="Ubatuba" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060A14] via-[#060A14]/85 to-[#060A14]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060A14] via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16
                        grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">
          {/* Esquerda: título + stats */}
          <div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[0.9] tracking-tight mb-4">
              UBATUBA
              <br />
              <span className="text-[#1B6EF3]">EM TEMPO REAL</span>
            </h1>
            <p className="text-gray-300 text-sm md:text-base max-w-md mb-8 leading-relaxed">
              Acompanhe as condições do mar agora mesmo nas principais praias de Ubatuba com nossas câmeras ao vivo.
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-4">
              <Stat value={String(cameras.length)} label="CÂMERAS AO VIVO" />
              <Stat value={String(totalOnline)} label="USUÁRIOS ONLINE" />
              <Stat value="LIVE" label="ATUALIZAÇÃO EM TEMPO REAL" dot />
            </div>
          </div>

          {/* Direita: card Premium */}
          <div className="bg-[#0D1526]/90 backdrop-blur border border-[#1B6EF3]/25 rounded-2xl p-5 lg:p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 bg-yellow-400 rounded flex items-center justify-center shrink-0">
                <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="text-xs font-black tracking-widest text-white">NOCLICKCERTO PREMIUM</span>
            </div>

            <ul className="space-y-2 mb-5">
              {PREMIUM_FEATURES.map(f => (
                <li key={f} className="flex items-center gap-2 text-xs text-gray-300">
                  <svg className="w-3.5 h-3.5 text-[#1B6EF3] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <div className="mb-4">
              <div className="flex items-end gap-1.5">
                <span className="text-3xl font-black">R$ 5,99</span>
                <span className="text-gray-500 text-sm mb-0.5">/mês</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Ou <span className="text-white font-bold">R$ 49,90</span>
                <span className="text-[#1B6EF3] font-bold"> /ano</span>
              </p>
            </div>

            <Link
              href="/premium"
              className="block text-center bg-[#1B6EF3] hover:bg-blue-500 text-white font-black py-2.5 rounded-xl text-xs tracking-widest transition-colors"
            >
              ASSINAR AGORA
            </Link>
          </div>
        </div>
      </section>

      {/* ── CORPO ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 w-full
                      grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        {/* Câmeras */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shrink-0" />
            <div>
              <h2 className="text-sm font-black tracking-widest">CÂMERAS AO VIVO</h2>
              <p className="text-[10px] text-gray-600 mt-0.5">Clique em uma câmera para assistir</p>
            </div>
          </div>

          <HomeCameras cameras={cameras} />
        </section>

        {/* Sidebar — Condições Atuais (sem boletim) */}
        <aside className="space-y-5">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Condições Atuais</h3>
            </div>
            <div className="bg-[#0D1526] border border-white/5 rounded-xl p-4">
              <div className="grid grid-cols-4 gap-2 text-center">
                {CONDITIONS.map(c => (
                  <div key={c.label}>
                    <div className="text-xl mb-1">{c.icon}</div>
                    <p className="text-[11px] font-bold leading-tight">{c.value}</p>
                    <p className="text-[9px] text-gray-600 mt-0.5">{c.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-[8px] text-gray-700 mt-3 text-center">Dados atualizados há 10 min</p>
            </div>
          </div>

          {/* Redes sociais */}
          <div>
            <h3 className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-3">Siga-nos</h3>
            <div className="flex gap-2">
              <a href="https://youtube.com/@noclickcerto" target="_blank" rel="noopener noreferrer"
                 className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[#1B6EF3]/10 hover:bg-[#1B6EF3]/20 border border-[#1B6EF3]/30 rounded-lg transition-all text-xs font-semibold text-[#1B6EF3]">
                ▶️ YouTube
              </a>
              <a href="https://instagram.com/noclickcerto" target="_blank" rel="noopener noreferrer"
                 className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[#1B6EF3]/10 hover:bg-[#1B6EF3]/20 border border-[#1B6EF3]/30 rounded-lg transition-all text-xs font-semibold text-[#1B6EF3]">
                📷 Instagram
              </a>
            </div>
          </div>
        </aside>
      </div>

      {/* ── PATROCINADORES ────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-10 w-full">
        <div className="border-t border-white/5 pt-5">
          <p className="text-[9px] text-gray-600 tracking-widest font-bold text-center mb-4 uppercase">Patrocinadores</p>
          <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {Array.from({ length: 14 }, (_, i) => (
              <Link
                key={i}
                href="/premium"
                className="bg-[#0D1526] border border-white/5 hover:border-[#1B6EF3]/30 rounded-lg flex flex-col items-center justify-center py-2 gap-0.5 transition-all group"
                style={{ aspectRatio: '1' }}
              >
                <span className="text-[7px] font-bold text-gray-700 group-hover:text-[#1B6EF3] text-center leading-tight block">
                  ANUNCIE<br />AQUI
                </span>
                <span className="text-[7px] text-gray-700 group-hover:text-[#1B6EF3]">{i + 1}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({ value, label, dot }: { value: string; label: string; dot?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 bg-white/10 border border-white/10 rounded-lg flex items-center justify-center shrink-0">
        {dot
          ? <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse block" />
          : <span className="w-2 h-2 bg-[#1B6EF3] rounded-full block" />}
      </div>
      <div>
        <p className="text-base font-black leading-none">{value}</p>
        <p className="text-[9px] text-gray-400 tracking-widest mt-0.5">{label}</p>
      </div>
    </div>
  )
}
