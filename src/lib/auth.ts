import { supabase } from './supabase'

export interface Usuario {
  id: number
  email: string
  senha?: string
  created_at?: string
}

export interface AuthResponse {
  success: boolean
  message: string
  usuario?: Usuario
  token?: string
}

// Função para hash da senha (compatível com Node.js e browser)
export const hashPassword = async (password: string): Promise<string> => {
  // Verificar se estamos no browser ou servidor
  if (typeof window !== 'undefined') {
    // Browser - usar Web Crypto API
    const encoder = new TextEncoder()
    const data = encoder.encode(password)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  } else {
    // Servidor - usar Node.js crypto
    const crypto = require('crypto')
    return crypto.createHash('sha256').update(password).digest('hex')
  }
}

// Função para verificar senha
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  const passwordHash = await hashPassword(password)
  return passwordHash === hash
}

// Função para gerar token JWT simples (compatível com produção)
export const generateToken = (usuario: Usuario): string => {
  const payload = {
    id: usuario.id,
    email: usuario.email,
    timestamp: Date.now(),
    exp: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 dias
  }
  
  // Em produção, usar uma chave secreta mais robusta
  const secret = process.env.JWT_SECRET || 'fallback-secret-key-for-development'
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payloadEncoded = btoa(JSON.stringify(payload))
  
  // Simular assinatura (em produção, usar biblioteca JWT real)
  const signature = btoa(`${header}.${payloadEncoded}.${secret}`)
  
  return `${header}.${payloadEncoded}.${signature}`
}

// Função para verificar token
export const verifyToken = (token: string): any => {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    
    const payload = JSON.parse(atob(parts[1]))
    
    // Verificar se token não expirou
    if (Date.now() > payload.exp) {
      return null
    }
    
    return payload
  } catch (error) {
    return null
  }
}

// Função para salvar token no localStorage (apenas no browser)
const saveToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token)
  }
}

// Função para obter token do localStorage (apenas no browser)
const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token')
  }
  return null
}

// Função para remover token
const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token')
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

    // Inserir usuário com timestamp atual
    const agora = new Date().toISOString()
    const { data: novoUsuario, error } = await supabase
      .from('usuarios')
      .insert([
        {
          email,
          senha: senhaHash,
          created_at: agora
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

    // Salvar token
    saveToken(token)

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
      // Gerar token
      const token = generateToken(usuario)
      saveToken(token)

      return {
        success: true,
        message: 'Login de admin realizado com sucesso!',
        usuario,
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

    // Gerar token
    const token = generateToken(usuario)

    // Salvar token
    saveToken(token)

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
  removeToken()
}

// Função para obter usuário atual
export const obterUsuarioAtual = async (): Promise<Usuario | null> => {
  try {
    const token = getToken()
    
    if (!token) {
      return null
    }

    const decoded = verifyToken(token)
    
    if (!decoded) {
      removeToken()
      return null
    }

    // Buscar dados atualizados do usuário
    const { data: usuario, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', decoded.id)
      .single()

    if (error || !usuario) {
      removeToken()
      return null
    }

    return usuario

  } catch (error) {
    console.error('Erro ao obter usuário atual:', error)
    removeToken()
    return null
  }
}

// Função para verificar se usuário é premium (simplificada)
export const usuarioEhPremium = (usuario: Usuario | null): boolean => {
  if (!usuario) return false
  
  // Admin sempre tem acesso
  if (usuario.email === 'admin@admin.com') return true
  
  // Para novos usuários, dar 7 dias gratuitos
  if (usuario.created_at) {
    const dataCriacao = new Date(usuario.created_at)
    const agora = new Date()
    const diasDesdeRegistro = (agora.getTime() - dataCriacao.getTime()) / (1000 * 60 * 60 * 24)
    
    // Se foi criado há menos de 7 dias, é premium
    return diasDesdeRegistro <= 7
  }
  
  return false
}

// Função para registrar pagamento (simplificada)
export const registrarPagamento = async (usuarioId: number, valor: number, referenciaExterna?: string): Promise<boolean> => {
  try {
    // Para esta versão simplificada, apenas retorna true
    console.log(`Pagamento registrado para usuário ${usuarioId}: R$ ${valor}`)
    return true

  } catch (error) {
    console.error('Erro ao registrar pagamento:', error)
    return false
  }
}

// Função para confirmar pagamento (simplificada)
export const confirmarPagamento = async (usuarioId: number): Promise<boolean> => {
  try {
    console.log(`Pagamento confirmado para usuário ${usuarioId}`)
    return true

  } catch (error) {
    console.error('Erro ao confirmar pagamento:', error)
    return false
  }
}