import React from 'react'

const Dashboards = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <p>Welcome to Supplier Dashboard</p>

      <div style={{ marginTop: '20px' }}>
        <h3>Quick Stats</h3>
        <ul>
          <li>Total Products: 120</li>
          <li>Pending Orders: 8</li>
          <li>Vendors: 15</li>
        </ul>
      </div>
    </div>
  )
}

export default Dashboard