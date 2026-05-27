import React from 'react'
import { useLocation } from 'react-router-dom'

import VendorLayout from '../components/VendorLayout'

const ProductView = () => {

  const location = useLocation()

  const product = location.state

  return (
    <VendorLayout>

      <div style={styles.container}>

        <img
          src={product.image}
          alt={product.name}
          style={styles.image}
        />

        <div>

          <h2>{product.name}</h2>

          <p><b>Category:</b> {product.category}</p>
          <p><b>Stock:</b> {product.stock}</p>
          <p><b>Price:</b> ₹{product.price}</p>
          <p><b>Supplier:</b> {product.supplier}</p>
          <p><b>Status:</b> {product.status}</p>

        </div>

      </div>

    </VendorLayout>
  )
}

const styles = {
  container: {
    display: 'flex',
    gap: 30,
    background: '#fff',
    padding: 20,
    borderRadius: 10
  },

  image: {
    width: 300,
    borderRadius: 10
  }
}

export default ProductView