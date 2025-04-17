import './styles.scss'

import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import InventoryIcon from '@mui/icons-material/Inventory'
import { useNavigate } from 'react-router-dom'

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <Drawer variant="permanent" className="drawer">
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
