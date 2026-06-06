import Link from 'next/link'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Sobre · NoClickCerto Ao Vivo',
  description: 'A câmera ao vivo de Ubatuba feita por quem vive o mar daqui.',
}

const VALUES = [
  {
    icon: '🌊',
    title: 'Feito em Ubatuba, pra Ubatuba',
    text: 'Não somos um app nacional genérico. Somos focados 100% nas praias de Ubatuba — as ondas, os ventos e os cantos que só quem é daqui conhece.',
  },
  {
    icon: '💸',
    title: 'Preço justo, de verdade',
    text: 'Enquanto os apps nacionais cobram mais de R$ 20 por mês, aqui você acompanha todas as praias por R$ 5,99. Surf não devia ser caro.',
  },
  {
    icon: '📍',
    title: 'Direto ao ponto',
    text: 'Abriu, viu a onda. Sem enrolação, sem mil abas. Você checa as condições em segundos e decide pra onde ir.',
  },
  {
    icon: '🤝',
    title: 'Apoiando o comércio local',
    text: 'Cada câmera tem espaço pros patrocinadores da região. Quem anuncia aqui fala direto com quem ama o mar de Ubatuba.',
  },
]

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-[#060A14] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/cameras/banner-ubatuba.jpg" alt="Ubatuba" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060A14]/80 via-[#060A14]/85 to-[#060A14]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 py-20 text-center">
          <span className="inline-block bg-[#1B6EF3]/20 text-[#1B6EF3] text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest">
            SOBRE NÓS
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-5 leading-tight">
            O mar de Ubatuba<br />na palma da sua mão
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            O NoClickCerto nasceu de uma ideia simples: todo surfista de Ubatuba merece saber
            como está o mar <span className="text-white font-semibold">antes de pegar a prancha</span> —
            de onde estiver, a qualquer hora.
          </p>
        </div>
      </section>

      {/* Manifesto */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="prose-invert space-y-5 text-gray-300 leading-relaxed">
          <p>
            Ubatuba tem mais de 100 praias. Cada uma com seu vento, sua maré, seu segredo.
            Quem é daqui sabe: a onda que tá boa na Vermelha pode tá impossível na Itamambuca.
            E ninguém quer dirigir meia hora pra chegar e ver o mar mexido.
          </p>
          <p>
            Foi por isso que criamos o <span className="text-white font-semibold">NoClickCerto Ao Vivo</span> —
            câmeras nas principais praias de Ubatuba, transmitindo as condições em tempo real,
            direto no seu celular. Você abre, escolhe a praia e decide na hora.
          </p>
          <p>
            Somos surfistas, produtores e gente apaixonada pelo litoral norte. Nossa missão é
            colocar Ubatuba no mapa do surf com a melhor tecnologia — e do jeito mais acessível possível.
            Estamos instalando câmeras próprias em alta definição ponto a ponto, e isso é só o começo.
          </p>
        </div>
      </section>

      {/* Valores */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="grid sm:grid-cols-2 gap-4">
          {VALUES.map(v => (
            <div key={v.title} className="bg-[#0D1526] border border-white/5 rounded-2xl p-6">
              <div className="text-3xl mb-3">{v.icon}</div>
              <h3 className="font-bold text-lg mb-2">{v.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 pb-20 text-center">
        <div className="bg-gradient-to-br from-[#0D1526] to-[#0b1a36] border border-[#1B6EF3]/20 rounded-2xl p-10">
          <h2 className="text-2xl font-black mb-3">Bora pro mar com a maré certa?</h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Acompanhe todas as praias de Ubatuba ao vivo por menos que um café por semana.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold px-6 py-3 rounded-xl transition-colors">
              Ver câmeras ao vivo
            </Link>
            <Link href="/premium" className="bg-[#1B6EF3] hover:bg-blue-500 text-white font-black px-6 py-3 rounded-xl transition-colors">
              Assinar por R$ 5,99/mês
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
