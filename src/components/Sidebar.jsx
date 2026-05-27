import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {

  const menus = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Stock List', path: '/stock' },
    { name: 'Add Product', path: '/add-product' },
    { name: 'Vendor Requests', path: '/vendor-requests' },
    { name: 'Profile', path: '/profile' },
    { name: 'Logout', path: '/logout' }
  ]

  return (

    <div style={styles.sidebar}>

      <h2 style={styles.logo}>Supplier</h2>

      {
        menus.map((menu, index) => (

          <NavLink
            key={index}
            to={menu.path}
            className={({ isActive }) => isActive ? 'active' : ''}
            style={({ isActive }) => ({
              ...styles.menu,
              ...(isActive ? styles.activeMenu : {})
            })}

            onMouseEnter={(e) => {
              e.target.style.background = '#dadee4'
              e.target.style.transform = 'scale(1.03)'
            }}

            onMouseLeave={(e) => {

              if (!e.target.classList.contains('active')) {
                e.target.style.background = '#334155'
              }

              e.target.style.transform = 'scale(1)'
            }}
          >

            {menu.name}

          </NavLink>

        ))
      }

    </div>

  )
}

const styles = {

  sidebar: {
    width: '250px',
    background: '#1e293b',
    color: 'white',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    minHeight: '100vh'
  },

  logo: {
    marginBottom: '30px',
    textAlign: 'center'
  },

  menu: {
    color: 'white',
    textDecoration: 'none',
    padding: '12px 15px',
    borderRadius: '8px',
    background: '#334155',
    transition: '0.3s ease',
    cursor: 'pointer',
    fontWeight: '500'
  },

  activeMenu: {
    background: '#475569',
    border: '1px solid #94a3b8',
    boxShadow: '0 0 10px rgba(255,255,255,0.1)'
  }

}

export default Sidebar