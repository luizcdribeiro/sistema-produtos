import { Routes, Route, Navigate } from 'react-router-dom'
import Login from 'pages/Login'
import { ProtectedRoute } from './ProtectedRoute'
import Products from 'pages/Products'
import { DashboardLayout } from 'pages/layouts/Dashboard'
import NewProduct from 'pages/NewProduct'
import Product from 'pages/Product'
import EditProduct from 'pages/EditProduct'
import NotFound from 'pages/404'
import Register from 'pages/Register'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/produtos" element={<Products />} />
          <Route path="/produtos/novo" element={<NewProduct />} />
          <Route path="/produtos/:id" element={<Product />} />
          <Route path="/produtos/editar/:id" element={<EditProduct />} />
          <Route path="/404" element={<NotFound />} />

          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
