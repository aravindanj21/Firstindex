import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const sidebarStyle = {
    width: '250px',
    minHeight: '100vh',
    background: '#1e293b',
    padding: '20px',
    boxSizing: 'border-box'
  }

  const adminStyle = {
    textAlign: 'center',
    marginBottom: '30px',
    padding: '15px',
    background: '#334155',
    borderRadius: '12px'
  }

  const avatarStyle = {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    background: '#2563eb',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '0 auto 10px'
  }

  const menuStyle = {
    display: 'block',
    color: '#fff',
    textDecoration: 'none',
    padding: '12px',
    marginBottom: '10px',
    borderRadius: '8px',
    background: '#334155',
    fontWeight: '500'
  }

  return (
    <div style={sidebarStyle}>

      
      <div style={adminStyle}>
        <div style={avatarStyle}>
          A
        </div>

        <h3
          style={{
            color: '#fff',
            margin: '5px 0'
          }}
        >
          Admin User
        </h3>

        <p
          style={{
            color: '#cbd5e1',
            fontSize: '14px',
            margin: 0
          }}
        >
          Administrator
        </p>
      </div>

      

      <NavLink
        to="/dashboard"
        style={({ isActive }) => ({
          ...menuStyle,
          background: isActive
            ? '#2563eb'
            : '#334155'
        })}
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/reports"
        style={({ isActive }) => ({
          ...menuStyle,
          background: isActive
            ? '#2563eb'
            : '#334155'
        })}
      >
         Reports
      </NavLink>

      <NavLink
        to="/notifications"
        style={({ isActive }) => ({
          ...menuStyle,
          background: isActive
            ? '#2563eb'
            : '#334155'
        })}
      >
         Notifications
      </NavLink>

    </div>
  )
}

export default Sidebar