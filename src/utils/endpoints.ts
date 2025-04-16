export const endpoints = {
  postRegisterUser: () => 'https://6256fc506ea7037005434e84.mockapi.io/api/v1/user',
  getCep: (cep: string) => `https://viacep.com.br/ws/${cep}/json`,
  getUser: (email: string) =>
    `https://6256fc506ea7037005434e84.mockapi.io/api/v1/user?search=${email}`,
  getProducts: () => 'https://6256fc506ea7037005434e84.mockapi.io/api/v1/produto',
  getProduct: (id: string) => `https://6256fc506ea7037005434e84.mockapi.io/api/v1/produto/${id}`,
  deleteProduct: (id: string) => `https://6256fc506ea7037005434e84.mockapi.io/api/v1/produto/${id}`,
  editProduct: (id: string) => `https://6256fc506ea7037005434e84.mockapi.io/api/v1/produto/${id}`,
}
