import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import InventoryIcon from '@mui/icons-material/Inventory'
import { useNavigate } from 'react-router-dom'

const drawerWidth = 240

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/produtos')}>
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Produtos" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
}
