import React, { useEffect, useState } from 'react'
import axios from 'axios'

const OrdersPage = () => {
  const [orders, setOrders] = useState([])

  const suppliers = [
    'Leanne Graham',
    'Ervin Howell',
    'Clementine Bauch',
    'Patricia Lebsack',
    'Chelsey Dietrich',
    'Mrs. Dennis Schulist',
    'Kurtis Weissnat',
    'Nicholas Runolfsdottir',
    'Glenna Reichert',
    'Clementina DuBuque',
  ]

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        'https://dummyjson.com/carts'
      )

      const updatedOrders = response.data.carts.map(
        (order) => ({
          ...order,
          status: 'Pending',
        })
      )

      setOrders(updatedOrders)
    } catch (error) {
      console.log(error)
    }
  }

  const handleView = (order) => {
    alert(`
Order Details

Order ID: ${order.id}

Vendor: Vendor ${order.userId}

Supplier: ${
      suppliers[order.id % suppliers.length]
    }

Product: ${order.products[0]?.title}

Quantity: ${order.totalProducts}

Total: ₹${order.total}

Status: ${order.status}
    `)
  }

  const handleApprove = (id) => {
    const updated = orders.map((order) =>
      order.id === id
        ? { ...order, status: 'Approved' }
        : order
    )

    setOrders(updated)
  }

  const handleReject = (id) => {
    const updated = orders.map((order) =>
      order.id === id
        ? { ...order, status: 'Rejected' }
        : order
    )

    setOrders(updated)
  }

  const handleComplete = (id) => {
    const updated = orders.map((order) =>
      order.id === id
        ? { ...order, status: 'Completed' }
        : order
    )

    setOrders(updated)
  }

  return (
    <div style={styles.container}>
      <div style={styles.topSection}>
        <div>
          <h1 style={styles.heading}>
            Orders Management
          </h1>

          <p style={styles.subText}>
            Track and manage all vendor orders
          </p>
        </div>
      </div>

      <div style={styles.ordersContainer}>
        {orders.map((order) => (
          <div
            key={order.id}
            style={styles.orderCard}
          >
            <div style={styles.cardTop}>
              <div>
                <h3 style={styles.orderId}>
                  Order #{order.id}
                </h3>

                <p style={styles.date}>
                  26 May 2026
                </p>
              </div>

              <span
                style={{
                  ...styles.status,

                  background:
                    order.status === 'Approved'
                      ? '#dcfce7'
                      : order.status === 'Rejected'
                      ? '#fee2e2'
                      : order.status === 'Completed'
                      ? '#dbeafe'
                      : '#fff7ed',

                  color:
                    order.status === 'Approved'
                      ? '#15803d'
                      : order.status === 'Rejected'
                      ? '#dc2626'
                      : order.status === 'Completed'
                      ? '#2563eb'
                      : '#ea580c',
                }}
              >
                {order.status}
              </span>
            </div>

            <div style={styles.infoSection}>
              <div style={styles.infoBox}>
                <p style={styles.label}>
                  Vendor
                </p>

                <h4 style={styles.value}>
                  Vendor {order.userId}
                </h4>
              </div>

              <div style={styles.infoBox}>
                <p style={styles.label}>
                  Supplier
                </p>

                <h4 style={styles.value}>
                  {
                    suppliers[
                      order.id %
                        suppliers.length
                    ]
                  }
                </h4>
              </div>
            </div>

            <div style={styles.productSection}>
              <p style={styles.label}>
                Product
              </p>

              <h4 style={styles.productName}>
                {order.products[0]?.title}
              </h4>
            </div>

            <div style={styles.bottomSection}>
              <div>
                <p style={styles.label}>
                  Quantity
                </p>

                <h3 style={styles.quantity}>
                  {order.totalProducts}
                </h3>
              </div>

              <div style={styles.buttonContainer}>
                <button
                  style={styles.viewBtn}
                  onClick={() =>
                    handleView(order)
                  }
                >
                  View
                </button>

                <button
                  style={styles.approveBtn}
                  onClick={() =>
                    handleApprove(order.id)
                  }
                >
                  Approve
                </button>

                <button
                  style={styles.rejectBtn}
                  onClick={() =>
                    handleReject(order.id)
                  }
                >
                  Reject
                </button>

                <button
                  style={styles.completeBtn}
                  onClick={() =>
                    handleComplete(order.id)
                  }
                >
                  Complete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: 15,
    background: '#1562d7',
    minHeight: '100vh',
  },

  topSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
    flexWrap: 'wrap',
    gap: 10,
  },

  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },

  subText: {
    color: '#f4f7fa',
    fontSize: 13,
  },

  ordersContainer: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit,minmax(260px,1fr))',
    gap: 18,
  },

  orderCard: {
    background: '#ffffff',
    borderRadius: 16,
    padding: 16,
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
    boxShadow:
      '0 4px 15px rgba(15,23,42,0.06)',
  },

  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },

  orderId: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },

  date: {
    color: '#94a3b8',
    fontSize: 11,
  },

  status: {
    padding: '5px 12px',
    borderRadius: 20,
    fontSize: 10,
    fontWeight: '700',
  },

  infoSection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 10,
    marginBottom: 12,
  },

  infoBox: {
    background: '#f8fafc',
    padding: 10,
    borderRadius: 10,
    border: '1px solid #e2e8f0',
  },

  label: {
    color: '#64748b',
    fontSize: 10,
    marginBottom: 5,
    textTransform: 'uppercase',
  },

  value: {
    color: '#0f172a',
    fontSize: 13,
    fontWeight: '600',
  },

  productSection: {
    background:
      'linear-gradient(to right, #eff6ff, #dbeafe)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 14,
    border: '1px solid #bfdbfe',
  },

  productName: {
    color: '#1d4ed8',
    marginTop: 4,
    fontSize: 15,
    fontWeight: '700',
  },

  bottomSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },

  quantity: {
    color: '#16a34a',
    fontSize: 22,
    fontWeight: '700',
  },

  buttonContainer: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },

  viewBtn: {
    background: '#eff6ff',
    color: '#2563eb',
    border: 'none',
    padding: '8px 12px',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: 12,
  },

  approveBtn: {
    background: '#dcfce7',
    color: '#15803d',
    border: 'none',
    padding: '8px 12px',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: 12,
  },

  rejectBtn: {
    background: '#fee2e2',
    color: '#dc2626',
    border: 'none',
    padding: '8px 12px',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: 12,
  },

  completeBtn: {
    background: '#dbeafe',
    color: '#2563eb',
    border: 'none',
    padding: '8px 12px',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: 12,
  },
}

export default OrdersPage