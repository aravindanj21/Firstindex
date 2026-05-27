import React from 'react'

const ProductCard = ({ product, onRequest, onView }) => {

  return (
    <div style={styles.card}>

      <img
        src={product.image}
        alt={product.name}
        style={styles.image}
      />

      <div style={styles.content}>

        <h3 style={styles.title}>
          {product.name}
        </h3>

        <p style={styles.text}>
          <strong>Category:</strong> {product.category}
        </p>

        <p style={styles.text}>
          <strong>Stock:</strong> {product.stock}
        </p>

        <p style={styles.text}>
          <strong>Price:</strong> ₹{product.price}
        </p>

        <p style={styles.text}>
          <strong>Supplier:</strong> {product.supplier}
        </p>

        <p style={styles.status(product.status)}>
          {product.status}
        </p>

      </div>

      <div style={styles.actions}>

        <button
          style={styles.requestBtn}
          onClick={() => onRequest(product)}
        >
          Request
        </button>

        <button
          style={styles.viewBtn}
          onClick={() => onView(product)}
        >
          View
        </button>

      </div>

    </div>
  )
}

const styles = {

  card: {
    width: 300,
    background: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    transition: '0.3s',
    display: 'flex',
    flexDirection: 'column'
  },

  image: {
    width: '100%',
    height: 200,
    objectFit: 'cover'
  },

  content: {
    padding: 15,
    flex: 1
  },

  title: {
    margin: 0,
    marginBottom: 10,
    fontSize: 20,
    color: '#222'
  },

  text: {
    margin: '6px 0',
    color: '#555',
    fontSize: 14
  },

  status: (status) => ({
    marginTop: 10,
    display: 'inline-block',
    padding: '5px 10px',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    background:
      status === 'Available'
        ? '#2e7d32'
        : '#f57c00'
  }),

  actions: {
    display: 'flex',
    gap: 10,
    padding: 15,
    borderTop: '1px solid #eee'
  },

  requestBtn: {
    flex: 1,
    padding: 10,
    background: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 'bold'
  },

  viewBtn: {
    flex: 1,
    padding: 10,
    background: '#424242',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 'bold'
  }

}

export default ProductCard