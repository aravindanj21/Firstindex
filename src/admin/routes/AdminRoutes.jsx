import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import AdminLayout from '../layout/AdminLayout'

import DashboardHome from '../pages/DashboardHome'
import SuppliersPage from '../pages/SuppliersPage'
import VendorsPage from '../pages/VendorsPage'
import ProductsPage from '../pages/ProductsPage'
import OrdersPage from '../pages/OrdersPage'
import StockMonitoringPage from '../pages/StockMonitoringPage'
import ProfilePage from '../pages/ProfilePage'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<DashboardHome />} />
        <Route path="suppliers" element={<SuppliersPage />} />
        <Route path="vendors" element={<VendorsPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="stock-monitoring" element={<StockMonitoringPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  )
}

export default AdminRoutes