import { Box, Button, MenuItem, TextField, Typography, Stack } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { FormData } from './interfaces'
import { schema } from './schema'
import { useRegisterUser } from 'services/userService'
import { useSnackbar } from 'hooks/useSnackbar'
import { useNavigate } from 'react-router-dom'
import { cepMask, cpfMask } from 'utils/form'
import { useAddressByCep } from 'services/cepService'
import { FormWrapper } from 'components/FormWrapper'

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    watch,
    trigger,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      nascimento: dayjs().toDate(),
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const [loading, setLoading] = useState(false)

  const { showSnackbar } = useSnackbar()

  const { mutate: registerUser } = useRegisterUser()

  const cep = watch('cep') || ''
  const { data: addressData, isFetching, isError } = useAddressByCep(cep, !!cep)

  const navigate = useNavigate()

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    await registerUser(data, {
      onSuccess: () => {
        showSnackbar('Usuário registrado com sucesso!', 'success')
      },
      onError: () => {
        showSnackbar('Erro ao registrar usuário.', 'error')
      },
      onSettled: () => {
        setLoading(false)
      },
    })
  }

  useEffect(() => {
    if (isFetching || !addressData) return

    if (addressData.erro || isError) {
      showSnackbar('CEP não encontrado.', 'warning')

      const fieldsToClear = ['cidade', 'estado', 'logradouro', 'bairro']
      fieldsToClear.forEach(field => setValue(field as keyof FormData, ''))
      return
    }

    const fieldsToUpdate: Partial<Record<keyof FormData, string>> = {
      cidade: addressData.localidade,
      estado: addressData.uf,
      logradouro: addressData.logradouro,
      bairro: addressData.bairro,
    }

    Object.entries(fieldsToUpdate).forEach(([field, value]) => {
      setValue(field as keyof FormData, value)
      trigger(field as keyof FormData)
    })
  }, [addressData, isFetching])

  return (
    <FormWrapper>
      <Typography variant="h4" gutterBottom>
        Registro
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <Box display="flex" gap={2}>
            <TextField
              label="Nome"
              fullWidth
              {...register('nome')}
              error={!!errors.nome}
              helperText={errors.nome?.message}
            />
            <TextField
              label="Sobrenome"
              fullWidth
              {...register('sobrenome')}
              error={!!errors.sobrenome}
              helperText={errors.sobrenome?.message}
            />
          </Box>

          <Box display="flex" gap={2}>
            <TextField
              label="CPF"
              fullWidth
              value={cpfMask(watch('cpf') || '')}
              onChange={e => {
                const rawValue = e.target.value.replace(/\D/g, '')
                setValue('cpf', rawValue)
                trigger('cpf')
              }}
              error={!!errors.cpf}
              helperText={errors.cpf?.message}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Box>

          <Box display="flex" gap={2}>
            <TextField
              label="Senha"
              type="password"
              fullWidth
              {...register('senha')}
              error={!!errors.senha}
              helperText={errors.senha?.message}
            />
            <TextField
              label="Sexo"
              select
              fullWidth
              {...register('sexo')}
              error={!!errors.sexo}
              helperText={errors.sexo?.message}
            >
              <MenuItem value="Masculino">Masculino</MenuItem>
              <MenuItem value="Feminino">Feminino</MenuItem>
              <MenuItem value="Outro">Outro</MenuItem>
            </TextField>
          </Box>

          <Controller
            name="nascimento"
            control={control}
            render={({ field: { onChange, value, ...restField } }) => (
              <DatePicker
                label="Data de nascimento"
                value={value ? dayjs(value) : null}
                onChange={date => {
                  onChange(date?.toDate() || null)
                }}
                format="DD/MM/YYYY"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.nascimento,
                    helperText: errors.nascimento?.message,
                  },
                }}
                {...restField}
              />
            )}
          />

          <Box display="flex" gap={2}>
            <TextField
              label="CEP"
              fullWidth
              value={cepMask(watch('cep') || '')}
              onChange={e => {
                const rawCep = e.target.value.replace(/\D/g, '')
                setValue('cep', rawCep)
              }}
              error={!!errors.cep}
              helperText={errors.cep?.message}
            />

            <TextField
              label="Cidade"
              fullWidth
              {...register('cidade')}
              error={!!errors.cidade}
              helperText={errors.cidade?.message}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
                input: {
                  readOnly: !!watch('cidade'),
                },
              }}
            />
            <TextField
              label="Estado"
              fullWidth
              {...register('estado')}
              error={!!errors.estado}
              helperText={errors.estado?.message}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
                input: {
                  readOnly: !!watch('estado'),
                },
              }}
            />
          </Box>

          <Box display="flex" gap={2}>
            <TextField
              label="Logradouro"
              fullWidth
              {...register('logradouro')}
              error={!!errors.logradouro}
              helperText={errors.logradouro?.message}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
                input: {
                  readOnly: !!watch('logradouro'),
                },
              }}
            />
            <TextField
              label="Bairro"
              fullWidth
              {...register('bairro')}
              error={!!errors.bairro}
              helperText={errors.bairro?.message}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
                input: {
                  readOnly: !!watch('bairro'),
                },
              }}
            />
          </Box>

          <TextField
            label="Complemento"
            fullWidth
            {...register('complemento')}
            error={!!errors.complemento}
            helperText={errors.complemento?.message}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />

          <Button type="submit" fullWidth variant="contained" disabled={loading}>
            {loading ? 'Enviando...' : 'Registrar'}
          </Button>
        </Stack>
      </form>
      <Button variant="text" fullWidth onClick={() => navigate('/login')} type="button">
        Já possui uma conta? Faça o login
      </Button>
    </FormWrapper>
  )
}
