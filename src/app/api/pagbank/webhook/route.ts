import { NextRequest, NextResponse } from 'next/server'
import { confirmarPagamento } from '@/lib/auth'

// Webhook do PagBank para confirmar pagamentos
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Log para debug em produção
    console.log('🔔 Webhook PagBank recebido:', {
      timestamp: new Date().toISOString(),
      body: JSON.stringify(body, null, 2),
      headers: Object.fromEntries(request.headers.entries())
    })
    
    // Em produção, você validaria a assinatura do webhook aqui
    const { usuario_id, status, referencia, transaction_id } = body
    
    // Status que indicam pagamento aprovado (mais abrangente)
    const statusAprovados = [
      'PAID', 'paid', 
      'approved', 'APPROVED', 
      'completed', 'COMPLETED',
      'success', 'SUCCESS',
      'confirmed', 'CONFIRMED'
    ]
    
    if (statusAprovados.includes(status)) {
      const sucesso = await confirmarPagamento(usuario_id)
      
      if (sucesso) {
        console.log(`✅ Pagamento confirmado para usuário ${usuario_id}`)
        return NextResponse.json({ 
          success: true, 
          message: 'Pagamento confirmado e usuário atualizado para Premium',
          timestamp: new Date().toISOString()
        })
      } else {
        console.error(`❌ Erro ao confirmar pagamento para usuário ${usuario_id}`)
        return NextResponse.json({ 
          success: false, 
          message: 'Erro ao confirmar pagamento',
          timestamp: new Date().toISOString()
        }, { status: 500 })
      }
    }
    
    console.log(`⚠️ Status não reconhecido: ${status}`)
    return NextResponse.json({ 
      success: false, 
      message: `Status de pagamento não reconhecido: ${status}`,
      status_recebido: status,
      status_aceitos: statusAprovados,
      timestamp: new Date().toISOString()
    }, { status: 400 })
    
  } catch (error) {
    console.error('❌ Erro no webhook PagBank:', {
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    })
    
    return NextResponse.json({ 
      success: false, 
      message: 'Erro interno do servidor',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

// Endpoint para testar manualmente a confirmação de pagamento
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const usuarioId = searchParams.get('usuario_id')
  const teste = searchParams.get('teste')
  
  // Endpoint de teste para confirmar pagamento
  if (teste === 'confirmar' && usuarioId) {
    try {
      const sucesso = await confirmarPagamento(parseInt(usuarioId))
      
      if (sucesso) {
        return NextResponse.json({ 
          success: true, 
          message: `✅ Pagamento confirmado para usuário ${usuarioId}`,
          timestamp: new Date().toISOString()
        })
      } else {
        return NextResponse.json({ 
          success: false, 
          message: `❌ Erro ao confirmar pagamento para usuário ${usuarioId}`,
          timestamp: new Date().toISOString()
        }, { status: 500 })
      }
    } catch (error) {
      return NextResponse.json({ 
        success: false, 
        message: 'Erro ao processar teste',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        timestamp: new Date().toISOString()
      }, { status: 500 })
    }
  }
  
  // Informações sobre o webhook
  return NextResponse.json({ 
    message: 'Webhook do PagBank ativo e funcionando',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      webhook: 'POST /api/pagbank/webhook',
      test: 'GET /api/pagbank/webhook?teste=confirmar&usuario_id=ID',
      info: 'GET /api/pagbank/webhook'
    },
    status_aceitos: [
      'PAID', 'paid', 
      'approved', 'APPROVED', 
      'completed', 'COMPLETED',
      'success', 'SUCCESS',
      'confirmed', 'CONFIRMED'
    ],
    exemplo_payload: {
      usuario_id: 123,
      status: 'PAID',
      referencia: 'REF123',
      transaction_id: 'TXN456'
    },
    logs: {
      info: 'Todos os webhooks são logados no console para debug',
      production: 'Em produção, verifique os logs do Vercel'
    }
  })
}