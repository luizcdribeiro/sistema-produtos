import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { endpoints } from '../utils/endpoints'

type ViaCepResponse = {
  erro?: boolean
  localidade: string
  uf: string
  logradouro: string
  bairro: string
}

export const fetchAddressByCep = async (cep: string): Promise<ViaCepResponse> => {
  const { data } = await axios.get(endpoints.getCep(cep))
  return data
}

export const useAddressByCep = (cep: string, enabled = false) =>
  useQuery({
    queryKey: ['cep', cep],
    queryFn: () => fetchAddressByCep(cep),
    enabled: enabled && cep.length === 8,
  })
