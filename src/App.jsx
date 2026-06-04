import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import MainLayout from './layout/MainLayout'

import OrderManagement from './order/OrderManagement'
import ReportsPage from './order/reports/ReportsPage'
import NotificationsPage from './order/notifications/NotificationsPage'

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<MainLayout />}
        >

          <Route
            index
            element={
              <Navigate
                to="/dashboard"
              />
            }
          />

          <Route
            path="dashboard"
            element={
              <OrderManagement />
            }
          />

          <Route
            path="reports"
            element={
              <ReportsPage />
            }
          /> <Route
    path="notifications"
    element={<NotificationsPage />}
  />

         

        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App