import React from 'react'
import { Outlet } from 'react-router-dom'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const AdminLayout = () => {
  return (
    <div style={styles.container}>
      <Sidebar />

      <div style={styles.main}>
        <Navbar />

        <div style={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    background: '#1562d7',
  },

  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },

  content: {
    padding: 20,
  },
}

export default AdminLayout