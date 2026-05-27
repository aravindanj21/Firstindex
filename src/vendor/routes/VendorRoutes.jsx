import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import VendorDashboard from '../pages/VendorDashboard'
import BrowseProducts from '../pages/BrowseProducts'
import MyOrders from '../pages/MyOrders'
import RequestProduct from '../pages/RequestProduct'
import VendorProfile from '../pages/VendorProfile'
import ProductView from '../pages/ProductView'

const VendorRoutes = () => {
  return (
    <Routes>

      <Route
        path="/"
        element={<Navigate to="/vendor/dashboard" />}
      />

      <Route
        path="/vendor/dashboard"
        element={<VendorDashboard />}
      />

      <Route
        path="/vendor/products"
        element={<BrowseProducts />}
      />

      <Route
        path="/vendor/orders"
        element={<MyOrders />}
      />

      <Route
        path="/vendor/request-product"
        element={<RequestProduct />}
      />

      <Route
        path="/vendor/profile"
        element={<VendorProfile />}
      />

      <Route
      path="/vendor/product/:id"
     element={<ProductView />}
     />

    </Routes>
  )
}

export default VendorRoutes