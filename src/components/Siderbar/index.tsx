import './styles.scss'

import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import InventoryIcon from '@mui/icons-material/Inventory'
import { useNavigate } from 'react-router-dom'
import { AddCircle } from '@mui/icons-material'

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

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/produtos/novo')}>
            <ListItemIcon>
              <AddCircle />
            </ListItemIcon>
            <ListItemText primary="Adicionar Produto" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
}
