import React, { useState } from 'react'
import SupplierLayout from './SupplierLayout'

const PendingRequests = () => {

  const [requests, setRequests] = useState([

    {
      id: 1,
      vendor: 'Fresh Mart',
      product: 'Rice Bags',
      quantity: 50,
      status: 'Pending'
    },

    {
      id: 2,
      vendor: 'Super Store',
      product: 'Cooking Oil',
      quantity: 30,
      status: 'Pending'
    },

    {
      id: 3,
      vendor: 'Daily Needs',
      product: 'Sugar',
      quantity: 40,
      status: 'Pending'
    }

  ])

  const handleApprove = (id) => {

    const updatedRequests = requests.map((item) => {

      if (item.id === id) {
        return { ...item, status: 'Approved' }
      }

      return item
    })

    setRequests(updatedRequests)
  }

  const handleReject = (id) => {

    const updatedRequests = requests.map((item) => {

      if (item.id === id) {
        return { ...item, status: 'Rejected' }
      }

      return item
    })

    setRequests(updatedRequests)
  }

  return (

    <SupplierLayout>

      <div style={styles.container}>

        <h1 style={styles.heading}>
          Pending Requests
        </h1>

        <p style={styles.subHeading}>
          Manage vendor product requests
        </p>

        <div style={styles.card}>

          <h2 style={styles.number}>
            {requests.length}
          </h2>

          <p>Total Vendor Requests</p>

        </div>

        <div style={styles.tableWrapper}>

          <table style={styles.table}>

            <thead>

              <tr>
                <th style={styles.th}>Vendor</th>
                <th style={styles.th}>Product</th>
                <th style={styles.th}>Quantity</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Action</th>
              </tr>

            </thead>

            <tbody>

              {requests.map((item) => (

                <tr key={item.id}>

                  <td style={styles.td}>
                    {item.vendor}
                  </td>

                  <td style={styles.td}>
                    {item.product}
                  </td>

                  <td style={styles.td}>
                    {item.quantity}
                  </td>

                  <td style={styles.td}>
                    {item.status}
                  </td>

                  <td style={styles.td}>

                    <button
                      style={styles.approveBtn}
                      onClick={() => handleApprove(item.id)}
                    >
                      Approve
                    </button>

                    <button
                      style={styles.rejectBtn}
                      onClick={() => handleReject(item.id)}
                    >
                      Reject
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

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
    color: '#f1eded',
    marginBottom: '25px'
  },

  card: {
    backgroundColor: '#f59e0b',
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

  tableWrapper: {
    overflowX: 'auto'
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff'
  },

  th: {
    backgroundColor: '#111827',
    color: '#fff',
    padding: '14px',
    textAlign: 'left'
  },

  td: {
    padding: '12px',
    borderBottom: '1px solid #ddd'
  },

  approveBtn: {
    padding: '8px 14px',
    backgroundColor: '#10b981',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    marginRight: '10px',
    cursor: 'pointer'
  },

  rejectBtn: {
    padding: '8px 14px',
    backgroundColor: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
}

export default PendingRequests