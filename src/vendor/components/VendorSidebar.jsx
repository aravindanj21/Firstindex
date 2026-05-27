import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const VendorSidebar = () => {

  const navigate = useNavigate()

  const menus = [
    {
      name: 'Dashboard',
      path: '/vendor/dashboard'
    },
    {
      name: 'Browse Products',
      path: '/vendor/products'
    },
    {
      name: 'My Orders',
      path: '/vendor/orders'
    },
    {
      name: 'Request Product',
      path: '/vendor/request-product'
    },
    {
      name: 'Profile',
      path: '/vendor/profile'
    }
  ]

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <div style={styles.sidebar}>

      <h2 style={styles.logo}>
        Vendor Panel
      </h2>

      <div style={styles.menuContainer}>

        {
          menus.map((menu, index) => (
            <NavLink
              key={index}
              to={menu.path}
              style={({ isActive }) => ({
                ...styles.menu,
                background: isActive ? '#ffffff20' : 'transparent'
              })}
            >
              {menu.name}
            </NavLink>
          ))
        }

        <button
          onClick={handleLogout}
          style={styles.logoutBtn}
        >
          Logout
        </button>

      </div>

    </div>
  )
}

const styles = {
  sidebar: {
    width: 260,
    background: '#111827',
    color: '#fff',
    padding: 20,
    display: 'flex',
    flexDirection: 'column'
  },

  logo: {
    marginBottom: 30
  },

  menuContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },

  menu: {
    color: '#fff',
    textDecoration: 'none',
    padding: '14px 16px',
    borderRadius: 8,
    fontWeight: 500
  },

  logoutBtn: {
    marginTop: 20,
    padding: '14px 16px',
    border: 'none',
    borderRadius: 8,
    background: '#2b2c51',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 600
  }
}

export default VendorSidebar