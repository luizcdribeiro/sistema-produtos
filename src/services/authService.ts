import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '../context/AuthContext'
import { endpoints } from '../utils/endpoints'

export type User = {
  id: string
  email: string
  senha: string
  token: string
  nome: string
  image: string
}

type LoginInput = {
  email: string
  password: string
}

export const loginUser = async ({
  email,
  password,
}: LoginInput): Promise<User | { error: string }> => {
  const { data } = await axios.get<User[]>(endpoints.getUser(email))

  const user = data?.[0]

  if (!user) return { error: 'Usuário não encontrado.' }
  if (user.senha !== password) return { error: 'Senha incorreta.' }

  return user
}

export const useLoginMutation = () => {
  const { login } = useAuth()

  return useMutation({
    mutationFn: loginUser,
    onSuccess: user => {
      if ('error' in user) return

      login(user)
      localStorage.setItem('token', user.token)
      console.log('User logged in:', user)
    },
  })
}
