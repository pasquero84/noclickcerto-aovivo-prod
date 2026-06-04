import Link from 'next/link'
import Navbar from '@/components/Navbar'
import BoletimCard from '@/components/BoletimCard'

const CAMERAS = [
  { id: 1, name: 'ITAMAMBUCA', sub: 'CANTO DIREITO', viewers: 137, from: 'from-[#0c2a4a]', to: 'to-[#0a1e35]' },
  { id: 2, name: 'ITAMAMBUCA', sub: 'RUA 1', viewers: 95, from: 'from-[#0a2a3a]', to: 'to-[#071a28]' },
  { id: 3, name: 'PRAIA GRANDE', sub: 'BAGUARI', viewers: 115, from: 'from-[#0a2e2e]', to: 'to-[#071e1e]' },
  { id: 4, name: 'PRAIA GRANDE', sub: 'MEIO / BOMBEIRO', viewers: 52, from: 'from-[#0d2040]', to: 'to-[#08152c]' },
  { id: 5, name: 'PEREQUÊ-AÇU', sub: 'QUIOSQUE GIRASSOL', viewers: 78, from: 'from-[#0c2a3a]', to: 'to-[#081c28]' },
  { id: 6, name: 'VERMELHA', sub: 'LADO NORTE', viewers: 45, from: 'from-[#1a1a3a]', to: 'to-[#0d0d28]' },
  { id: 7, name: 'VERMELHA', sub: 'DO CENTRO', viewers: 61, from: 'from-[#0d1e40]', to: 'to-[#08122c]' },
  { id: 8, name: 'TONINHAS', sub: '', viewers: 33, from: 'from-[#0a2040]', to: 'to-[#060f28]' },
]

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

export default function Home() {
  return (
    <div className="min-h-screen bg-[#060A14] text-white flex flex-col">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Fundo oceano / aerial */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#071628] via-[#0b2040] to-[#060A14]" />
        {/* Textura sutil de ondas */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(ellipse 120% 60% at 60% 40%, #1B6EF3 0%, transparent 70%)' }}
        />

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14
                        grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">

          {/* Esquerda: título + stats */}
          <div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[0.9] tracking-tight mb-4">
              AS CONDIÇÕES
              <br />
              <span className="text-[#1B6EF3]">DO SURF</span>
              <br />
              <span className="text-gray-300">EM TEMPO REAL</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base max-w-md mb-8 leading-relaxed">
              Acompanhe as ondas agora mesmo nas principais praias de Ubatuba com nossas câmeras ao vivo.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-x-6 gap-y-4">
              <Stat icon={
                <svg className="w-4 h-4 text-[#1B6EF3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              } value="8" label="CÂMERAS AO VIVO" />
              <Stat icon={
                <svg className="w-4 h-4 text-[#1B6EF3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              } value="231" label="USUÁRIOS ONLINE" />
              <Stat icon={
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse block" />
              } value="LIVE" label="ATUALIZAÇÃO EM TEMPO REAL" />
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

      {/* ── CORPO PRINCIPAL ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 w-full
                      grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">

        {/* ── Câmeras ─────────────────────── */}
        <section>
          {/* Header câmeras */}
          <div className="flex items-start justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shrink-0 mt-0.5" />
              <div>
                <h2 className="text-sm font-black tracking-widest">CÂMERAS AO VIVO</h2>
                <p className="text-[10px] text-gray-600 mt-0.5">Clique em uma câmera para assistir</p>
              </div>
            </div>
            <Link href="/praias" className="text-[10px] text-[#1B6EF3] hover:text-blue-400 transition-colors whitespace-nowrap mt-0.5">
              Ver todas as câmeras →
            </Link>
          </div>

          {/* Grid câmeras — 2 cols mobile, 4 cols desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
            {CAMERAS.map(cam => (
              <Link key={cam.id} href="/praias" className="group block">
                <div className="bg-[#0D1526] border border-white/5 group-hover:border-[#1B6EF3]/40 rounded-xl overflow-hidden transition-all duration-200 group-hover:scale-[1.02]">
                  {/* Thumbnail */}
                  <div className={`aspect-video relative bg-gradient-to-br ${cam.from} ${cam.to}`}>
                    {/* Onda SVG decorativa */}
                    <svg className="absolute bottom-0 left-0 right-0 w-full opacity-20" viewBox="0 0 200 40" preserveAspectRatio="none">
                      <path d="M0 20 C40 10, 80 30, 120 20 S160 10, 200 20 L200 40 L0 40 Z" fill="#1B6EF3" />
                    </svg>

                    {/* Badge AO VIVO */}
                    <div className="absolute top-1.5 left-1.5 flex items-center gap-1 bg-red-600 text-white px-1.5 py-[2px] rounded-sm text-[8px] font-black tracking-wider">
                      <span className="w-1 h-1 bg-white rounded-full animate-pulse" />
                      AO VIVO
                    </div>

                    {/* Número */}
                    <div className="absolute bottom-1.5 left-1.5 w-4 h-4 bg-[#1B6EF3] rounded text-[8px] font-black flex items-center justify-center">
                      {cam.id}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="px-2 py-1.5">
                    <p className="text-[10px] font-black leading-tight text-white">{cam.name}</p>
                    {cam.sub && <p className="text-[9px] text-gray-500 leading-tight">{cam.sub}</p>}
                    <p className="text-[9px] text-gray-600 mt-1 flex items-center gap-1">
                      <span className="w-1 h-1 bg-green-500 rounded-full inline-block" />
                      {cam.viewers} online
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Sidebar ─────────────────────── */}
        <aside className="space-y-5">

          {/* Último Boletim */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Último Boletim</h3>
              <Link href="/boletim" className="text-[9px] text-[#1B6EF3] hover:text-blue-400 tracking-wide">Ver todos</Link>
            </div>
            <BoletimCard
              videoId="xHRoJmYVtdM"
              title="Boletim NoClickCerto Ubatuba"
              date="23/05 · 01h00"
              duration="6:45"
            />
          </div>

          {/* Condições Atuais */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Condições Atuais</h3>
              <Link href="/praias" className="text-[9px] text-[#1B6EF3] hover:text-blue-400 tracking-wide">Ver todas</Link>
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
        </aside>
      </div>

      {/* ── PATROCINADORES ───────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-8 w-full">
        <div className="border-t border-white/5 pt-5">
          <p className="text-[9px] text-gray-600 tracking-widest font-bold text-center mb-4 uppercase">Patrocinadores</p>
          <div className="grid grid-cols-7 sm:grid-cols-14 gap-2"
            style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {Array.from({ length: 14 }, (_, i) => (
              <Link
                key={i}
                href="/patrocinadores"
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

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-base font-black leading-none">{value}</p>
        <p className="text-[9px] text-gray-500 tracking-widest mt-0.5">{label}</p>
      </div>
    </div>
  )
}
