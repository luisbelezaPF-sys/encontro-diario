'use client'

import { useState, useEffect } from 'react'
import { Crown, ExternalLink, CheckCircle, Clock, CreditCard } from 'lucide-react'

interface PaymentSimulatorProps {
  usuarioId: number
  onPaymentConfirmed: () => void
}

export default function PaymentSimulator({ usuarioId, onPaymentConfirmed }: PaymentSimulatorProps) {
  const [simulandoPagamento, setSimulandoPagamento] = useState(false)
  const [pagamentoConfirmado, setPagamentoConfirmado] = useState(false)
  const [mostrarRedirecionamento, setMostrarRedirecionamento] = useState(false)

  // Redirecionar automaticamente para PagBank após 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarRedirecionamento(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const simularPagamento = async () => {
    setSimulandoPagamento(true)
    
    try {
      // Simular chamada para webhook do PagBank
      const response = await fetch('/api/pagbank/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario_id: usuarioId,
          status: 'PAID',
          referencia: `REF_${usuarioId}_${Date.now()}`,
          transaction_id: `TXN_${Date.now()}`
        })
      })

      const result = await response.json()
      
      if (result.success) {
        setPagamentoConfirmado(true)
        setTimeout(() => {
          onPaymentConfirmed()
        }, 2000)
      } else {
        alert('Erro ao confirmar pagamento: ' + result.message)
      }
    } catch (error) {
      console.error('Erro ao simular pagamento:', error)
      alert('Erro ao processar pagamento')
    } finally {
      setSimulandoPagamento(false)
    }
  }

  const redirecionarPagBank = () => {
    window.open('https://pag.ae/81aj-zE2K', '_blank')
  }

  if (pagamentoConfirmado) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-green-200">
        <div className="text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            ✅ Pagamento Confirmado!
          </h2>
          <p className="text-green-700 mb-6">
            Sua conta Premium foi ativada com sucesso. Redirecionando para o painel...
          </p>
          <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Card Principal de Pagamento */}
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-amber-200">
        <div className="text-center mb-6">
          <Crown className="w-16 h-16 text-amber-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Ativar Conta Premium
          </h2>
          <p className="text-lg text-slate-600">
            Acesso completo ao conteúdo espiritual
          </p>
        </div>

        {/* Benefícios Premium */}
        <div className="bg-gradient-to-r from-amber-50 to-sky-50 rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">
            O que você terá com Premium:
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-slate-700">Versículos atualizados via API</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-slate-700">Sistema de favoritos completo</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-slate-700">Compartilhamento no WhatsApp</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-slate-700">Reflexões e orações exclusivas</span>
            </div>
          </div>
        </div>

        {/* Preço */}
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-amber-600 mb-2">R$ 19,90</div>
          <p className="text-slate-600">Pagamento único mensal</p>
        </div>

        {/* Botões de Ação */}
        <div className="space-y-4">
          {/* Botão Principal - PagBank */}
          <button
            onClick={redirecionarPagBank}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <CreditCard className="w-6 h-6" />
            Pagar via PagBank
            <ExternalLink className="w-5 h-5" />
          </button>

          {/* Botão Simulador (para testes) */}
          <button
            onClick={simularPagamento}
            disabled={simulandoPagamento}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2"
          >
            {simulandoPagamento ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processando...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Simular Pagamento (Teste)
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card de Redirecionamento Automático */}
      {mostrarRedirecionamento && (
        <div className="bg-gradient-to-r from-blue-50 to-sky-100 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-800">
              Redirecionamento Automático
            </h3>
          </div>
          <p className="text-blue-700 mb-4">
            Como você acabou de criar sua conta, será redirecionado automaticamente 
            para o PagBank para ativar sua assinatura Premium.
          </p>
          <button
            onClick={redirecionarPagBank}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <ExternalLink className="w-5 h-5" />
            Ir para PagBank Agora
          </button>
        </div>
      )}

      {/* Informações de Segurança */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">
          🔒 Pagamento Seguro
        </h3>
        <ul className="space-y-2 text-sm text-slate-600">
          <li>• Processamento via PagBank (PagSeguro)</li>
          <li>• Dados protegidos com criptografia SSL</li>
          <li>• Suporte a cartões, PIX e boleto</li>
          <li>• Confirmação automática após pagamento</li>
        </ul>
      </div>
    </div>
  )
}