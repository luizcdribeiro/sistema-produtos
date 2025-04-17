import { AlertColor } from '@mui/material'

export type SnackbarContextProps = {
  showSnackbar: (message: string, severity?: AlertColor) => void
}
