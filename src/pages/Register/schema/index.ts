import * as yup from 'yup'
import { isValidCPF } from '../../../utils/form'

export const schema = yup.object({
  nome: yup.string().required('Campo obrigatório'),
  sobrenome: yup.string().required('Campo obrigatório'),
  cpf: yup
    .string()
    .required('Campo obrigatório')
    .test('is-valid-cpf', 'CPF inválido', value => isValidCPF(value || '')),
  email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
  senha: yup.string().required('Campo obrigatório'),
  sexo: yup.string().required('Campo obrigatório'),
  nascimento: yup.date().required('Campo obrigatório'),
  cep: yup.string().required('Campo obrigatório'),
  cidade: yup.string().required('Campo obrigatório'),
  estado: yup.string().required('Campo obrigatório'),
  logradouro: yup.string().required('Campo obrigatório'),
  bairro: yup.string().required('Campo obrigatório'),
  complemento: yup.string().required('Campo obrigatório'),
})
