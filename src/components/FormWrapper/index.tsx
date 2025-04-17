import './styles.scss'
import { Box, useTheme } from '@mui/material'
import { FormWrapperProps } from './interfaces'

export const FormWrapper = ({ children }: FormWrapperProps) => {
  const theme = useTheme()

  return (
    <Box
      maxWidth="800px"
      mx="auto"
      p={4}
      borderRadius={2}
      boxShadow={3}
      className="formWrapper"
      sx={{
        '--background-color': theme.palette.background.paper,
        '--text-color': theme.palette.text.primary,
      }}
    >
      {children}
    </Box>
  )
}
