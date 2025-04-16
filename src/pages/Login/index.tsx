import { Box, Button, Snackbar, TextField, Typography, Alert } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useLoginMutation } from '../../services/authService'

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

  const navigate = useNavigate()
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error' as 'error' | 'success' | 'warning',
  })

  const { mutate: handleLogin, isPending } = useLoginMutation()

  const onSubmit = (data: LoginForm) => {
    handleLogin(data, {
      onSuccess: () => {
        navigate('/produtos')
      },
      onError: () => {
        setSnackbar({
          open: true,
          message: 'Usuário ou senha inválidos',
          severity: 'error',
        })
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

      <Button variant="text" fullWidth onClick={() => navigate('/register')}>
        Ainda não tem conta? Registre-se
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
