import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { FormData } from '../../pages/Register/interfaces'
import { endpoints } from '../../utils/endpoints'

export const registerUser = async (data: FormData) => {
  return axios.post(endpoints.postRegisterUser(), data)
}

export const useRegisterUser = () =>
  useMutation({
    mutationFn: registerUser,
  })
