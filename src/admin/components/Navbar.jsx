import React from 'react'

const Navbar = () => {
  return (
    <div style={styles.navbar}>
      <h3 style={styles.title}>Admin Dashboard</h3>

      <div style={styles.adminBox}>
        Welcome Admin
      </div>
    </div>
  )
}

const styles = {
  navbar: {
    height: 70,
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    borderBottom: '1px solid #ddd',
  },

  title: {
    margin: 0,
  },

  adminBox: {
    background: '#1e293b',
    color: '#fff',
    padding: '10px 18px',
    borderRadius: 8,
    fontWeight: 'bold',
  },
}

export default Navbar