import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { endpoints } from 'utils/endpoints'
import queryClient from 'utils/queryClient'
import { Product } from './interfaces'

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['produtos'],
    queryFn: async () => {
      const { data } = await axios.get<Product[]>(endpoints.getProducts())
      return data
    },
  })
}

export const useProduct = (id: string) => {
  return useQuery<Product>({
    queryKey: ['produto', id],
    queryFn: async () => {
      const { data } = await axios.get<Product>(endpoints.getProduct(id))
      return data
    },
    enabled: !!id,
  })
}

export const useDeleteProduct = () => {
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
      await axios.put(endpoints.editProduct(product.id as string), product)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['produtos'] })
    },
  })
}
