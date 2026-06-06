import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function PremiumPage() {
  const features = {
    free: [
      'Todas as câmeras disponíveis',
      'Qualidade 720p',
      'Atualização a cada 30 segundos',
      'Acesso pelo browser',
    ],
    premium: [
      'Tempo real (< 2s de latência)',
      'Qualidade 1080p Full HD',
      'Replay dos últimos 30 dias',
      'Histórico de snapshots por hora',
      'Câmeras favoritas',
      'Sem anúncios',
      'Suporte prioritário',
    ],
  }

  return (
    <div className="min-h-screen bg-[#060A14] text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-[#1B6EF3]/20 text-[#1B6EF3] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            ⚡ NoClickCerto Premium
          </div>
          <h1 className="text-4xl font-bold mb-4">
            O surf de Ubatuba<br />em tempo real
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Todas as praias de Ubatuba ao vivo, replay e alertas de ondas — por uma fração do preço dos apps nacionais.
          </p>
          <p className="text-green-400 text-sm font-semibold mt-4">
            ✓ 15 dias grátis · cancele quando quiser
          </p>
        </div>

        {/* Cards de plano */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Free */}
          <div className="bg-[#0D1526] rounded-2xl p-8 border border-white/5">
            <div className="mb-6">
              <p className="text-gray-400 text-sm font-medium mb-1">Gratuito</p>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-bold">R$ 0</span>
                <span className="text-gray-500 mb-1">/mês</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Para sempre gratuito</p>
            </div>

            <ul className="space-y-3 mb-8">
              {features.free.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="text-gray-600">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/praias"
              className="block text-center border border-white/10 hover:border-white/30 text-gray-300 font-medium rounded-xl py-3 transition-colors"
            >
              Continuar grátis
            </Link>
          </div>

          {/* Premium */}
          <div className="bg-[#0D1526] rounded-2xl p-8 border-2 border-[#1B6EF3] relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-[#1B6EF3] text-white text-xs font-bold px-4 py-1 rounded-full">
                MAIS POPULAR
              </span>
            </div>

            <div className="mb-6">
              <p className="text-[#1B6EF3] text-sm font-medium mb-1">Premium</p>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-bold">R$ 5,99</span>
                <span className="text-gray-500 mb-1">/mês</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                ou <span className="text-white font-medium">R$ 59,90/ano</span>{' '}
                <span className="text-green-400 text-xs">(2 meses grátis)</span>
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {features.premium.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-white">
                  <span className="text-[#1B6EF3]">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg py-2 px-3 mb-3 text-center">
              <p className="text-green-400 text-sm font-bold">🎁 15 dias grátis</p>
              <p className="text-[10px] text-gray-400">Só paga depois · cancele quando quiser</p>
            </div>

            <Link
              href="/checkout"
              className="block text-center bg-[#1B6EF3] hover:bg-blue-600 text-white font-bold rounded-xl py-3 transition-colors"
            >
              Começar 15 dias grátis
            </Link>

            <p className="text-center text-xs text-gray-600 mt-3">
              Cancele quando quiser · PIX, cartão, Apple Pay e Google Pay
            </p>
          </div>
        </div>

        {/* FAQ simples */}
        <div className="bg-[#0D1526] rounded-2xl border border-white/5 divide-y divide-white/5">
          {[
            ['As câmeras são ao vivo?', 'Sim. Estamos transmitindo as principais praias de Ubatuba ao vivo. Câmeras próprias em alta definição estão sendo instaladas ponto a ponto.'],
            ['Posso cancelar a qualquer momento?', 'Sim. Sem multa, sem complicação. Você continua com acesso até o fim do período pago.'],
            ['Como é feito o pagamento?', 'Via Mercado Pago — PIX, cartão de crédito ou boleto.'],
            ['O plano gratuito vai continuar?', 'Sim, para sempre. Apenas recursos avançados são Premium.'],
          ].map(([q, a]) => (
            <div key={q} className="px-6 py-5">
              <p className="font-medium mb-1">{q}</p>
              <p className="text-sm text-gray-400">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
