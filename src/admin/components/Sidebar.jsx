import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const menus = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
    },
    {
      name: 'Suppliers',
      path: '/admin/suppliers',
    },
    {
      name: 'Vendors',
      path: '/admin/vendors',
    },
    {
      name: 'Products',
      path: '/admin/products',
    },
    {
      name: 'Orders',
      path: '/admin/orders',
    },
    {
      name: 'Stock Monitoring',
      path: '/admin/stock-monitoring',
    },
    {
      name: 'Profile',
      path: '/admin/profile',
    },
  ]

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>Admin Panel</h2>

      {menus.map((menu, index) => (
        <NavLink
          key={index}
          to={menu.path}
          style={({ isActive }) => ({
            ...styles.link,
            background: isActive ? '#ffffff30' : 'transparent',
          })}
        >
          {menu.name}
        </NavLink>
      ))}

      <button style={styles.logout}>Logout</button>
    </div>
  )
}

const styles = {
  sidebar: {
    width: 250,
    background: '#1e293b',
    color: '#fff',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  logo: {
    marginBottom: 20,
  },

  link: {
    color: '#fff',
    textDecoration: 'none',
    padding: 12,
    borderRadius: 8,
  },

  logout: {
    marginTop: 'auto',
    padding: 12,
    border: 'none',
    borderRadius: 8,
    background: '#050639',
    color: '#fff',
    cursor: 'pointer',
  },
}

export default Sidebar