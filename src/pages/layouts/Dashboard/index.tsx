import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import Sidebar from '../../../components/Siderbar'
import Header from '../../../components/Header'

export const DashboardLayout = () => {
  return (
    <Box display="flex" height="100vh">
      <Sidebar />
      <Box flex="1" display="flex" flexDirection="column">
        <Header />
        <Box component="main" flex="1" p={3} bgcolor="#f5f5f5">
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
