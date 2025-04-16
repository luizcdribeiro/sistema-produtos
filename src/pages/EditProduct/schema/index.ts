import * as yup from 'yup'

export const schema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  preco: yup.string().required('Preço é obrigatório'),
  marca: yup.string().required('Marca é obrigatória'),
  avatar: yup.string().required('Imagem é obrigatória'),
  qt_estoque: yup.number().required('Quantidade do estoque é obrigatória'),
  qt_vendas: yup.number().required('Quantidade de vendas é obrigatória'),
  createdAt: yup.string().required('Campo obrigatório'),
  id: yup.string(),
})
