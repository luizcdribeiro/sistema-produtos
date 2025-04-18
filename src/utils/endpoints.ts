export const endpoints = {
  postRegisterUser: () => `${process.env.REACT_APP_API_BASE_URL}/user`,
  getCep: (cep: string) => `${process.env.REACT_APP_VIACEP_URL}/${cep}/json`,
  getUser: (email: string) => `${process.env.REACT_APP_API_BASE_URL}/user?search=${email}`,
  getProducts: () => `${process.env.REACT_APP_API_BASE_URL}/produto`,
  getProduct: (id: string) => `${process.env.REACT_APP_API_BASE_URL}/produto/${id}`,
  deleteProduct: (id: string) => `${process.env.REACT_APP_API_BASE_URL}/produto/${id}`,
  editProduct: (id: string) => `${process.env.REACT_APP_API_BASE_URL}/produto/${id}`,
}
