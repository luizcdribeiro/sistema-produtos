import { AppBar, Toolbar, Typography, Avatar, IconButton, Menu, MenuItem, Box } from '@mui/material'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleCloseMenu()
  }

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body1">{user?.nome}</Typography>
          <IconButton onClick={handleOpenMenu}>
            <Avatar src={user?.image} alt={user?.nome} />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
