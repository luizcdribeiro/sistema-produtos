export interface User {
  id: string
  nome: string
  email: string
  token: string
  image: string
}

export interface AuthContextProps {
  user: User | null
  login: (user: User) => void
  logout: () => void
}
