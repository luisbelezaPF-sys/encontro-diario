import { NextRequest, NextResponse } from 'next/server'
import { confirmarPagamento } from '@/lib/auth'

// Webhook do PagBank para confirmar pagamentos
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Em produção, você validaria a assinatura do webhook aqui
    const { usuario_id, status, referencia, transaction_id } = body
    
    console.log('Webhook recebido:', { usuario_id, status, referencia, transaction_id })
    
    // Status que indicam pagamento aprovado
    const statusAprovados = ['PAID', 'approved', 'APPROVED', 'completed', 'COMPLETED']
    
    if (statusAprovados.includes(status)) {
      const sucesso = await confirmarPagamento(usuario_id)
      
      if (sucesso) {
        console.log(`✅ Pagamento confirmado para usuário ${usuario_id}`)
        return NextResponse.json({ 
          success: true, 
          message: 'Pagamento confirmado e usuário atualizado para Premium' 
        })
      } else {
        console.error(`❌ Erro ao confirmar pagamento para usuário ${usuario_id}`)
        return NextResponse.json({ 
          success: false, 
          message: 'Erro ao confirmar pagamento' 
        }, { status: 500 })
      }
    }
    
    console.log(`⚠️ Status não reconhecido: ${status}`)
    return NextResponse.json({ 
      success: false, 
      message: `Status de pagamento não reconhecido: ${status}` 
    }, { status: 400 })
    
  } catch (error) {
    console.error('❌ Erro no webhook:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    }, { status: 500 })
  }
}

// Endpoint para testar manualmente a confirmação de pagamento
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const usuarioId = searchParams.get('usuario_id')
  const teste = searchParams.get('teste')
  
  if (teste === 'confirmar' && usuarioId) {
    try {
      const sucesso = await confirmarPagamento(parseInt(usuarioId))
      
      if (sucesso) {
        return NextResponse.json({ 
          success: true, 
          message: `✅ Pagamento confirmado para usuário ${usuarioId}` 
        })
      } else {
        return NextResponse.json({ 
          success: false, 
          message: `❌ Erro ao confirmar pagamento para usuário ${usuarioId}` 
        }, { status: 500 })
      }
    } catch (error) {
      return NextResponse.json({ 
        success: false, 
        message: 'Erro ao processar teste' 
      }, { status: 500 })
    }
  }
  
  return NextResponse.json({ 
    message: 'Webhook do PagBank ativo',
    endpoints: {
      webhook: 'POST /api/pagbank/webhook',
      test: 'GET /api/pagbank/webhook?teste=confirmar&usuario_id=ID',
      info: 'GET /api/pagbank/webhook'
    },
    status_aceitos: ['PAID', 'approved', 'APPROVED', 'completed', 'COMPLETED'],
    exemplo_payload: {
      usuario_id: 123,
      status: 'PAID',
      referencia: 'REF123',
      transaction_id: 'TXN456'
    }
  })
}