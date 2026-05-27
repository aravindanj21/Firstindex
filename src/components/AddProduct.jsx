import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import SupplierLayout from '../components/SupplierLayout'

import { addProduct } from '../services/api/productApi'

const AddProduct = () => {

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState('')

  const [formData, setFormData] = useState({

    name: '',
    category: '',
    price: '',
    stock: '',
    image: ''
  })

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      setLoading(true)

      setError('')

      await addProduct(formData)

      alert('Product Added Successfully')

      navigate('/stock')

    } catch (err) {

      setError('Failed to add product')

    } finally {

      setLoading(false)
    }
  }

  return (

    <SupplierLayout>

      <div style={styles.container}>

        <h1 style={styles.heading}>
          Add Product
        </h1>

        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            style={styles.input}
          />

          {error && (
            <p style={styles.error}>
              {error}
            </p>
          )}

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >

            {loading ? 'Adding...' : 'Add Product'}

          </button>

        </form>

      </div>

    </SupplierLayout>
  )
}

const styles = {

  container: {
    padding: '20px'
  },

  heading: {
    marginBottom: '20px'
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    background: '#fff',
    padding: '20px',
    borderRadius: '10px'
  },

  input: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc'
  },

  button: {
    padding: '12px',
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },

  error: {
    color: 'red'
  }
}

export default AddProduct