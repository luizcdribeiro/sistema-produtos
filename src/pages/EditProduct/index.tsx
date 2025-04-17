import { Avatar, Button, IconButton, Stack, TextField, Typography } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { NumericFormat } from 'react-number-format'
import { useState } from 'react'
import { schema } from './schema'
import { Product, useEditProduct, useProduto } from '../../services/useProducts'
import { useParams } from 'react-router-dom'
import { Delete } from '@mui/icons-material'
import { useSnackbar } from '../../hooks/useSnackbar'
import { FormWrapper } from '../../components/FormWrapper'

export default function EditProduct() {
  const { id } = useParams<{ id: string }>()

  const { data: produto } = useProduto(String(id))

  const { mutate: editProduct } = useEditProduct()

  const { showSnackbar } = useSnackbar()

  const [imagePreview, setImagePreview] = useState(produto?.avatar)

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nome: produto?.nome,
      preco: produto?.preco,
      marca: produto?.marca,
      avatar: produto?.avatar,
      qt_estoque: produto?.qt_estoque,
      qt_vendas: produto?.qt_vendas,
      createdAt: produto?.createdAt,
      id: produto?.id as string,
    },
  })

  const onSubmit = async (data: Product) => {
    try {
      await editProduct(data)
      showSnackbar(' Produto editado com sucesso', 'success')
    } catch (error) {
      showSnackbar(' Erro ao editar produto', 'error')
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result as string
      setValue('avatar', base64)
      setImagePreview(base64)
    }
    reader.readAsDataURL(file)
  }

  const handleImageRemove = () => {
    setImagePreview('')
    setValue('avatar', '')
  }

  return (
    <FormWrapper>
      <Typography variant="h5" mb={2}>
        Edição de produto
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <Controller
            name="nome"
            control={control}
            render={({ field }) => (
              <TextField
                label="Nome"
                {...field}
                error={!!errors.nome}
                helperText={errors.nome?.message}
                fullWidth
              />
            )}
          />

          <Controller
            name="preco"
            control={control}
            render={({ field }) => (
              <NumericFormat
                customInput={TextField}
                label="Preço"
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                value={field.value}
                onValueChange={values => {
                  field.onChange(values.value)
                }}
                error={!!errors.preco}
                helperText={errors.preco?.message}
                fullWidth
              />
            )}
          />

          <Controller
            name="marca"
            control={control}
            render={({ field }) => (
              <TextField
                label="Marca"
                {...field}
                error={!!errors.marca}
                helperText={errors.marca?.message}
                fullWidth
              />
            )}
          />

          <Controller
            name="qt_vendas"
            control={control}
            render={({ field }) => (
              <NumericFormat
                customInput={TextField}
                label="Quantidade de vendas"
                value={field.value}
                onValueChange={values => {
                  field.onChange(values.value)
                }}
                error={!!errors.qt_vendas}
                helperText={errors.qt_vendas?.message}
                fullWidth
              />
            )}
          />

          <Controller
            name="qt_estoque"
            control={control}
            render={({ field }) => (
              <NumericFormat
                customInput={TextField}
                label="Quantidade em estoque"
                value={field.value}
                onValueChange={values => {
                  field.onChange(values.value)
                }}
                error={!!errors.qt_estoque}
                helperText={errors.qt_estoque?.message}
                fullWidth
              />
            )}
          />

          <Stack direction="row" alignItems="center" spacing={2}>
            {!imagePreview ? (
              <Button variant="contained" component="label">
                Enviar imagem
                <input
                  type="file"
                  name="avatar"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
            ) : (
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar src={imagePreview} alt="preview" sx={{ width: 100, height: 100 }} />
                <IconButton onClick={handleImageRemove} color="error">
                  <Delete />
                </IconButton>
              </Stack>
            )}
          </Stack>
          {errors.avatar && (
            <Typography color="error" fontSize={12}>
              {errors.avatar.message}
            </Typography>
          )}

          <Button type="submit" variant="contained">
            Editar produto
          </Button>
        </Stack>
      </form>
    </FormWrapper>
  )
}
