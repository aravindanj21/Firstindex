import React from 'react'

const NotificationsPage = ({ notifications = [] }) => {
  return (
    <div
      style={{
        padding: '30px'
      }}
    >
      <h2>🔔 Notifications</h2>

      {notifications.length > 0 ? (
        notifications.map(item => (
          <div
            key={item.id}
            style={{
              background: '#fff',
              padding: '15px',
              marginBottom: '10px',
              borderRadius: '10px',
              boxShadow:
                '0 2px 5px rgba(0,0,0,0.1)'
            }}
          >
            <h4>{item.title}</h4>
            <p>{item.message}</p>
            <small>
              {item.createdAt}
            </small>
          </div>
        ))
      ) : (
        <p>No Notifications</p>
      )}
    </div>
  )
}

export default NotificationsPage