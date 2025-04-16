import { Box, Button, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../services/authService'
import { useSnackbar } from '../../hooks/useSnackbar'

type LoginForm = {
  email: string
  password: string
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>()

  const { showSnackbar } = useSnackbar()

  const navigate = useNavigate()
  const { mutate: handleLogin, isPending } = useLoginMutation()

  const onSubmit = (data: LoginForm) => {
    handleLogin(data, {
      onSuccess: () => {
        navigate('/produtos')
      },
      onError: () => {
        showSnackbar('Erro ao atualizar produto!', 'error')
      },
    })
  }

  return (
    <Box
      maxWidth={400}
      mx="auto"
      mt={10}
      p={4}
      display="flex"
      flexDirection="column"
      gap={2}
      boxShadow={3}
      borderRadius={2}
    >
      <Typography variant="h5" textAlign="center">
        Login
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          fullWidth
          {...register('email', { required: 'Campo obrigatório' })}
          error={!!errors.email}
          helperText={errors.email?.message}
          margin="normal"
        />

        <TextField
          label="Senha"
          type="password"
          fullWidth
          {...register('password', { required: 'Campo obrigatório' })}
          error={!!errors.password}
          helperText={errors.password?.message}
          margin="normal"
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={isPending}>
          {isPending ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>

      <Button variant="text" fullWidth onClick={() => navigate('/login')}>
        Ainda não tem conta? Registre-se
      </Button>
    </Box>
  )
}
