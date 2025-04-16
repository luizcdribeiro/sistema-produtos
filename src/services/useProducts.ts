import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { endpoints } from '../utils/endpoints'
import queryClient from '../utils/queryClient'

export type Product = {
  avatar: string
  createdAt: string
  id?: string
  marca: string
  nome: string
  preco: string
  qt_estoque: number
  qt_vendas: number
}

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['produtos'],
    queryFn: async () => {
      const { data } = await axios.get<Product[]>(endpoints.getProducts())
      return data
    },
  })
}

export const useProduto = (id: string) => {
  return useQuery<Product>({
    queryKey: ['produto', id],
    queryFn: async () => {
      const { data } = await axios.get<Product>(endpoints.getProduct(id))
      return data
    },
    enabled: !!id,
  })
}

export const useDeleteProduto = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(endpoints.deleteProduct(id))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['produtos'] })
    },
  })
}

export const useEditProduct = () => {
  return useMutation({
    mutationFn: async (product: Product) => {
      // Enviar o produto no corpo da requisição PUT
      await axios.put(endpoints.editProduct(product.id as string), product)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['produtos'] })
    },
  })
}
