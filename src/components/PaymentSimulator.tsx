'use client'

import { useState } from 'react'
import { CheckCircle, Crown, CreditCard } from 'lucide-react'
import { confirmarPagamento } from '@/lib/auth'

interface PaymentSimulatorProps {
  usuarioId: number
  onPaymentConfirmed: () => void
}

export default function PaymentSimulator({ usuarioId, onPaymentConfirmed }: PaymentSimulatorProps) {
  const [simulandoPagamento, setSimulandoPagamento] = useState(false)
  const [pagamentoConfirmado, setPagamentoConfirmado] = useState(false)

  const simularPagamento = async () => {
    setSimulandoPagamento(true)
    
    // Simular delay do processamento
    setTimeout(async () => {
      const sucesso = await confirmarPagamento(usuarioId)
      
      if (sucesso) {
        setPagamentoConfirmado(true)
        setTimeout(() => {
          onPaymentConfirmed()
        }, 2000)
      }
      
      setSimulandoPagamento(false)
    }, 3000)
  }

  if (pagamentoConfirmado) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-800 mb-2">
          Pagamento Confirmado!
        </h3>
        <p className="text-green-700">
          Sua conta foi ativada como Premium. Redirecionando...
        </p>
      </div>
    )
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
      <div className="text-center mb-6">
        <Crown className="w-16 h-16 text-amber-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-amber-800 mb-2">
          Simulador de Pagamento
        </h3>
        <p className="text-amber-700 mb-4">
          Para fins de demonstração, você pode simular a confirmação do pagamento aqui.
        </p>
        <div className="bg-white p-4 rounded-xl border border-amber-200 mb-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-slate-700">Valor:</span>
            <span className="font-bold text-2xl text-amber-600">R$ 19,90</span>
          </div>
        </div>
      </div>

      <button
        onClick={simularPagamento}
        disabled={simulandoPagamento}
        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2"
      >
        {simulandoPagamento ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processando Pagamento...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5" />
            Simular Pagamento Aprovado
          </>
        )}
      </button>

      <p className="text-xs text-amber-600 text-center mt-3">
        * Em produção, isso seria feito automaticamente via webhook do PagBank
      </p>
    </div>
  )
}