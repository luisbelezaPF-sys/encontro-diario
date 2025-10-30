'use client'

import { useState, useEffect } from 'react'
import { Heart, BookOpen, Users, Crown, Share2, Star, User, LogOut, Lock } from 'lucide-react'
import { 
  getConteudoDoDia, 
  oracoes, 
  compartilharVersiculo,
  compartilharReflexao,
  compartilharSanto,
  compartilharOracao
} from '@/lib/conteudo'
import { 
  obterVersiculoDoDia, 
  salvarVersiculoNoBanco, 
  salvarFavorito, 
  registrarHistorico,
  type Versiculo 
} from '@/lib/bible-api'
import { 
  obterUsuarioAtual, 
  usuarioEhPremium, 
  fazerLogout,
  type Usuario 
} from '@/lib/auth'
import AuthModal from '@/components/AuthModal'
import PaymentSimulator from '@/components/PaymentSimulator'

export default function Home() {
  const [paginaAtual, setPaginaAtual] = useState<'home' | 'painel' | 'sobre' | 'pagamento'>('home')
  const [categoriaOracao, setCategoriaOracao] = useState<keyof typeof oracoes | null>(null)
  const [versiculoAPI, setVersiculoAPI] = useState<Versiculo | null>(null)
  const [carregandoVersiculo, setCarregandoVersiculo] = useState(false)
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [carregandoUsuario, setCarregandoUsuario] = useState(true)
  const [mostrarAuthModal, setMostrarAuthModal] = useState(false)
  const [mostrarMenuUsuario, setMostrarMenuUsuario] = useState(false)
  
  const conteudoDoDia = getConteudoDoDia()
  const ehPremium = usuarioEhPremium(usuario)

  // Verificar usuário logado ao carregar
  useEffect(() => {
    verificarUsuario()
  }, [])

  const verificarUsuario = async () => {
    setCarregandoUsuario(true)
    const usuarioAtual = await obterUsuarioAtual()
    setUsuario(usuarioAtual)
    setCarregandoUsuario(false)
  }

  // Carregar versículo da API quando entrar no painel
  useEffect(() => {
    if (paginaAtual === 'painel' && !versiculoAPI && ehPremium) {
      carregarVersiculoDoDia()
    }
  }, [paginaAtual, versiculoAPI, ehPremium])

  const carregarVersiculoDoDia = async () => {
    setCarregandoVersiculo(true)
    try {
      const versiculo = await obterVersiculoDoDia()
      setVersiculoAPI(versiculo)
      
      // Salvar no banco de dados
      await salvarVersiculoNoBanco(versiculo, usuario?.id?.toString())
      
      // Registrar histórico de acesso
      await registrarHistorico('visualizou_versiculo_api', usuario?.id?.toString())
      
    } catch (error) {
      console.log('Erro ao carregar versículo:', error)
    } finally {
      setCarregandoVersiculo(false)
    }
  }

  const handleFavoritar = async (tipo: 'versiculo' | 'reflexao' | 'santo' | 'oracao', conteudo: string, referencia?: string) => {
    if (!usuario) {
      setMostrarAuthModal(true)
      return
    }
    
    if (!ehPremium) {
      alert('Funcionalidade disponível apenas para usuários Premium!')
      return
    }
    
    const sucesso = await salvarFavorito(tipo, conteudo, referencia, usuario.id.toString())
    
    if (sucesso) {
      alert('✅ Salvo nos favoritos!')
      await registrarHistorico(`favoritou_${tipo}`, usuario.id.toString())
    } else {
      alert('❌ Erro ao salvar favorito. Tente novamente.')
    }
  }

  const handleCompartilharVersiculoAPI = () => {
    if (!ehPremium) {
      alert('Funcionalidade disponível apenas para usuários Premium!')
      return
    }
    
    if (versiculoAPI) {
      compartilharVersiculo(versiculoAPI.texto, versiculoAPI.referencia)
      registrarHistorico('compartilhou_versiculo_api', usuario?.id?.toString())
    }
  }

  const handleLogout = () => {
    fazerLogout()
    setUsuario(null)
    setMostrarMenuUsuario(false)
    setPaginaAtual('home')
  }

  const handleAuthSuccess = (novoUsuario: Usuario) => {
    setUsuario(novoUsuario)
    setMostrarAuthModal(false)
    
    // Se não é premium, mostrar página de pagamento
    if (!usuarioEhPremium(novoUsuario)) {
      setPaginaAtual('pagamento')
    } else {
      setPaginaAtual('painel')
    }
  }

  const handlePaymentConfirmed = () => {
    verificarUsuario() // Recarregar dados do usuário
    setPaginaAtual('painel')
  }

  const verificarAcessoPremium = (acao: string) => {
    if (!usuario) {
      setMostrarAuthModal(true)
      return false
    }
    
    if (!ehPremium) {
      alert(`${acao} disponível apenas para usuários Premium!`)
      return false
    }
    
    return true
  }

  // Página de Pagamento
  if (paginaAtual === 'pagamento') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-amber-50">
        <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-sky-200">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <button 
              onClick={() => setPaginaAtual('home')}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">✝</span>
              </div>
              <h1 className="text-xl font-semibold text-slate-800">Encontro Diário com Deus</h1>
            </button>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <Crown className="w-20 h-20 text-amber-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-slate-800 mb-4">
              Ative sua Conta Premium
            </h1>
            <p className="text-lg text-slate-600">
              Olá, {usuario?.nome}! Para acessar todo o conteúdo espiritual, 
              confirme seu pagamento abaixo.
            </p>
          </div>

          {usuario && (
            <PaymentSimulator 
              usuarioId={usuario.id} 
              onPaymentConfirmed={handlePaymentConfirmed}
            />
          )}

          <div className="mt-8 text-center">
            <button
              onClick={() => window.open('https://pag.ae/81aj-zE2K', '_blank')}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mr-4"
            >
              Pagar via PagBank - R$ 19,90
            </button>
            <button
              onClick={() => setPaginaAtual('home')}
              className="text-slate-600 hover:text-slate-800 font-medium"
            >
              Voltar ao Início
            </button>
          </div>
        </main>
      </div>
    )
  }

  // Página inicial
  if (paginaAtual === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-amber-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-sky-200">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">✝</span>
              </div>
              <h1 className="text-xl font-semibold text-slate-800">Encontro Diário com Deus</h1>
            </div>
            <nav className="flex items-center gap-6">
              <button 
                onClick={() => setPaginaAtual('painel')}
                className="text-slate-600 hover:text-sky-600 transition-colors"
              >
                Painel
              </button>
              <button 
                onClick={() => setPaginaAtual('sobre')}
                className="text-slate-600 hover:text-sky-600 transition-colors"
              >
                Sobre
              </button>
              
              {/* Menu do usuário */}
              {carregandoUsuario ? (
                <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
              ) : usuario ? (
                <div className="relative">
                  <button
                    onClick={() => setMostrarMenuUsuario(!mostrarMenuUsuario)}
                    className="flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-2 rounded-xl hover:bg-sky-200 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden md:block">{usuario.nome}</span>
                    {ehPremium && <Crown className="w-4 h-4 text-amber-500" />}
                  </button>
                  
                  {mostrarMenuUsuario && (
                    <div className="absolute right-0 top-12 bg-white rounded-xl shadow-lg border border-slate-200 py-2 min-w-48 z-10">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="font-medium text-slate-800">{usuario.nome}</p>
                        <p className="text-sm text-slate-500">{usuario.email}</p>
                        <p className="text-xs text-amber-600 font-medium">
                          {ehPremium ? '👑 Premium' : '🔒 Conta Gratuita'}
                        </p>
                      </div>
                      {!ehPremium && (
                        <button
                          onClick={() => setPaginaAtual('pagamento')}
                          className="w-full text-left px-4 py-2 text-amber-600 hover:bg-amber-50 flex items-center gap-2"
                        >
                          <Crown className="w-4 h-4" />
                          Ativar Premium
                        </button>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setMostrarAuthModal(true)}
                  className="bg-sky-500 text-white px-4 py-2 rounded-xl hover:bg-sky-600 transition-colors flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Entrar
                </button>
              )}
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <main className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="mb-12">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-white text-4xl">✝</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
              Bem-vindo ao seu<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-amber-600">
                Encontro Diário com Deus
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Renove sua alma, encontre força e sinta a presença divina em cada novo dia. 
              Um espaço sagrado de fé, reflexão e comunhão com versículos bíblicos atualizados automaticamente.
            </p>
          </div>

          {/* Botões principais */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              onClick={() => {
                if (usuario && ehPremium) {
                  setPaginaAtual('painel')
                } else if (usuario && !ehPremium) {
                  setPaginaAtual('pagamento')
                } else {
                  setMostrarAuthModal(true)
                }
              }}
              className="bg-gradient-to-r from-sky-500 to-sky-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              🕊️ {usuario ? (ehPremium ? 'Entrar no Painel' : 'Ativar Premium') : 'Entrar no Painel'}
            </button>
            
            {!usuario && (
              <button 
                onClick={() => setMostrarAuthModal(true)}
                className="bg-white text-slate-700 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl border border-sky-200 hover:border-sky-300 transform hover:scale-105 transition-all duration-300"
              >
                👤 Criar Conta
              </button>
            )}
            
            <button 
              onClick={() => window.open('https://pag.ae/81aj-zE2K', '_blank')}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative"
            >
              <Crown className="inline w-5 h-5 mr-2" />
              <div className="flex flex-col items-center">
                <span>Assinar Premium</span>
                <span className="text-sm font-bold bg-white/20 px-2 py-1 rounded-lg mt-1">
                  R$ 19,90
                </span>
              </div>
            </button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-sky-100">
              <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Versículos da API</h3>
              <p className="text-slate-600">Versículos bíblicos atualizados automaticamente de APIs confiáveis como Bible-API.com e outras fontes.</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-sky-100">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Favoritos Salvos</h3>
              <p className="text-slate-600">Salve seus versículos, reflexões e orações favoritas no Supabase para acessar quando quiser.</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-sky-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Compartilhamento</h3>
              <p className="text-slate-600">Compartilhe versículos e mensagens inspiradoras diretamente no WhatsApp com seus entes queridos.</p>
            </div>
          </div>
        </main>

        {/* Modal de Autenticação */}
        <AuthModal 
          isOpen={mostrarAuthModal}
          onClose={() => setMostrarAuthModal(false)}
          onSuccess={handleAuthSuccess}
        />
      </div>
    )
  }

  // Página Sobre
  if (paginaAtual === 'sobre') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-amber-50">
        <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-sky-200">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <button 
              onClick={() => setPaginaAtual('home')}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">✝</span>
              </div>
              <h1 className="text-xl font-semibold text-slate-800">Encontro Diário com Deus</h1>
            </button>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-12 border border-sky-100">
            <h1 className="text-4xl font-bold text-slate-800 mb-8 text-center">Sobre Nós</h1>
            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
              <p className="text-xl mb-6 text-center italic">
                "O Encontro Diário com Deus é um espaço de fé, reflexão e comunhão. 
                Aqui, você renova sua alma, encontra força e sente a presença divina em cada novo dia."
              </p>
              
              <p className="mb-6">
                Nossa missão é proporcionar um momento sagrado de conexão espiritual através de:
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 text-xl">📖</span>
                  <span>Versículos bíblicos atualizados automaticamente via APIs confiáveis</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 text-xl">💾</span>
                  <span>Sistema de favoritos integrado com Supabase para salvar conteúdos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 text-xl">🙏</span>
                  <span>Orações organizadas por necessidades específicas</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 text-xl">✝️</span>
                  <span>Histórias de santos e personagens bíblicos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 text-xl">📱</span>
                  <span>Compartilhamento direto no WhatsApp</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 text-xl">👑</span>
                  <span>Acesso Premium com conteúdo exclusivo por apenas R$ 19,90</span>
                </li>
              </ul>

              <p className="text-center">
                Que este espaço abençoe sua vida e fortaleça sua fé todos os dias.
              </p>
            </div>
            
            <div className="text-center mt-8">
              <button 
                onClick={() => setPaginaAtual('painel')}
                className="bg-gradient-to-r from-sky-500 to-sky-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Começar Jornada Espiritual
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Painel Principal
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-sky-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <button 
            onClick={() => setPaginaAtual('home')}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">✝</span>
            </div>
            <h1 className="text-xl font-semibold text-slate-800">Encontro Diário</h1>
          </button>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setPaginaAtual('sobre')}
              className="text-slate-600 hover:text-sky-600 transition-colors"
            >
              Sobre
            </button>
            
            {/* Status do usuário */}
            {usuario ? (
              <div className="flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-2 rounded-xl">
                <User className="w-4 h-4" />
                <span className="hidden md:block">{usuario.nome}</span>
                {ehPremium ? (
                  <Crown className="w-4 h-4 text-amber-500" title="Premium Ativo" />
                ) : (
                  <Lock className="w-4 h-4 text-red-500" title="Acesso Limitado" />
                )}
              </div>
            ) : (
              <button
                onClick={() => setMostrarAuthModal(true)}
                className="bg-sky-500 text-white px-4 py-2 rounded-xl hover:bg-sky-600 transition-colors"
              >
                Entrar
              </button>
            )}
            
            {!ehPremium && (
              <button 
                onClick={() => window.open('https://pag.ae/81aj-zE2K', '_blank')}
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-xl font-medium text-sm shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex flex-col items-center"
              >
                <div className="flex items-center gap-1">
                  <Crown className="w-4 h-4" />
                  <span>Premium</span>
                </div>
                <span className="text-xs font-bold">R$ 19,90</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Verificação de acesso */}
      {!usuario ? (
        <main className="max-w-4xl mx-auto px-4 py-16 text-center">
          <Lock className="w-20 h-20 text-slate-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Acesso Restrito</h2>
          <p className="text-lg text-slate-600 mb-8">
            Para acessar o conteúdo espiritual, você precisa fazer login ou criar uma conta.
          </p>
          <button
            onClick={() => setMostrarAuthModal(true)}
            className="bg-gradient-to-r from-sky-500 to-sky-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Fazer Login / Criar Conta
          </button>
        </main>
      ) : !ehPremium ? (
        <main className="max-w-4xl mx-auto px-4 py-16 text-center">
          <Crown className="w-20 h-20 text-amber-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Upgrade para Premium</h2>
          <p className="text-lg text-slate-600 mb-8">
            Olá, {usuario.nome}! Para acessar todo o conteúdo espiritual, 
            você precisa ativar sua conta Premium.
          </p>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-amber-200">
            <h3 className="text-2xl font-bold text-amber-600 mb-4">R$ 19,90</h3>
            <ul className="text-left space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Versículos atualizados via API</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Sistema de favoritos completo</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Compartilhamento no WhatsApp</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Reflexões e orações exclusivas</span>
              </li>
            </ul>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setPaginaAtual('pagamento')}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Ativar Premium
            </button>
            <button
              onClick={() => window.open('https://pag.ae/81aj-zE2K', '_blank')}
              className="bg-green-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Pagar via PagBank
            </button>
          </div>
        </main>
      ) : (
        <main className="max-w-6xl mx-auto px-4 py-8">
          {/* Saudação */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Paz e bênçãos, {usuario.nome}! 🕊️
            </h1>
            <p className="text-lg text-slate-600">
              {new Date().toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Crown className="w-5 h-5 text-amber-500" />
              <span className="text-amber-600 font-medium">Conta Premium Ativa</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Versículo da API */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-sky-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Versículo da API</h2>
              </div>
              
              {carregandoVersiculo ? (
                <div className="text-center py-8">
                  <div className="animate-spin w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-slate-600">Buscando versículo do dia...</p>
                </div>
              ) : versiculoAPI ? (
                <>
                  <blockquote className="text-lg text-slate-700 italic mb-4 leading-relaxed">
                    "{versiculoAPI.texto}"
                  </blockquote>
                  <p className="text-purple-600 font-semibold mb-2">— {versiculoAPI.referencia}</p>
                  <p className="text-sm text-slate-500 mb-6">Fonte: {versiculoAPI.fonte}</p>
                  <div className="flex gap-3">
                    <button 
                      onClick={handleCompartilharVersiculoAPI}
                      className="bg-green-500 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 flex-1 justify-center"
                    >
                      <Share2 className="w-5 h-5" />
                      Compartilhar
                    </button>
                    <button 
                      onClick={() => handleFavoritar('versiculo', versiculoAPI.texto, versiculoAPI.referencia)}
                      className="bg-amber-500 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 flex-1 justify-center"
                    >
                      <Star className="w-5 h-5" />
                      Favoritar
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-600 mb-4">Erro ao carregar versículo da API</p>
                  <button 
                    onClick={carregarVersiculoDoDia}
                    className="bg-sky-500 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Tentar Novamente
                  </button>
                </div>
              )}
            </div>

            {/* Versículo Local do Dia */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-sky-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-sky-500 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Versículo Local</h2>
              </div>
              <blockquote className="text-lg text-slate-700 italic mb-4 leading-relaxed">
                "{conteudoDoDia.versiculo.texto}"
              </blockquote>
              <p className="text-sky-600 font-semibold mb-6">— {conteudoDoDia.versiculo.referencia}</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => compartilharVersiculo(conteudoDoDia.versiculo.texto, conteudoDoDia.versiculo.referencia)}
                  className="bg-green-500 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 flex-1 justify-center"
                >
                  <Share2 className="w-5 h-5" />
                  Compartilhar
                </button>
                <button 
                  onClick={() => handleFavoritar('versiculo', conteudoDoDia.versiculo.texto, conteudoDoDia.versiculo.referencia)}
                  className="bg-amber-500 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 flex-1 justify-center"
                >
                  <Star className="w-5 h-5" />
                  Favoritar
                </button>
              </div>
            </div>
          </div>

          {/* Reflexão do Dia */}
          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-sky-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Reflexão do Dia</h2>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-4">{conteudoDoDia.reflexao.titulo}</h3>
            <p className="text-slate-700 leading-relaxed mb-6">{conteudoDoDia.reflexao.texto}</p>
            <div className="flex gap-3">
              <button 
                onClick={() => compartilharReflexao(conteudoDoDia.reflexao.titulo, conteudoDoDia.reflexao.texto)}
                className="bg-green-500 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 flex-1 justify-center"
              >
                <Share2 className="w-5 h-5" />
                Compartilhar Reflexão
              </button>
              <button 
                onClick={() => handleFavoritar('reflexao', `${conteudoDoDia.reflexao.titulo}: ${conteudoDoDia.reflexao.texto}`)}
                className="bg-amber-500 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 flex-1 justify-center"
              >
                <Star className="w-5 h-5" />
                Favoritar
              </button>
            </div>
          </div>

          {/* Santo do Dia */}
          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-sky-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center">
                <span className="text-white text-xl">✝️</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Santo do Dia</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">{conteudoDoDia.santo.nome}</h3>
                <p className="text-slate-700 leading-relaxed mb-4">{conteudoDoDia.santo.historia}</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-sky-50 p-6 rounded-2xl">
                <h4 className="text-lg font-semibold text-slate-800 mb-3">Lição de Fé</h4>
                <p className="text-slate-700 italic leading-relaxed mb-4">{conteudoDoDia.santo.licao}</p>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button 
                onClick={() => compartilharSanto(conteudoDoDia.santo.nome, conteudoDoDia.santo.historia, conteudoDoDia.santo.licao)}
                className="bg-green-500 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 flex-1 justify-center"
              >
                <Share2 className="w-5 h-5" />
                Compartilhar Santo do Dia
              </button>
              <button 
                onClick={() => handleFavoritar('santo', `${conteudoDoDia.santo.nome}: ${conteudoDoDia.santo.historia} - ${conteudoDoDia.santo.licao}`)}
                className="bg-amber-500 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 flex-1 justify-center"
              >
                <Star className="w-5 h-5" />
                Favoritar
              </button>
            </div>
          </div>

          {/* Orações por Categoria */}
          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-sky-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-rose-500 rounded-2xl flex items-center justify-center">
                <span className="text-white text-xl">🙏</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Orações</h2>
            </div>

            {/* Categorias */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {Object.keys(oracoes).map((categoria) => (
                <button
                  key={categoria}
                  onClick={() => setCategoriaOracao(categoria as keyof typeof oracoes)}
                  className={`p-4 rounded-2xl font-medium transition-all duration-300 ${
                    categoriaOracao === categoria
                      ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-lg'
                      : 'bg-sky-50 text-slate-700 hover:bg-sky-100'
                  }`}
                >
                  {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                </button>
              ))}
            </div>

            {/* Oração Selecionada */}
            {categoriaOracao && (
              <div className="bg-gradient-to-br from-sky-50 to-amber-50 p-8 rounded-2xl">
                <h3 className="text-xl font-semibold text-slate-800 mb-4 capitalize">
                  Oração de {categoriaOracao}
                </h3>
                <p className="text-slate-700 leading-relaxed text-lg mb-6">
                  {oracoes[categoriaOracao][0]}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => compartilharOracao(categoriaOracao, oracoes[categoriaOracao][0])}
                    className="bg-green-500 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center"
                  >
                    <Share2 className="w-5 h-5" />
                    Compartilhar Oração
                  </button>
                  <button 
                    onClick={() => handleFavoritar('oracao', oracoes[categoriaOracao][0], `Oração de ${categoriaOracao}`)}
                    className="bg-amber-500 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center"
                  >
                    <Star className="w-5 h-5" />
                    Favoritar
                  </button>
                  {oracoes[categoriaOracao][1] && (
                    <>
                      <button 
                        onClick={() => compartilharOracao(categoriaOracao, oracoes[categoriaOracao][1])}
                        className="bg-green-400 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center"
                      >
                        <Share2 className="w-5 h-5" />
                        Compartilhar Oração 2
                      </button>
                      <button 
                        onClick={() => handleFavoritar('oracao', oracoes[categoriaOracao][1], `Oração de ${categoriaOracao} (2)`)}
                        className="bg-amber-400 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center"
                      >
                        <Star className="w-5 h-5" />
                        Favoritar 2
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      )}

      {/* Modal de Autenticação */}
      <AuthModal 
        isOpen={mostrarAuthModal}
        onClose={() => setMostrarAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  )
}