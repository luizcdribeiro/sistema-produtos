export type User = {
  id: string
  email: string
  senha: string
  token: string
  nome: string
  image: string
}

export type LoginInput = {
  email: string
  password: string
}
