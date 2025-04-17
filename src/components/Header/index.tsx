import './styles.scss'
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Box,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { useThemeContext } from '../../context/ThemeContext'

export default function Header() {
  const { user, logout } = useAuth()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const theme = useTheme()
  const { toggleTheme } = useThemeContext()

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
      <Toolbar className={'header'}>
        <Typography variant="h6">Meu estoque</Typography>
        <Box className={'userSection'}>
          <IconButton onClick={toggleTheme} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <Typography className={'userName'}>{user?.nome}</Typography>
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
