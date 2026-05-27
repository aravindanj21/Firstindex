import React, { useEffect, useState } from 'react'

import VendorLayout from '../components/VendorLayout'

const MyOrders = () => {

  const [orders, setOrders] = useState([])

  useEffect(() => {

    const savedOrders =
      JSON.parse(localStorage.getItem('vendorOrders')) || []

    setOrders(savedOrders)

  }, [])

  return (
    <VendorLayout>

      <h2>My Orders</h2>

      <div style={styles.tableContainer}>

        <table style={styles.table}>

          <thead>

            <tr>
              <th style={styles.th}>Product</th>
              <th style={styles.th}>Quantity</th>
              <th style={styles.th}>Supplier</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Requested Date</th>
            </tr>

          </thead>

          <tbody>

            {
              orders.length > 0 ? (
                orders.map((order, index) => (

                  <tr key={index}>

                    <td style={styles.td}>
                      {order.productName}
                    </td>

                    <td style={styles.td}>
                      {order.quantity}
                    </td>

                    <td style={styles.td}>
                      {order.supplier}
                    </td>

                    <td style={styles.td}>

                      <span
                        style={{
                          ...styles.status,
                          background:
                            order.status === 'Approved'
                              ? '#dcfce7'
                              : order.status === 'Rejected'
                              ? '#fee2e2'
                              : '#fef3c7',
                          color:
                            order.status === 'Approved'
                              ? '#166534'
                              : order.status === 'Rejected'
                              ? '#991b1b'
                              : '#92400e'
                        }}
                      >
                        {order.status}
                      </span>

                    </td>

                    <td style={styles.td}>
                      {order.requestedDate}
                    </td>

                  </tr>

                ))
              ) : (
                <tr>

                  <td
                    colSpan="5"
                    style={styles.empty}
                  >
                    No Orders Found
                  </td>

                </tr>
              )
            }

          </tbody>

        </table>

      </div>

    </VendorLayout>
  )
}

const styles = {

  tableContainer: {
    marginTop: 20,
    background: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },

  th: {
    background: '#111827',
    color: '#fff',
    padding: 14,
    textAlign: 'left'
  },

  td: {
    padding: 14,
    borderBottom: '1px solid #eee'
  },

  status: {
    padding: '6px 12px',
    borderRadius: 20,
    fontSize: 14,
    fontWeight: 600
  },

  empty: {
    padding: 30,
    textAlign: 'center'
  }
}

export default MyOrders