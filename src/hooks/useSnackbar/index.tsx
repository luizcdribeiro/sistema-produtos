import { Alert, AlertColor, Snackbar } from '@mui/material'
import { createContext, useCallback, useContext, useState, ReactNode } from 'react'

type SnackbarContextProps = {
  showSnackbar: (message: string, severity?: AlertColor) => void
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined)

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState<AlertColor>('success')

  const showSnackbar = useCallback((msg: string, sev: AlertColor = 'success') => {
    setMessage(msg)
    setSeverity(sev)
    setOpen(true)
  }, [])

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}

export const useSnackbar = (): SnackbarContextProps => {
  const context = useContext(SnackbarContext)
  if (!context) throw new Error('useSnackbar deve ser usado dentro de um <SnackbarProvider>')
  return context
}
