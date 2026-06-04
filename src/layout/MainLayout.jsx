import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const MainLayout = () => {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh'
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1
        }}
      >
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout