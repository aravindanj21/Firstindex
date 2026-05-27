import React, { useState } from 'react'
import SupplierLayout from './SupplierLayout'

const RecentActivity = () => {

  const [activities] = useState([

    {
      id: 1,
      action: 'Added New Product',
      product: 'Wireless Mouse',
      date: '22 May 2026',
      status: 'Completed'
    },

    {
      id: 2,
      action: 'Updated Stock',
      product: 'Laptop',
      date: '21 May 2026',
      status: 'Completed'
    },

    {
      id: 3,
      action: 'Vendor Request Approved',
      product: 'Rice Bags',
      date: '20 May 2026',
      status: 'Approved'
    },

    {
      id: 4,
      action: 'Deleted Product',
      product: 'Old Keyboard',
      date: '19 May 2026',
      status: 'Removed'
    }

  ])

  return (

    <SupplierLayout>

      <div style={styles.container}>

        <h1 style={styles.heading}>
          Recent Activity
        </h1>

        <p style={styles.subHeading}>
          View all recent supplier activities
        </p>

        <div style={styles.card}>

          <h2 style={styles.number}>
            {activities.length}
          </h2>

          <p>Total Recent Activities</p>

        </div>

        <div style={styles.activityContainer}>

          {activities.map((item) => (

            <div
              key={item.id}
              style={styles.activityCard}
            >

              <div>

                <h3 style={styles.action}>
                  {item.action}
                </h3>

                <p style={styles.product}>
                  Product: {item.product}
                </p>

                <p style={styles.date}>
                  Date: {item.date}
                </p>

              </div>

              <div style={styles.status}>
                {item.status}
              </div>

            </div>

          ))}

        </div>

      </div>

    </SupplierLayout>
  )
}

const styles = {

  container: {
    padding: '20px'
  },

  heading: {
    fontSize: '32px',
    marginBottom: '5px'
  },

  subHeading: {
    color: '#eef3ed',
    marginBottom: '25px'
  },

  card: {
    backgroundColor: '#7c3aed',
    color: '#fff',
    padding: '25px',
    borderRadius: '12px',
    textAlign: 'center',
    marginBottom: '30px'
  },

  number: {
    fontSize: '40px',
    margin: 0
  },

  activityContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },

  activityCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },

  action: {
    margin: 0,
    marginBottom: '8px'
  },

  product: {
    margin: '4px 0',
    color: '#555'
  },

  date: {
    margin: '4px 0',
    color: '#777'
  },

  status: {
    backgroundColor: '#10b981',
    color: '#fff',
    padding: '8px 14px',
    borderRadius: '20px',
    fontSize: '14px'
  }
}

export default RecentActivity