import { Box, useTheme } from '@mui/material'
import { ReactNode } from 'react'

type FormWrapperProps = {
  children: ReactNode
}

export const FormWrapper = ({ children }: FormWrapperProps) => {
  const theme = useTheme()

  return (
    <Box
      maxWidth="600px"
      mx="auto"
      p={4}
      borderRadius={2}
      boxShadow={3}
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        transition: 'all 0.3s ease-in-out',
      }}
    >
      {children}
    </Box>
  )
}
