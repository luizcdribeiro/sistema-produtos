import { Box, Button, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../services/authService'
import { useSnackbar } from '../../hooks/useSnackbar'
import { FormWrapper } from '../../components/FormWrapper'
import { LoginForm } from './interfaces'

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
        showSnackbar('Email ou senha incorretos, tente novamente!', 'error')
      },
    })
  }

  return (
    <Box mt={10}>
      <FormWrapper>
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

        <Button variant="text" fullWidth onClick={() => navigate('/register')}>
          Ainda não tem conta? Registre-se
        </Button>
      </FormWrapper>
    </Box>
  )
}
