import React from 'react'

const VendorNavbar = () => {
  return (
    <div style={styles.navbar}>

      <h3 style={styles.title}>
        Vendor Dashboard
      </h3>

      <div style={styles.profile}>
        Welcome Vendor
      </div>

    </div>
  )
}

const styles = {
  navbar: {
    height: 70,
    background: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 25px',
    borderBottom: '1px solid #ddd'
  },

  title: {
    margin: 0
  },

  profile: {
    fontWeight: 600
  }
}

export default VendorNavbar