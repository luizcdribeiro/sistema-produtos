import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { Edit, Delete } from '@mui/icons-material'
import { useDeleteProduct, useProduct } from 'services/productsServices'
import { useSnackbar } from 'hooks/useSnackbar'
import Loading from 'components/Loading'

export default function Product() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: produto, isLoading } = useProduct(String(id))
  const deleteProduto = useDeleteProduct()

  const [openDialog, setOpenDialog] = useState(false)

  const { showSnackbar } = useSnackbar()

  const handleDelete = () => {
    deleteProduto.mutate(String(id), {
      onSuccess: () => {
        setOpenDialog(false)

        showSnackbar('Produto excluído com sucesso!', 'success')

        setTimeout(() => {
          navigate('/produtos')
        }, 3000)
      },
      onError: () => {
        showSnackbar('Erro ao excluir produto, tente novamente!', 'error')
      },
    })
  }

  if (isLoading) {
    return <Loading />
  }

  if (!produto) {
    return (
      <Box mt={10} textAlign="center">
        <Typography variant="h6">Produto não encontrado</Typography>
      </Box>
    )
  }

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={produto.avatar} alt={produto.nome} />}
        title={
          <Typography variant="h6" fontWeight="bold">
            {produto.nome}
          </Typography>
        }
        action={
          <>
            <IconButton onClick={() => navigate(`/produtos/editar/${produto.id}`)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => setOpenDialog(true)} color="warning">
              <Delete />
            </IconButton>
          </>
        }
      />

      <CardContent>
        <Typography variant="body1">
          <strong>Marca:</strong> {produto.marca}
        </Typography>
        <Typography variant="body1">
          <strong>Preço:</strong> R$ {produto.preco}
        </Typography>
        <Typography variant="body1">
          <strong>Quantidade em estoque:</strong> {produto.qt_estoque}
        </Typography>
        <Typography variant="body1">
          <strong>Quantidade de vendas:</strong> {produto.qt_vendas}
        </Typography>
        <Typography variant="body1">
          <strong>Criado em:</strong> {new Date(produto.createdAt).toLocaleDateString('pt-BR')}
        </Typography>
      </CardContent>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir o produto <strong>{produto.nome}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={deleteProduto.isPending}
          >
            {deleteProduto.isPending ? 'Excluindo...' : 'Excluir'}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}
