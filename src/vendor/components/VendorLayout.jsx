import React from 'react'

import VendorSidebar from './VendorSidebar'
import VendorNavbar from './VendorNavbar'

const VendorLayout = ({ children }) => {
  return (
    <div style={styles.container}>

      <VendorSidebar />

      <div style={styles.rightSection}>

        <VendorNavbar />

        <div style={styles.content}>
          {children}
        </div>

      </div>

    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    background: '#2f5ebc'
  },

  rightSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },

  content: {
    padding: 20
  }
}

export default VendorLayout