'use client'

import { useState } from 'react'
import Link from 'next/link'

type Plan = 'mensal' | 'anual'
type Method = 'pix' | 'cartao' | 'applepay' | 'googlepay'

const PLANS = {
  mensal: { label: 'Mensal', price: 'R$ 5,99', sub: 'por mês', amount: 5.9, note: 'Renova todo mês · cancele quando quiser' },
  anual: { label: 'Anual', price: 'R$ 49,90', sub: 'por ano', amount: 49.9, note: 'Economize 2 meses · R$ 4,16/mês' },
}

const METHODS: { id: Method; label: string; icon: string; hint: string }[] = [
  { id: 'pix', label: 'PIX', icon: '⚡', hint: 'Aprovação na hora' },
  { id: 'cartao', label: 'Cartão de crédito', icon: '💳', hint: 'Visa, Master, Elo' },
  { id: 'applepay', label: 'Apple Pay', icon: '', hint: 'iPhone, iPad, Mac' },
  { id: 'googlepay', label: 'Google Pay', icon: 'G', hint: 'Android, Chrome' },
]

export default function CheckoutForm() {
  const [plan, setPlan] = useState<Plan>('mensal')
  const [method, setMethod] = useState<Method>('pix')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  const current = PLANS[plan]

  async function handlePay() {
    setMsg(null)
    if (!email || !email.includes('@')) {
      setMsg('Informe um e-mail válido para continuar.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, method, email, amount: current.amount }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setMsg(data.message || 'Pagamento em configuração. Em breve disponível.')
      }
    } catch {
      setMsg('Não foi possível iniciar o pagamento agora. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 grid lg:grid-cols-[1fr_360px] gap-8">
        {/* Coluna esquerda — escolhas */}
        <div>
          <Link href="/premium" className="text-xs text-gray-500 hover:text-white">← Voltar aos planos</Link>
          <h1 className="text-3xl font-black mt-3 mb-1">Finalizar assinatura</h1>
          <p className="text-gray-400 text-sm mb-8">Todas as praias de Ubatuba ao vivo. Cancele quando quiser.</p>

          {/* Plano */}
          <h2 className="text-xs font-black tracking-widest text-gray-400 uppercase mb-3">1 · Escolha o plano</h2>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {(['mensal', 'anual'] as Plan[]).map(p => (
              <button
                key={p}
                onClick={() => setPlan(p)}
                className={`text-left rounded-xl p-4 border-2 transition-all ${
                  plan === p ? 'border-[#1B6EF3] bg-[#1B6EF3]/10' : 'border-white/10 bg-[#0D1526] hover:border-white/20'
                }`}
              >
                {p === 'anual' && (
                  <span className="inline-block bg-green-500/20 text-green-400 text-[9px] font-bold px-2 py-0.5 rounded-full mb-1">
                    MELHOR OFERTA
                  </span>
                )}
                <p className="text-sm font-bold">{PLANS[p].label}</p>
                <p className="text-2xl font-black mt-1">{PLANS[p].price}</p>
                <p className="text-[11px] text-gray-500">{PLANS[p].sub}</p>
              </button>
            ))}
          </div>

          {/* Método */}
          <h2 className="text-xs font-black tracking-widest text-gray-400 uppercase mb-3">2 · Forma de pagamento</h2>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {METHODS.map(m => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`flex items-center gap-3 rounded-xl p-3.5 border-2 transition-all ${
                  method === m.id ? 'border-[#1B6EF3] bg-[#1B6EF3]/10' : 'border-white/10 bg-[#0D1526] hover:border-white/20'
                }`}
              >
                <span className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-base font-black shrink-0">
                  {m.id === 'applepay' ? '' : m.id === 'googlepay' ? 'G' : m.icon}
                </span>
                <span className="text-left">
                  <span className="block text-sm font-bold">{m.label}</span>
                  <span className="block text-[10px] text-gray-500">{m.hint}</span>
                </span>
              </button>
            ))}
          </div>

          {/* E-mail */}
          <h2 className="text-xs font-black tracking-widest text-gray-400 uppercase mb-3">3 · Seus dados</h2>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className="w-full bg-[#0D1526] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#1B6EF3] focus:outline-none"
          />
        </div>

        {/* Coluna direita — resumo */}
        <div className="lg:sticky lg:top-20 h-fit">
          <div className="bg-[#0D1526] border border-white/10 rounded-2xl p-6">
            <h3 className="font-bold mb-4">Resumo</h3>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">NoClickCerto Premium</span>
              <span className="font-semibold">{current.price}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mb-4">
              <span>Plano {current.label.toLowerCase()}</span>
              <span>{current.sub}</span>
            </div>
            <div className="border-t border-white/10 pt-4 flex justify-between items-end mb-5">
              <span className="text-sm text-gray-400">Total</span>
              <span className="text-2xl font-black">{current.price}</span>
            </div>

            <button
              onClick={handlePay}
              disabled={loading}
              className="w-full bg-[#1B6EF3] hover:bg-blue-500 disabled:opacity-60 text-white font-black py-3.5 rounded-xl transition-colors"
            >
              {loading ? 'Processando…' : 'Pagar e assinar'}
            </button>

            {msg && (
              <p className="text-xs text-yellow-400/90 mt-3 text-center">{msg}</p>
            )}

            <p className="text-[10px] text-gray-600 mt-4 text-center leading-relaxed">
              🔒 Pagamento seguro · {current.note}
            </p>
            <div className="flex items-center justify-center gap-2 mt-3 opacity-60 text-[10px] text-gray-500">
              <span>PIX</span>·<span>Visa</span>·<span>Master</span>·<span> Pay</span>·<span>G Pay</span>
            </div>
          </div>
        </div>
      </div>
  )
}
