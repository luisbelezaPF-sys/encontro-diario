'use client'

import { useState } from 'react'
import { User, Lock, Mail, Eye, EyeOff, Crown } from 'lucide-react'
import { criarConta, fazerLogin, registrarPagamento, type AuthResponse } from '@/lib/auth'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (usuario: any) => void
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [modo, setModo] = useState<'login' | 'cadastro'>('login')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [nome, setNome] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [carregando, setCarregando] = useState(false)
  const [mensagem, setMensagem] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCarregando(true)
    setMensagem('')

    try {
      let resultado: AuthResponse

      if (modo === 'cadastro') {
        resultado = await criarConta(email, senha, nome)
        
        if (resultado.success && resultado.usuario) {
          // Registrar pagamento pendente
          await registrarPagamento(resultado.usuario.id, 19.90)
          
          // Redirecionar para pagamento
          window.open('https://pag.ae/81aj-zE2K', '_blank')
          
          setMensagem('Conta criada! Redirecionando para pagamento...')
          
          setTimeout(() => {
            onSuccess(resultado.usuario)
            onClose()
          }, 2000)
        }
      } else {
        resultado = await fazerLogin(email, senha)
        
        if (resultado.success) {
          onSuccess(resultado.usuario)
          onClose()
        }
      }

      if (!resultado.success) {
        setMensagem(resultado.message)
      }

    } catch (error) {
      setMensagem('Erro interno. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  const resetForm = () => {
    setEmail('')
    setSenha('')
    setNome('')
    setMensagem('')
    setMostrarSenha(false)
  }

  const alternarModo = () => {
    setModo(modo === 'login' ? 'cadastro' : 'login')
    resetForm()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative">
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-2xl"
        >
          ×
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            {modo === 'login' ? 'Entrar na Conta' : 'Criar Conta'}
          </h2>
          <p className="text-slate-600 mt-2">
            {modo === 'login' 
              ? 'Acesse seu conteúdo espiritual' 
              : 'Junte-se à nossa comunidade de fé'
            }
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {modo === 'cadastro' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Nome Completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="Seu nome completo"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type={mostrarSenha ? 'text' : 'password'}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full pl-12 pr-12 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="Sua senha"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {mostrarSenha ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mensagem */}
          {mensagem && (
            <div className={`p-3 rounded-xl text-sm ${
              mensagem.includes('sucesso') || mensagem.includes('criada')
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {mensagem}
            </div>
          )}

          {/* Botão Submit */}
          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-gradient-to-r from-sky-500 to-sky-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
          >
            {carregando ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {modo === 'login' ? 'Entrando...' : 'Criando conta...'}
              </div>
            ) : (
              modo === 'login' ? 'Entrar' : 'Criar Conta'
            )}
          </button>

          {/* Premium Info para Cadastro */}
          {modo === 'cadastro' && (
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-200">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-amber-600" />
                <span className="font-semibold text-amber-800">Acesso Premium</span>
              </div>
              <p className="text-sm text-amber-700">
                Após criar sua conta, você será redirecionado para o pagamento de R$ 19,90 
                para ter acesso completo ao conteúdo espiritual.
              </p>
            </div>
          )}

          {/* Alternar modo */}
          <div className="text-center">
            <button
              type="button"
              onClick={alternarModo}
              className="text-sky-600 hover:text-sky-700 font-medium"
            >
              {modo === 'login' 
                ? 'Não tem conta? Criar conta' 
                : 'Já tem conta? Fazer login'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}