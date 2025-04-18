import { Avatar, Button, Stack, TextField, Typography } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { NumericFormat } from 'react-number-format'
import { useState } from 'react'
import { schema } from './schema'
import { useSnackbar } from 'hooks/useSnackbar'
import { FormWrapper } from 'components/FormWrapper'
import { Product } from 'services/productsServices/interfaces'

export default function NewProduct() {
  const [imagePreview, setImagePreview] = useState('')

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nome: '',
      preco: '',
      marca: '',
      avatar: '',
      qt_estoque: 0,
      qt_vendas: 0,
      createdAt: new Date().toISOString(),
      id: crypto.randomUUID(),
    },
  })
  const { showSnackbar } = useSnackbar()

  const onSubmit = (data: Product) => {
    console.log('Produto demonstrativo enviado:', data)
    showSnackbar('Produto criado com sucesso', 'success')
    reset()
    setImagePreview('')
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

  return (
    <FormWrapper>
      <Typography variant="h5" mb={2}>
        Cadastrar Produto
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
              />
            )}
          />

          <Stack direction="row" alignItems="center" spacing={2}>
            <Button variant="contained" component="label">
              Enviar imagem
              <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
            </Button>
            {imagePreview && <Avatar src={imagePreview} alt="preview" />}
          </Stack>
          {errors.avatar && (
            <Typography color="error" fontSize={12}>
              {errors.avatar.message}
            </Typography>
          )}

          <Button type="submit" variant="contained">
            Cadastrar Produto
          </Button>
        </Stack>
      </form>
    </FormWrapper>
  )
}
