'use client'

import { useState } from 'react'
import type { AdminUser } from '@/lib/admin'

export default function AdminPanel({ initialUsers }: { initialUsers: AdminUser[] }) {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers)
  const [busy, setBusy] = useState<string | null>(null)
  const [q, setQ] = useState('')

  async function toggle(u: AdminUser) {
    setBusy(u.id)
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: u.id, action: u.pro ? 'revoke' : 'grant' }),
      })
      if (res.ok) {
        setUsers(prev =>
          prev.map(x => (x.id === u.id ? { ...x, pro: !x.pro } : x)),
        )
      }
    } finally {
      setBusy(null)
    }
  }

  const filtered = users.filter(
    u =>
      !q ||
      (u.name || '').toLowerCase().includes(q.toLowerCase()) ||
      u.email.toLowerCase().includes(q.toLowerCase()),
  )
  const proCount = users.filter(u => u.pro).length

  return (
    <div>
      {/* Resumo */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Stat label="Usuários" value={users.length} />
        <Stat label="PRO ativos" value={proCount} accent />
        <Stat label="Gratuitos" value={users.length - proCount} />
      </div>

      {/* Busca */}
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Buscar por nome ou e-mail…"
        className="w-full bg-[#0D1526] border border-white/10 rounded-xl px-4 py-2.5 text-sm mb-4 focus:border-[#1B6EF3] focus:outline-none"
      />

      {/* Lista */}
      <div className="bg-[#0D1526] border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5">
        {filtered.map(u => (
          <div key={u.id} className="flex items-center gap-3 px-4 py-3">
            <div className="w-9 h-9 rounded-full bg-white/10 overflow-hidden shrink-0 flex items-center justify-center text-xs font-bold">
              {u.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={u.image} alt="" className="w-full h-full object-cover" />
              ) : (
                (u.name || u.email)[0]?.toUpperCase()
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">{u.name || '—'}</p>
              <p className="text-xs text-gray-500 truncate">{u.email}</p>
            </div>
            {u.pro ? (
              <span className="text-[10px] font-black text-green-400 bg-green-500/15 px-2 py-1 rounded-full whitespace-nowrap">
                PRO
              </span>
            ) : (
              <span className="text-[10px] font-bold text-gray-500 bg-white/5 px-2 py-1 rounded-full whitespace-nowrap">
                Grátis
              </span>
            )}
            <button
              onClick={() => toggle(u)}
              disabled={busy === u.id}
              className={`text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap disabled:opacity-50 ${
                u.pro
                  ? 'border border-white/15 text-gray-300 hover:bg-white/5'
                  : 'bg-[#1B6EF3] hover:bg-blue-500 text-white'
              }`}
            >
              {busy === u.id ? '…' : u.pro ? 'Remover PRO' : 'Liberar PRO'}
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-sm text-gray-600 py-8">Nenhum usuário encontrado.</p>
        )}
      </div>

      <p className="text-[11px] text-gray-600 mt-4">
        {'"Liberar PRO" dá acesso premium vitalício (cortesia) ao usuário. Quando a cobrança automática estiver ligada, as assinaturas pagas aparecem aqui também.'}
      </p>
    </div>
  )
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="bg-[#0D1526] border border-white/5 rounded-xl p-4 text-center">
      <p className={`text-2xl font-black ${accent ? 'text-green-400' : ''}`}>{value}</p>
      <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">{label}</p>
    </div>
  )
}
