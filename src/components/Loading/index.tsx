import { Box, CircularProgress } from '@mui/material'

export default function Loading() {
  return (
    <Box display="flex" justifyContent="center" mt={10}>
      <CircularProgress />
    </Box>
  )
}
