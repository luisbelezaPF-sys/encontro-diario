import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
export interface User {
  id: string
  nome: string
  email: string
  status_assinatura: 'ativo' | 'inativo'
  created_at: string
}

export interface Conteudo {
  id: string
  tipo: 'reflexao' | 'oracao' | 'versiculo' | 'santo'
  titulo: string
  texto: string
  categoria?: string
  data: string
  premium: boolean
}

export interface Assinatura {
  id: string
  user_id: string
  data_pagamento: string
  status: 'ativo' | 'cancelado' | 'pendente'
}