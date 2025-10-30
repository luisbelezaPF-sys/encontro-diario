import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
export interface Versiculo {
  id?: number
  referencia: string
  texto: string
  fonte: string
  data_criacao?: string
  user_id?: string
}

export interface Favorito {
  id?: number
  user_id: string
  tipo: 'versiculo' | 'reflexao' | 'santo' | 'oracao'
  conteudo: string
  referencia?: string
  data_criacao?: string
}

export interface HistoricoUsuario {
  id?: number
  user_id: string
  data_acesso: string
  versiculo_id?: number
  acao: string
}