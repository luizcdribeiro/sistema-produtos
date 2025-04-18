import { Button, Typography, Box } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Link } from 'react-router-dom'
import './styles.scss'

export default function NotFound() {
  return (
    <Box className="not-found">
      <ErrorOutlineIcon className="icon" />
      <Typography variant="h4" className="title">
        Página não encontrada
      </Typography>
      <Typography variant="body1" className="message">
        Ops! A página que você tentou acessar não existe ou foi movida.
      </Typography>
      <Link to="/produtos" className="link">
        <Button variant="contained" color="primary">
          Voltar para Produtos
        </Button>
      </Link>
    </Box>
  )
}
