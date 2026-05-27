import React, { useEffect, useState } from 'react'

import VendorLayout from '../components/VendorLayout'

const RequestProduct = () => {

  const [requests, setRequests] = useState([])

  useEffect(() => {

    const savedRequests =
      JSON.parse(localStorage.getItem('vendorOrders')) || []

    setRequests(savedRequests)

  }, [])

  return (
    <VendorLayout>

      <h2>Requested Products</h2>

      <div style={styles.container}>

        {
          requests.length > 0 ? (

            requests.map((request, index) => (

              <div
                key={index}
                style={styles.card}
              >

                <div style={styles.row}>
                  <span style={styles.label}>
                    Product
                  </span>

                  <span>
                    {request.productName}
                  </span>
                </div>

                <div style={styles.row}>
                  <span style={styles.label}>
                    Quantity
                  </span>

                  <span>
                    {request.quantity}
                  </span>
                </div>

                <div style={styles.row}>
                  <span style={styles.label}>
                    Supplier
                  </span>

                  <span>
                    {request.supplier}
                  </span>
                </div>

                <div style={styles.row}>
                  <span style={styles.label}>
                    Notes
                  </span>

                  <span>
                    {request.notes || '-'}
                  </span>
                </div>

                <div style={styles.row}>
                  <span style={styles.label}>
                    Requested Date
                  </span>

                  <span>
                    {request.requestedDate}
                  </span>
                </div>

                <div style={styles.row}>
                  <span style={styles.label}>
                    Status
                  </span>

                  <span
                    style={{
                      ...styles.status,
                      background:
                        request.status === 'Approved'
                          ? '#dcfce7'
                          : request.status === 'Rejected'
                          ? '#fee2e2'
                          : '#fef3c7',

                      color:
                        request.status === 'Approved'
                          ? '#166534'
                          : request.status === 'Rejected'
                          ? '#991b1b'
                          : '#92400e'
                    }}
                  >
                    {request.status}
                  </span>
                </div>

              </div>

            ))

          ) : (

            <div style={styles.empty}>
              No Product Requests Found
            </div>

          )
        }

      </div>

    </VendorLayout>
  )
}

const styles = {

  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,
    marginTop: 20
  },

  card: {
    width: 350,
    background: '#fff',
    borderRadius: 12,
    padding: 20,
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
  },

  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 14
  },

  label: {
    fontWeight: 600,
    color: '#111827'
  },

  status: {
    padding: '5px 12px',
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600
  },

  empty: {
    marginTop: 40,
    fontSize: 18,
    color: '#666'
  }

}

export default RequestProduct