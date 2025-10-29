// Versículos bíblicos inspiradores
const versiculos = [
  {
    texto: "Tudo tem o seu tempo determinado, e há tempo para todo propósito debaixo do céu.",
    referencia: "Eclesiastes 3:1"
  },
  {
    texto: "O Senhor é o meu pastor; nada me faltará.",
    referencia: "Salmos 23:1"
  },
  {
    texto: "Posso todas as coisas naquele que me fortalece.",
    referencia: "Filipenses 4:13"
  },
  {
    texto: "Entrega o teu caminho ao Senhor; confia nele, e ele tudo fará.",
    referencia: "Salmos 37:5"
  },
  {
    texto: "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz e não de mal.",
    referencia: "Jeremias 29:11"
  },
  {
    texto: "Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus.",
    referencia: "Isaías 41:10"
  }
]

// Reflexões diárias
const reflexoes = [
  {
    titulo: "Confie no Tempo de Deus",
    texto: "Mesmo quando o caminho parece incerto, Deus continua guiando seus passos. Cada desafio é uma oportunidade de crescimento espiritual."
  },
  {
    titulo: "A Força da Oração",
    texto: "Na oração encontramos paz, direção e força. É o momento sagrado onde nossa alma se conecta com o divino."
  },
  {
    titulo: "Gratidão Transforma",
    texto: "Um coração grato é um coração abençoado. Reconhecer as bênçãos diárias nos aproxima da presença de Deus."
  },
  {
    titulo: "Fé em Meio às Tempestades",
    texto: "As dificuldades não definem nosso destino. Com fé, transformamos obstáculos em degraus para nossa elevação espiritual."
  }
]

// Santos e personagens bíblicos
const santos = [
  {
    nome: "São Francisco de Assis",
    historia: "Conhecido por sua humildade e amor à natureza, São Francisco nos ensina sobre simplicidade e compaixão.",
    licao: "A verdadeira riqueza está em servir aos outros com amor."
  },
  {
    nome: "Davi",
    historia: "O jovem pastor que se tornou rei, enfrentou gigantes com fé inabalável em Deus.",
    licao: "Com Deus ao nosso lado, não há desafio grande demais."
  },
  {
    nome: "Maria, Mãe de Jesus",
    historia: "Exemplo de fé e obediência, aceitou o plano divino com humildade e confiança.",
    licao: "Dizer 'sim' a Deus transforma nossa vida e a de muitos outros."
  }
]

// Orações por categoria
export const oracoes = {
  cura: [
    "Senhor Jesus, fonte de toda cura, toca este corpo e esta alma com Teu amor restaurador. Que Tua paz invada cada célula, cada pensamento, trazendo renovação completa.",
    "Pai celestial, coloco em Tuas mãos esta necessidade de cura. Que Tua vontade seja feita e que eu encontre força na Tua presença."
  ],
  protecao: [
    "Anjo da guarda, meu zeloso guardador, protege-me neste dia de todo mal. Que tua luz ilumine meu caminho e me conduza em segurança.",
    "Senhor, sê meu escudo e fortaleza. Protege-me e aos que amo de todo perigo, físico e espiritual."
  ],
  familia: [
    "Deus de amor, abençoa minha família com união, compreensão e paz. Que nosso lar seja um reflexo do Teu amor.",
    "Senhor, fortalece os laços familiares e nos ajuda a perdoar, amar e apoiar uns aos outros sempre."
  ],
  gratidao: [
    "Obrigado, Senhor, por mais um dia de vida, por cada bênção recebida e por Teu amor incondicional.",
    "Pai celestial, meu coração transborda de gratidão por Tua bondade e misericórdia em minha vida."
  ],
  prosperidade: [
    "Senhor, abençoa o trabalho das minhas mãos e prospera os caminhos que trilho segundo Tua vontade.",
    "Deus provedor, confio em Tua abundância e sabedoria para suprir todas as minhas necessidades."
  ]
}

// Função para obter conteúdo do dia
export function getConteudoDoDia() {
  const hoje = new Date()
  const diaDoAno = Math.floor((hoje.getTime() - new Date(hoje.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))
  
  return {
    versiculo: versiculos[diaDoAno % versiculos.length],
    reflexao: reflexoes[diaDoAno % reflexoes.length],
    santo: santos[diaDoAno % santos.length]
  }
}

// Funções específicas para compartilhar cada tipo de conteúdo
export function compartilharVersiculo(texto: string, referencia: string) {
  const mensagem = `📖 *Versículo do Dia*

"${texto}"

— ${referencia}

🕊️ Encontro Diário com Deus
✨ Que esta palavra abençoe seu dia!`
  
  const url = `https://wa.me/?text=${encodeURIComponent(mensagem)}`
  window.open(url, '_blank')
}

export function compartilharReflexao(titulo: string, texto: string) {
  const mensagem = `💭 *Reflexão do Dia*

*${titulo}*

${texto}

🕊️ Encontro Diário com Deus
🙏 Que esta reflexão toque seu coração!`
  
  const url = `https://wa.me/?text=${encodeURIComponent(mensagem)}`
  window.open(url, '_blank')
}

export function compartilharSanto(nome: string, historia: string, licao: string) {
  const mensagem = `✝️ *Santo do Dia*

*${nome}*

${historia}

💡 *Lição de Fé:*
${licao}

🕊️ Encontro Diário com Deus
🌟 Que este exemplo inspire sua jornada!`
  
  const url = `https://wa.me/?text=${encodeURIComponent(mensagem)}`
  window.open(url, '_blank')
}

export function compartilharOracao(categoria: string, oracao: string) {
  const categoriaFormatada = categoria.charAt(0).toUpperCase() + categoria.slice(1)
  const mensagem = `🙏 *Oração de ${categoriaFormatada}*

${oracao}

🕊️ Encontro Diário com Deus
✨ Que esta oração eleve sua alma a Deus!`
  
  const url = `https://wa.me/?text=${encodeURIComponent(mensagem)}`
  window.open(url, '_blank')
}

// Função genérica para compartilhar (mantida para compatibilidade)
export function compartilharWhatsApp(texto: string, referencia?: string) {
  const mensagem = referencia 
    ? `${texto}\n\n${referencia}\n\n🕊️ Encontro Diário com Deus`
    : `${texto}\n\n🕊️ Encontro Diário com Deus`
  
  const url = `https://wa.me/?text=${encodeURIComponent(mensagem)}`
  window.open(url, '_blank')
}