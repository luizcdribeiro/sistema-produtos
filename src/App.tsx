import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './utils/queryClient'
import { AuthProvider } from './context/AuthContext'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AppRoutes />
          </LocalizationProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
