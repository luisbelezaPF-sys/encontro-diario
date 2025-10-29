'use client'

import { useState } from 'react'
import { CheckCircle, Crown, Mail } from 'lucide-react'

export default function ConfirmacaoPagamento() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [contaCriada, setContaCriada] = useState(false)

  const criarConta = async () => {
    // Aqui seria a integração com Supabase para criar a conta
    // Por enquanto, simulamos o processo
    if (email && senha) {
      setContaCriada(true)
      // Aqui enviaria o email de boas-vindas
    }
  }

  if (contaCriada) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-amber-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 text-center border border-sky-100">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Conta Criada com Sucesso!</h1>
          <p className="text-slate-600 mb-6">
            Bem-vindo ao Encontro Diário com Deus! Sua conta premium foi ativada.
          </p>
          <div className="bg-gradient-to-br from-amber-50 to-sky-50 p-6 rounded-2xl mb-6">
            <Mail className="w-8 h-8 text-amber-600 mx-auto mb-3" />
            <p className="text-sm text-slate-700">
              Enviamos um email de boas-vindas para <strong>{email}</strong> com todas as informações da sua conta premium.
            </p>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-gradient-to-r from-sky-500 to-sky-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Acessar Painel Premium
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-amber-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-sky-100">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Pagamento Confirmado!</h1>
          <p className="text-slate-600">
            Crie sua conta para acessar o conteúdo premium
          </p>
        </div>

        {/* Formulário */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-sky-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-sky-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
              placeholder="Crie uma senha segura"
            />
          </div>

          <button
            onClick={criarConta}
            disabled={!email || !senha}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Criar Conta Premium
          </button>
        </div>

        {/* Benefícios */}
        <div className="mt-8 bg-gradient-to-br from-amber-50 to-sky-50 p-6 rounded-2xl">
          <h3 className="font-semibold text-slate-800 mb-3">Seus benefícios premium:</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-center gap-2">
              <span className="text-amber-500">✨</span>
              Orações guiadas em áudio
            </li>
            <li className="flex items-center gap-2">
              <span className="text-amber-500">📖</span>
              Mensagens exclusivas diárias
            </li>
            <li className="flex items-center gap-2">
              <span className="text-amber-500">🙏</span>
              Reflexões profundas sobre fé
            </li>
            <li className="flex items-center gap-2">
              <span className="text-amber-500">✝️</span>
              Conteúdo espiritual avançado
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}