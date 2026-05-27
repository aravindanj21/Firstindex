import React, { useEffect, useState } from 'react'
import axios from 'axios'

const supplierNames = [
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

const ProductsPage = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        'https://fakestoreapi.com/products'
      )

      const updated = response.data.map(
        (product) => ({
          ...product,
          status: 'Pending',
        })
      )

      setProducts(updated)
    } catch (error) {
      console.log(error)
    }
  }

  const handleView = (product) => {
    alert(`
Product Details

ID: ${product.id}
Title: ${product.title}
Category: ${product.category}
Price: ₹${product.price}
Stock: ${product.rating.count}
Rating: ${product.rating.rate}
Supplier: ${
      supplierNames[
        product.id % supplierNames.length
      ]
    }
Status: ${product.status}
    `)
  }

  const handleApprove = (id) => {
    const updated = products.map((product) =>
      product.id === id
        ? {
            ...product,
            status: 'Approved',
          }
        : product
    )

    setProducts(updated)
  }

  const handleReject = (id) => {
    const updated = products.map((product) =>
      product.id === id
        ? {
            ...product,
            status: 'Rejected',
          }
        : product
    )

    setProducts(updated)
  }

  const handleDelete = (id) => {
    const updated = products.filter(
      (product) => product.id !== id
    )

    setProducts(updated)
  }

  return (
    <div style={styles.container}>
      <div style={styles.topSection}>
        <div>
          <h1 style={styles.heading}>
            Product Monitoring
          </h1>

          <p style={styles.subText}>
            Manage and monitor all products
          </p>
        </div>
      </div>

      <div style={styles.productsGrid}>
        {products.map((product) => (
          <div
            key={product.id}
            style={styles.card}
          >
            <div style={styles.imageContainer}>
              <img
                src={product.image}
                alt={product.title}
                style={styles.image}
              />

              <span
                style={{
                  ...styles.status,

                  background:
                    product.status ===
                    'Approved'
                      ? '#dcfce7'
                      : product.status ===
                        'Rejected'
                      ? '#fee2e2'
                      : '#fef3c7',

                  color:
                    product.status ===
                    'Approved'
                      ? '#15803d'
                      : product.status ===
                        'Rejected'
                      ? '#dc2626'
                      : '#b45309',
                }}
              >
                {product.status}
              </span>
            </div>

            <div style={styles.cardBody}>
              <h3 style={styles.productName}>
                {product.title}
              </h3>

              <p style={styles.category}>
                {product.category}
              </p>

              <div style={styles.infoRow}>
                <span style={styles.label}>
                  Supplier
                </span>

                <span style={styles.value}>
                  {
                    supplierNames[
                      product.id %
                        supplierNames.length
                    ]
                  }
                </span>
              </div>

              <div style={styles.infoRow}>
                <span style={styles.label}>
                  Stock
                </span>

                <span style={styles.stock}>
                  {product.rating.count}
                </span>
              </div>

              <div style={styles.infoRow}>
                <span style={styles.label}>
                  Price
                </span>

                <span style={styles.price}>
                  ₹{product.price}
                </span>
              </div>

              <div
                style={styles.buttonContainer}
              >
                <button
                  style={styles.viewBtn}
                  onClick={() =>
                    handleView(product)
                  }
                >
                  View
                </button>

                <button
                  style={styles.approveBtn}
                  onClick={() =>
                    handleApprove(product.id)
                  }
                >
                  Approve
                </button>

                <button
                  style={styles.rejectBtn}
                  onClick={() =>
                    handleReject(product.id)
                  }
                >
                  Reject
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() =>
                    handleDelete(product.id)
                  }
                >
                  Delete
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
  },

  topSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    flexWrap: 'wrap',
    gap: 15,
  },

  heading: {
    fontSize: 32,
    color: '#f7f7f9',
    marginBottom: 5,
  },

  subText: {
    color: '#dedfe0',
    fontSize: 15,
  },

  productsGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit,minmax(240px,1fr))',
    gap: 18,
  },

  card: {
    background: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow:
      '0 6px 18px rgba(0,0,0,0.08)',
  },

  imageContainer: {
    position: 'relative',
    background: '#f8fafc',
    height: 170,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },

  image: {
    width: 100,
    height: 100,
    objectFit: 'contain',
  },

  status: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: '5px 10px',
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 'bold',
  },

  cardBody: {
    padding: 14,
  },

  productName: {
    fontSize: 15,
    color: '#111827',
    marginBottom: 6,
    height: 40,
    overflow: 'hidden',
  },

  category: {
    color: '#1316c6',
    fontWeight: 'bold',
    marginBottom: 12,
    fontSize: 13,
    textTransform: 'capitalize',
  },

  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  label: {
    color: '#6b7280',
    fontSize: 12,
  },

  value: {
    color: '#111827',
    fontWeight: '600',
    fontSize: 12,
  },

  stock: {
    color: '#16a34a',
    fontWeight: 'bold',
    fontSize: 12,
  },

  price: {
    color: '#2563eb',
    fontWeight: 'bold',
    fontSize: 14,
  },

  buttonContainer: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(2,1fr)',
    gap: 8,
    marginTop: 15,
  },

  viewBtn: {
    background: '#e0f2fe',
    color: '#0369a1',
    border: 'none',
    padding: '8px',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: 12,
  },

  approveBtn: {
    background: '#dcfce7',
    color: '#15803d',
    border: 'none',
    padding: '8px',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: 12,
  },

  rejectBtn: {
    background: '#fef3c7',
    color: '#b45309',
    border: 'none',
    padding: '8px',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: 12,
  },

  deleteBtn: {
    background: '#fee2e2',
    color: '#dc2626',
    border: 'none',
    padding: '8px',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: 12,
  },
}

export default ProductsPage