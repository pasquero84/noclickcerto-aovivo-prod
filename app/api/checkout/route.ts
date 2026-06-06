import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Cria uma preferência de pagamento no Mercado Pago.
// PIX, cartão, Apple Pay e Google Pay são oferecidos pelo próprio checkout do MP.
// Para ativar: defina MP_ACCESS_TOKEN nas variáveis de ambiente (token da conta).
export async function POST(req: Request) {
  const token = process.env.MP_ACCESS_TOKEN

  let body: { plan?: string; email?: string; amount?: number }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ message: 'Requisição inválida.' }, { status: 400 })
  }

  const amount = Number(body.amount) || 5.9
  const planLabel = body.plan === 'anual' ? 'Anual' : 'Mensal'

  // Sem token configurado ainda → checkout em ativação
  if (!token) {
    return NextResponse.json({
      message: 'Checkout em ativação. Falta conectar a conta de pagamento (Mercado Pago).',
    })
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://camerasaovivo.noclickcerto.com.br'

  try {
    const res = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            title: `NoClickCerto Premium · ${planLabel}`,
            description: 'Câmeras ao vivo de Ubatuba',
            quantity: 1,
            currency_id: 'BRL',
            unit_price: amount,
          },
        ],
        payer: body.email ? { email: body.email } : undefined,
        back_urls: {
          success: `${baseUrl}/minha-conta?status=sucesso`,
          failure: `${baseUrl}/checkout?status=falha`,
          pending: `${baseUrl}/minha-conta?status=pendente`,
        },
        auto_return: 'approved',
        statement_descriptor: 'NOCLICKCERTO',
      }),
    })

    const data = await res.json()
    const url = data.init_point || data.sandbox_init_point
    if (!url) {
      return NextResponse.json(
        { message: 'Não foi possível iniciar o pagamento. Verifique a configuração.' },
        { status: 502 },
      )
    }
    return NextResponse.json({ url })
  } catch {
    return NextResponse.json(
      { message: 'Erro ao conectar ao processador de pagamento.' },
      { status: 502 },
    )
  }
}
