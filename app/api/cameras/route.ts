import { NextRequest, NextResponse } from 'next/server'
import type { ApiResponse } from '@/types'

export async function GET(_request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    return NextResponse.json(
      {
        success: true,
        data: [],
        message: 'Câmeras recuperadas com sucesso',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('GET /api/cameras:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao recuperar câmeras',
      },
      { status: 500 }
    )
  }
}

export async function POST(_request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    return NextResponse.json(
      {
        success: true,
        message: 'Câmera criada com sucesso',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('POST /api/cameras:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao criar câmera',
      },
      { status: 500 }
    )
  }
}
