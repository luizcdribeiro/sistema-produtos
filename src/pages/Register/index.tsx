import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Stack,
  AlertColor,
  Snackbar,
  Alert,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useState } from 'react'
import dayjs from 'dayjs'
import { FormData } from './interfaces'
import { schema } from './schema'
import { useRegisterUser } from '../../services/useService'

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      nascimento: dayjs().toDate(),
    },
  })

  const [loading, setLoading] = useState(false)

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success')

  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setOpenSnackbar(true)
  }

  const { mutateAsync: registerUser } = useRegisterUser()

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await registerUser(data)
      showSnackbar('Usuário registrado com sucesso!', 'success')
    } catch {
      showSnackbar('Erro ao registrar usuário.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleCEP = async (cep: string) => {
    if (cep.length === 8) {
      try {
        const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json`)

        if (data.erro) {
          showSnackbar('CEP não encontrado.', 'warning')
          setValue('cidade', '')
          setValue('estado', '')
          setValue('logradouro', '')
          setValue('bairro', '')
          return
        }

        setValue('cidade', data.localidade)
        setValue('estado', data.uf)
        setValue('logradouro', data.logradouro)
        setValue('bairro', data.bairro)
      } catch {
        showSnackbar('Erro ao buscar endereço pelo CEP.', 'error')
      }
    }
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 4 }}>
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
              {...register('cpf')}
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
              {...register('cep')}
              onChange={e => {
                const value = e.target.value.replace(/\D/g, '')
                setValue('cep', value)
                handleCEP(value)
              }}
              error={!!errors.cep}
              helperText={errors.cep?.message}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
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

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}
