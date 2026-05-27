import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AdminRoutes from './admin/routes/AdminRoutes'

const App = () => {
  return (
    <BrowserRouter>
      <AdminRoutes />
    </BrowserRouter>
  )
}

export default App