import { supabase } from './supabase'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Cookies from 'js-cookie'

const JWT_SECRET = process.env.JWT_SECRET || 'seu-jwt-secret-aqui'

export interface Usuario {
  id: number
  email: string
  nome?: string
  tipo_conta?: string
  status_pagamento?: string
  data_pagamento?: string
  data_expiracao?: string
}

export interface AuthResponse {
  success: boolean
  message: string
  usuario?: Usuario
  token?: string
}

// Função para hash da senha
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

// Função para verificar senha
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash)
}

// Função para gerar JWT
export const generateToken = (usuario: Usuario): string => {
  return jwt.sign(
    { 
      id: usuario.id, 
      email: usuario.email, 
      tipo_conta: usuario.tipo_conta || 'free' 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

// Função para verificar JWT
export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

// Função para criar conta
export const criarConta = async (email: string, senha: string, nome?: string): Promise<AuthResponse> => {
  try {
    // Verificar se email já existe
    const { data: usuarioExistente } = await supabase
      .from('usuarios')
      .select('id')
      .eq('email', email)
      .single()

    if (usuarioExistente) {
      return {
        success: false,
        message: 'Email já cadastrado!'
      }
    }

    // Hash da senha
    const senhaHash = await hashPassword(senha)

    // Calcular data de expiração (7 dias gratuitos)
    const dataExpiracao = new Date()
    dataExpiracao.setDate(dataExpiracao.getDate() + 7)

    // Inserir usuário com 7 dias gratuitos
    const { data: novoUsuario, error } = await supabase
      .from('usuarios')
      .insert([
        {
          email,
          senha: senhaHash,
          nome: nome || email.split('@')[0],
          tipo_conta: 'premium', // 7 dias gratuitos como premium
          status_pagamento: 'trial', // Status de trial
          data_expiracao: dataExpiracao.toISOString()
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Erro ao criar usuário:', error)
      return {
        success: false,
        message: 'Erro ao criar conta. Tente novamente.'
      }
    }

    // Gerar token
    const token = generateToken(novoUsuario)

    // Salvar token no cookie
    Cookies.set('auth_token', token, { expires: 7 })

    return {
      success: true,
      message: 'Conta criada com sucesso! Você tem 7 dias gratuitos.',
      usuario: novoUsuario,
      token
    }

  } catch (error) {
    console.error('Erro ao criar conta:', error)
    return {
      success: false,
      message: 'Erro interno. Tente novamente.'
    }
  }
}

// Função para fazer login
export const fazerLogin = async (email: string, senha: string): Promise<AuthResponse> => {
  try {
    // Buscar usuário
    const { data: usuario, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !usuario) {
      return {
        success: false,
        message: 'Email ou senha incorretos!'
      }
    }

    // Verificar se é admin (senha não criptografada)
    if (email === 'admin@admin.com' && senha === 'admin24') {
      // Atualizar admin para ter acesso completo
      const { data: adminAtualizado } = await supabase
        .from('usuarios')
        .update({
          tipo_conta: 'admin',
          status_pagamento: 'pago'
        })
        .eq('id', usuario.id)
        .select()
        .single()

      const usuarioAdmin = adminAtualizado || { ...usuario, tipo_conta: 'admin', status_pagamento: 'pago' }
      
      // Gerar token
      const token = generateToken(usuarioAdmin)
      Cookies.set('auth_token', token, { expires: 7 })

      return {
        success: true,
        message: 'Login de admin realizado com sucesso!',
        usuario: usuarioAdmin,
        token
      }
    }

    // Verificar senha para usuários normais
    const senhaValida = await verifyPassword(senha, usuario.senha)

    if (!senhaValida) {
      return {
        success: false,
        message: 'Email ou senha incorretos!'
      }
    }

    // Verificar se trial expirou
    if (usuario.tipo_conta === 'premium' && usuario.status_pagamento === 'trial') {
      const dataExpiracao = new Date(usuario.data_expiracao)
      const agora = new Date()
      
      if (dataExpiracao < agora) {
        // Trial expirou, atualizar para free
        const { data: usuarioAtualizado } = await supabase
          .from('usuarios')
          .update({
            tipo_conta: 'free',
            status_pagamento: 'pendente'
          })
          .eq('id', usuario.id)
          .select()
          .single()

        usuario.tipo_conta = 'free'
        usuario.status_pagamento = 'pendente'
      }
    }

    // Gerar token
    const token = generateToken(usuario)

    // Salvar token no cookie
    Cookies.set('auth_token', token, { expires: 7 })

    return {
      success: true,
      message: 'Login realizado com sucesso!',
      usuario,
      token
    }

  } catch (error) {
    console.error('Erro ao fazer login:', error)
    return {
      success: false,
      message: 'Erro interno. Tente novamente.'
    }
  }
}

// Função para logout
export const fazerLogout = (): void => {
  Cookies.remove('auth_token')
}

// Função para obter usuário atual
export const obterUsuarioAtual = async (): Promise<Usuario | null> => {
  try {
    const token = Cookies.get('auth_token')
    
    if (!token) {
      return null
    }

    const decoded = verifyToken(token)
    
    if (!decoded) {
      Cookies.remove('auth_token')
      return null
    }

    // Buscar dados atualizados do usuário
    const { data: usuario, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', decoded.id)
      .single()

    if (error || !usuario) {
      Cookies.remove('auth_token')
      return null
    }

    // Verificar se trial expirou
    if (usuario.tipo_conta === 'premium' && usuario.status_pagamento === 'trial' && usuario.data_expiracao) {
      const dataExpiracao = new Date(usuario.data_expiracao)
      const agora = new Date()
      
      if (dataExpiracao < agora) {
        // Trial expirou, atualizar para free
        await supabase
          .from('usuarios')
          .update({
            tipo_conta: 'free',
            status_pagamento: 'pendente'
          })
          .eq('id', usuario.id)

        usuario.tipo_conta = 'free'
        usuario.status_pagamento = 'pendente'
      }
    }

    return usuario

  } catch (error) {
    console.error('Erro ao obter usuário atual:', error)
    Cookies.remove('auth_token')
    return null
  }
}

// Função para verificar se usuário é premium
export const usuarioEhPremium = (usuario: Usuario | null): boolean => {
  if (!usuario) return false
  
  // Admin sempre tem acesso
  if (usuario.tipo_conta === 'admin') return true
  
  // Verificar se é premium e pagamento está ativo
  if (usuario.tipo_conta === 'premium') {
    // Se está em trial, verificar se não expirou
    if (usuario.status_pagamento === 'trial' && usuario.data_expiracao) {
      const dataExpiracao = new Date(usuario.data_expiracao)
      const agora = new Date()
      return dataExpiracao > agora
    }
    
    // Se pagamento foi aprovado
    if (usuario.status_pagamento === 'pago') {
      // Verificar se não expirou (se houver data de expiração)
      if (usuario.data_expiracao) {
        const dataExpiracao = new Date(usuario.data_expiracao)
        const agora = new Date()
        return dataExpiracao > agora
      }
      return true
    }
  }
  
  return false
}

// Função para registrar pagamento
export const registrarPagamento = async (usuarioId: number, valor: number, referenciaExterna?: string): Promise<boolean> => {
  try {
    // Inserir pagamento
    const { error: errorPagamento } = await supabase
      .from('pagamentos')
      .insert([
        {
          usuario_id: usuarioId,
          valor,
          status: 'pendente',
          metodo_pagamento: 'pagbank',
          referencia_externa: referenciaExterna
        }
      ])

    if (errorPagamento) {
      console.error('Erro ao registrar pagamento:', errorPagamento)
      return false
    }

    return true

  } catch (error) {
    console.error('Erro ao registrar pagamento:', error)
    return false
  }
}

// Função para confirmar pagamento (webhook)
export const confirmarPagamento = async (usuarioId: number): Promise<boolean> => {
  try {
    // Atualizar status do pagamento
    const { error: errorPagamento } = await supabase
      .from('pagamentos')
      .update({ 
        status: 'aprovado',
        data_pagamento: new Date().toISOString()
      })
      .eq('usuario_id', usuarioId)
      .eq('status', 'pendente')

    if (errorPagamento) {
      console.error('Erro ao confirmar pagamento:', errorPagamento)
      return false
    }

    // Atualizar usuário para premium com 1 mês de acesso
    const dataExpiracao = new Date()
    dataExpiracao.setMonth(dataExpiracao.getMonth() + 1)

    const { error: errorUsuario } = await supabase
      .from('usuarios')
      .update({
        tipo_conta: 'premium',
        status_pagamento: 'pago',
        data_pagamento: new Date().toISOString(),
        data_expiracao: dataExpiracao.toISOString()
      })
      .eq('id', usuarioId)

    if (errorUsuario) {
      console.error('Erro ao atualizar usuário:', errorUsuario)
      return false
    }

    return true

  } catch (error) {
    console.error('Erro ao confirmar pagamento:', error)
    return false
  }
}