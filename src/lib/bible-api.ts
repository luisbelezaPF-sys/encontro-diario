import axios from 'axios'
import { supabase, type Versiculo } from './supabase'

// Lista de versículos para rotação diária (fallback)
const versiculosFallback = [
  { referencia: "João 3:16", texto: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna." },
  { referencia: "Filipenses 4:13", texto: "Posso todas as coisas naquele que me fortalece." },
  { referencia: "Salmos 23:1", texto: "O Senhor é o meu pastor; nada me faltará." },
  { referencia: "Jeremias 29:11", texto: "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz e não de mal, para vos dar o fim que esperais." },
  { referencia: "Isaías 41:10", texto: "Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça." },
  { referencia: "Romanos 8:28", texto: "E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito." },
  { referencia: "Mateus 11:28", texto: "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei." },
  { referencia: "Salmos 46:10", texto: "Aquietai-vos e sabei que eu sou Deus; serei exaltado entre os gentios; serei exaltado sobre a terra." },
  { referencia: "1 Coríntios 13:4", texto: "O amor é sofredor, é benigno; o amor não é invejoso; o amor não trata com leviandade, não se ensoberbece." },
  { referencia: "Efésios 2:8", texto: "Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus." },
  { referencia: "2 Coríntios 5:17", texto: "Assim que, se alguém está em Cristo, nova criatura é; as coisas velhas já passaram; eis que tudo se fez novo." },
  { referencia: "Provérbios 3:5-6", texto: "Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas." },
  { referencia: "1 Pedro 5:7", texto: "Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós." },
  { referencia: "Hebreus 11:1", texto: "Ora, a fé é o firme fundamento das coisas que se esperam, e a prova das coisas que se não veem." },
  { referencia: "Gálatas 2:20", texto: "Já estou crucificado com Cristo; e vivo, não mais eu, mas Cristo vive em mim; e a vida que agora vivo na carne, vivo-a na fé do Filho de Deus, o qual me amou, e se entregou a si mesmo por mim." }
]

// Mapeamento de traduções inglês -> português para referências comuns
const traducaoReferencias: { [key: string]: string } = {
  'John': 'João',
  'Matthew': 'Mateus',
  'Mark': 'Marcos',
  'Luke': 'Lucas',
  'Acts': 'Atos',
  'Romans': 'Romanos',
  '1 Corinthians': '1 Coríntios',
  '2 Corinthians': '2 Coríntios',
  'Galatians': 'Gálatas',
  'Ephesians': 'Efésios',
  'Philippians': 'Filipenses',
  'Colossians': 'Colossenses',
  '1 Thessalonians': '1 Tessalonicenses',
  '2 Thessalonians': '2 Tessalonicenses',
  '1 Timothy': '1 Timóteo',
  '2 Timothy': '2 Timóteo',
  'Titus': 'Tito',
  'Philemon': 'Filemom',
  'Hebrews': 'Hebreus',
  'James': 'Tiago',
  '1 Peter': '1 Pedro',
  '2 Peter': '2 Pedro',
  '1 John': '1 João',
  '2 John': '2 João',
  '3 John': '3 João',
  'Jude': 'Judas',
  'Revelation': 'Apocalipse',
  'Genesis': 'Gênesis',
  'Exodus': 'Êxodo',
  'Leviticus': 'Levítico',
  'Numbers': 'Números',
  'Deuteronomy': 'Deuteronômio',
  'Joshua': 'Josué',
  'Judges': 'Juízes',
  'Ruth': 'Rute',
  '1 Samuel': '1 Samuel',
  '2 Samuel': '2 Samuel',
  '1 Kings': '1 Reis',
  '2 Kings': '2 Reis',
  '1 Chronicles': '1 Crônicas',
  '2 Chronicles': '2 Crônicas',
  'Ezra': 'Esdras',
  'Nehemiah': 'Neemias',
  'Esther': 'Ester',
  'Job': 'Jó',
  'Psalms': 'Salmos',
  'Proverbs': 'Provérbios',
  'Ecclesiastes': 'Eclesiastes',
  'Song of Solomon': 'Cantares',
  'Isaiah': 'Isaías',
  'Jeremiah': 'Jeremias',
  'Lamentations': 'Lamentações',
  'Ezekiel': 'Ezequiel',
  'Daniel': 'Daniel',
  'Hosea': 'Oséias',
  'Joel': 'Joel',
  'Amos': 'Amós',
  'Obadiah': 'Obadias',
  'Jonah': 'Jonas',
  'Micah': 'Miquéias',
  'Nahum': 'Naum',
  'Habakkuk': 'Habacuque',
  'Zephaniah': 'Sofonias',
  'Haggai': 'Ageu',
  'Zechariah': 'Zacarias',
  'Malachi': 'Malaquias'
}

// Função para traduzir referência do inglês para português
function traduzirReferencia(referenciaIngles: string): string {
  let referenciaPortugues = referenciaIngles
  
  Object.entries(traducaoReferencias).forEach(([ingles, portugues]) => {
    referenciaPortugues = referenciaPortugues.replace(new RegExp(ingles, 'gi'), portugues)
  })
  
  return referenciaPortugues
}

// Função para buscar versículo do dia da Bible-API.com
async function buscarVersiculoBibleAPI(): Promise<Versiculo | null> {
  try {
    // SIMULAÇÃO DE MUDANÇA DE DIA: Adicionando +1 ao cálculo
    const hoje = new Date()
    const diaDoAno = Math.floor((hoje.getTime() - new Date(hoje.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))
    const diaSimulado = (diaDoAno + 1) % versiculosFallback.length
    const versiculoSelecionado = versiculosFallback[diaSimulado]
    
    // Como a Bible-API.com retorna em inglês, vamos usar diretamente nosso banco em português
    // que é mais confiável e já está traduzido corretamente
    return {
      referencia: versiculoSelecionado.referencia,
      texto: versiculoSelecionado.texto,
      fonte: 'local-português'
    }
    
  } catch (error) {
    console.log('Erro ao buscar da Bible-API:', error)
    return null
  }
}

// Função para buscar versículo usando fallback local
function obterVersiculoFallback(): Versiculo {
  // SIMULAÇÃO DE MUDANÇA DE DIA: Adicionando +1 ao cálculo
  const hoje = new Date()
  const diaDoAno = Math.floor((hoje.getTime() - new Date(hoje.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))
  const diaSimulado = (diaDoAno + 1) % versiculosFallback.length
  const versiculo = versiculosFallback[diaSimulado]
  
  return {
    referencia: versiculo.referencia,
    texto: versiculo.texto,
    fonte: 'local'
  }
}

// Função principal para obter versículo do dia
export async function obterVersiculoDoDia(): Promise<Versiculo> {
  try {
    // Primeiro tenta buscar da API (que agora usa nosso banco em português)
    const versiculoAPI = await buscarVersiculoBibleAPI()
    
    if (versiculoAPI) {
      return versiculoAPI
    }
    
    // Se falhar, usa o fallback local
    return obterVersiculoFallback()
    
  } catch (error) {
    console.log('Erro geral ao obter versículo:', error)
    return obterVersiculoFallback()
  }
}

// Função para salvar versículo no Supabase
export async function salvarVersiculoNoBanco(versiculo: Versiculo, userId?: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('versiculos_diarios')
      .upsert({
        referencia: versiculo.referencia,
        texto: versiculo.texto,
        fonte: versiculo.fonte,
        data_criacao: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        user_id: userId || null
      }, {
        onConflict: 'data_criacao'
      })
    
    if (error) {
      console.log('Erro ao salvar versículo no Supabase:', error)
    }
  } catch (error) {
    console.log('Erro ao conectar com Supabase:', error)
  }
}

// Função para salvar favorito
export async function salvarFavorito(
  tipo: 'versiculo' | 'reflexao' | 'santo' | 'oracao',
  conteudo: string,
  referencia?: string,
  userId?: string
): Promise<boolean> {
  try {
    if (!userId) {
      console.log('Usuário não autenticado')
      return false
    }
    
    const { error } = await supabase
      .from('favoritos')
      .insert({
        user_id: userId,
        tipo,
        conteudo,
        referencia: referencia || null,
        data_criacao: new Date().toISOString()
      })
    
    if (error) {
      console.log('Erro ao salvar favorito:', error)
      return false
    }
    
    return true
  } catch (error) {
    console.log('Erro ao salvar favorito:', error)
    return false
  }
}

// Função para registrar histórico de acesso
export async function registrarHistorico(acao: string, userId?: string, versiculoId?: number): Promise<void> {
  try {
    if (!userId) return
    
    const { error } = await supabase
      .from('historico_usuarios')
      .insert({
        user_id: userId,
        data_acesso: new Date().toISOString(),
        versiculo_id: versiculoId || null,
        acao
      })
    
    if (error) {
      console.log('Erro ao registrar histórico:', error)
    }
  } catch (error) {
    console.log('Erro ao registrar histórico:', error)
  }
}

// Função para obter favoritos do usuário
export async function obterFavoritos(userId: string, tipo?: string) {
  try {
    let query = supabase
      .from('favoritos')
      .select('*')
      .eq('user_id', userId)
      .order('data_criacao', { ascending: false })
    
    if (tipo) {
      query = query.eq('tipo', tipo)
    }
    
    const { data, error } = await query
    
    if (error) {
      console.log('Erro ao obter favoritos:', error)
      return []
    }
    
    return data || []
  } catch (error) {
    console.log('Erro ao obter favoritos:', error)
    return []
  }
}