import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Typography,
  IconButton,
  Button,
  Paper,
  TextField,
  Pagination,
  Stack,
  CircularProgress,
} from '@mui/material'
import { useState, useMemo } from 'react'
import { Visibility } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../../services/useProducts'

export default function Products() {
  const { data: products = [], isLoading } = useProducts()
  const navigate = useNavigate()

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  const filteredProducts = useMemo(() => {
    return products.filter(p => p.nome.toLowerCase().includes(search.toLowerCase()))
  }, [search, products])

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * 15
    return filteredProducts.slice(start, start + 15)
  }, [filteredProducts, page])

  const pageCount = Math.ceil(filteredProducts.length / 15)

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box p={3}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <TextField
          label="Buscar produto"
          variant="outlined"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Button variant="contained" onClick={() => navigate('/produtos/novo')}>
          Novo Produto
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Produto</TableCell>
              <TableCell>Adicionado em</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Quant.Estoque</TableCell>
              <TableCell>Quant.Vendas</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProducts.map(produto => (
              <TableRow key={produto.id}>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar src={produto.avatar} alt={produto.nome} />
                    <Typography>{produto.nome}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>{new Date(produto.createdAt).toLocaleDateString('pt-BR')}</TableCell>

                <TableCell>{produto.marca}</TableCell>
                <TableCell>{produto.qt_estoque}</TableCell>
                <TableCell>{produto.qt_vendas}</TableCell>

                <TableCell>R$ {produto.preco}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => navigate(`/produtos/${produto.id}`)}>
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={pageCount}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  )
}
