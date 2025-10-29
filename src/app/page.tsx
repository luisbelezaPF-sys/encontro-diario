'use client'

import { useState } from 'react'
import { Heart, BookOpen, Users, Crown, Share2 } from 'lucide-react'
import { 
  getConteudoDoDia, 
  oracoes, 
  compartilharVersiculo,
  compartilharReflexao,
  compartilharSanto,
  compartilharOracao
} from '@/lib/conteudo'

export default function Home() {
  const [paginaAtual, setPaginaAtual] = useState<'home' | 'painel' | 'sobre'>('home')
  const [categoriaOracao, setCategoriaOracao] = useState<keyof typeof oracoes | null>(null)
  
  const conteudoDoDia = getConteudoDoDia()

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
            <nav className="hidden md:flex gap-6">
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
              Um espaço sagrado de fé, reflexão e comunhão.
            </p>
          </div>

          {/* Botões principais */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              onClick={() => setPaginaAtual('painel')}
              className="bg-gradient-to-r from-sky-500 to-sky-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              🕊️ Entrar no Painel
            </button>
            <button className="bg-white text-slate-700 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl border border-sky-200 hover:border-sky-300 transform hover:scale-105 transition-all duration-300">
              👤 Criar Conta
            </button>
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
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Reflexões Diárias</h3>
              <p className="text-slate-600">Mensagens inspiradoras e versículos bíblicos para fortalecer sua fé todos os dias.</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-sky-100">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Orações Guiadas</h3>
              <p className="text-slate-600">Orações organizadas por categorias: cura, proteção, família, gratidão e prosperidade.</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-sky-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Comunidade de Fé</h3>
              <p className="text-slate-600">Compartilhe versículos e mensagens inspiradoras com seus entes queridos.</p>
            </div>
          </div>
        </main>
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
                  <span className="text-amber-500 text-xl">✨</span>
                  <span>Reflexões diárias inspiradas na Palavra de Deus</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 text-xl">🙏</span>
                  <span>Orações organizadas por necessidades específicas</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 text-xl">📖</span>
                  <span>Versículos bíblicos selecionados para cada dia</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 text-xl">✝️</span>
                  <span>Histórias de santos e personagens bíblicos</span>
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
          <div className="flex gap-4">
            <button 
              onClick={() => setPaginaAtual('sobre')}
              className="text-slate-600 hover:text-sky-600 transition-colors"
            >
              Sobre
            </button>
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
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Saudação */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Paz e bênçãos! 🕊️
          </h1>
          <p className="text-lg text-slate-600">
            {new Date().toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Versículo do Dia */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-sky-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-sky-500 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Versículo do Dia</h2>
            </div>
            <blockquote className="text-lg text-slate-700 italic mb-4 leading-relaxed">
              "{conteudoDoDia.versiculo.texto}"
            </blockquote>
            <p className="text-sky-600 font-semibold mb-6">— {conteudoDoDia.versiculo.referencia}</p>
            <button 
              onClick={() => compartilharVersiculo(conteudoDoDia.versiculo.texto, conteudoDoDia.versiculo.referencia)}
              className="bg-green-500 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 w-full justify-center"
            >
              <Share2 className="w-5 h-5" />
              Compartilhar Versículo
            </button>
          </div>

          {/* Reflexão do Dia */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-sky-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Reflexão do Dia</h2>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-4">{conteudoDoDia.reflexao.titulo}</h3>
            <p className="text-slate-700 leading-relaxed mb-6">{conteudoDoDia.reflexao.texto}</p>
            <button 
              onClick={() => compartilharReflexao(conteudoDoDia.reflexao.titulo, conteudoDoDia.reflexao.texto)}
              className="bg-green-500 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 w-full justify-center"
            >
              <Share2 className="w-5 h-5" />
              Compartilhar Reflexão
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
          <div className="mt-6 text-center">
            <button 
              onClick={() => compartilharSanto(conteudoDoDia.santo.nome, conteudoDoDia.santo.historia, conteudoDoDia.santo.licao)}
              className="bg-green-500 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <Share2 className="w-5 h-5" />
              Compartilhar Santo do Dia
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
                {oracoes[categoriaOracao][1] && (
                  <button 
                    onClick={() => compartilharOracao(categoriaOracao, oracoes[categoriaOracao][1])}
                    className="bg-green-400 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center"
                  >
                    <Share2 className="w-5 h-5" />
                    Compartilhar Oração 2
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Call to Action Premium */}
        <div className="mt-8 bg-gradient-to-r from-amber-400 to-amber-600 rounded-3xl shadow-xl p-8 text-white text-center">
          <Crown className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Área Premium</h2>
          <div className="text-3xl font-bold mb-4 bg-white/20 inline-block px-6 py-2 rounded-2xl">
            R$ 19,90
          </div>
          <p className="text-lg mb-6 opacity-90">
            Acesse orações guiadas em áudio, mensagens exclusivas e reflexões mais profundas sobre fé e superação.
          </p>
          <button 
            onClick={() => window.open('https://pag.ae/81aj-zE2K', '_blank')}
            className="bg-white text-amber-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Assinar Agora - R$ 19,90
          </button>
        </div>
      </main>
    </div>
  )
}