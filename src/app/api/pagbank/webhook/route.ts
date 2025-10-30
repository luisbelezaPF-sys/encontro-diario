import { NextRequest, NextResponse } from 'next/server'
import { confirmarPagamento } from '@/lib/auth'

// Simular webhook do PagBank para confirmar pagamentos
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Em produção, você validaria a assinatura do webhook aqui
    const { usuario_id, status, referencia } = body
    
    if (status === 'PAID' || status === 'approved') {
      const sucesso = await confirmarPagamento(usuario_id)
      
      if (sucesso) {
        return NextResponse.json({ 
          success: true, 
          message: 'Pagamento confirmado e usuário atualizado para Premium' 
        })
      } else {
        return NextResponse.json({ 
          success: false, 
          message: 'Erro ao confirmar pagamento' 
        }, { status: 500 })
      }
    }
    
    return NextResponse.json({ 
      success: false, 
      message: 'Status de pagamento não reconhecido' 
    }, { status: 400 })
    
  } catch (error) {
    console.error('Erro no webhook:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    }, { status: 500 })
  }
}

// Endpoint para testar manualmente
export async function GET() {
  return NextResponse.json({ 
    message: 'Webhook do PagBank ativo',
    endpoints: {
      webhook: 'POST /api/pagbank/webhook',
      test: 'GET /api/pagbank/webhook'
    }
  })
}