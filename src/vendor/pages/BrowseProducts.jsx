import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import VendorLayout from '../components/VendorLayout'
import ProductCard from '../components/ProductCard'

const BrowseProducts = () => {

  const navigate = useNavigate()

  const [showPopup, setShowPopup] = useState(false)

  const [requestForm, setRequestForm] = useState({
    productId: '',
    productName: '',
    quantity: '',
    notes: ''
  })

  const products = [
    {
      id: 1,
      image: 'https://picsum.photos/id/180/500/300',
      name: 'Laptop',
      category: 'Electronics',
      stock: 20,
      price: 45000,
      supplier: 'ABC Suppliers',
      status: 'Available'
    },
    {
      id: 2,
      image: 'https://picsum.photos/id/160/500/300',
      name: 'Smartphone',
      category: 'Electronics',
      stock: 35,
      price: 22000,
      supplier: 'Tech India',
      status: 'Available'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd',
      name: 'Office Chair',
      category: 'Furniture',
      stock: 12,
      price: 5500,
      supplier: 'Furniture World',
      status: 'Low Stock'
    }
  ]

  const handleOpenRequest = (product) => {

    setRequestForm({
      productId: product.id,
      productName: product.name,
      quantity: '',
      notes: ''
    })

    setShowPopup(true)
  }

  const handleChange = (e) => {

    setRequestForm({
      ...requestForm,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmitRequest = () => {

    const existingOrders =
      JSON.parse(localStorage.getItem('vendorOrders')) || []

    const selectedProduct = products.find(
      item => item.id === requestForm.productId
    )

    const newRequest = {

      ...requestForm,

      supplier: selectedProduct?.supplier,

      requestedDate: new Date().toLocaleString(),

      status: 'Pending'
    }

    const updatedOrders = [
      ...existingOrders,
      newRequest
    ]

    localStorage.setItem(
      'vendorOrders',
      JSON.stringify(updatedOrders)
    )

    alert('Product Request Sent Successfully')

    setShowPopup(false)

    setRequestForm({
      productId: '',
      productName: '',
      quantity: '',
      notes: ''
    })
  }

  const handleView = (product) => {

    navigate(`/vendor/product/${product.id}`, {
      state: product
    })
  }

  return (
    <VendorLayout>

      <h2>Browse Products</h2>

      <div style={styles.grid}>

        {
          products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onRequest={handleOpenRequest}
              onView={handleView}
            />
          ))
        }

      </div>

      {
        showPopup && (

          <div style={styles.overlay}>

            <div style={styles.popup}>

              <h3 style={styles.heading}>
                Send Product Request
              </h3>

              <div style={styles.field}>

                <label>Product Name</label>

                <input
                  type="text"
                  value={requestForm.productName}
                  disabled
                  style={styles.input}
                />

              </div>

              <div style={styles.field}>

                <label>Quantity</label>

                <input
                  type="number"
                  name="quantity"
                  placeholder="Enter Quantity"
                  value={requestForm.quantity}
                  onChange={handleChange}
                  style={styles.input}
                />

              </div>

              <div style={styles.field}>

                <label>Message / Notes</label>

                <textarea
                  name="notes"
                  placeholder="Enter Notes"
                  value={requestForm.notes}
                  onChange={handleChange}
                  style={styles.textarea}
                />

              </div>

              <div style={styles.actions}>

                <button
                  style={styles.cancelBtn}
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>

                <button
                  style={styles.submitBtn}
                  onClick={handleSubmitRequest}
                >
                  Send Request
                </button>

              </div>

            </div>

          </div>
        )
      }

    </VendorLayout>
  )
}

const styles = {

  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,
    marginTop: 20
  },

  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },

  popup: {
    width: 420,
    background: '#fff',
    padding: 25,
    borderRadius: 12,
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
  },

  heading: {
    marginBottom: 20
  },

  field: {
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'column'
  },

  input: {
    padding: 12,
    marginTop: 5,
    borderRadius: 6,
    border: '1px solid #ccc',
    outline: 'none'
  },

  textarea: {
    padding: 12,
    marginTop: 5,
    borderRadius: 6,
    border: '1px solid #ccc',
    minHeight: 100,
    resize: 'none',
    outline: 'none'
  },

  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 20
  },

  cancelBtn: {
    padding: '10px 20px',
    border: 'none',
    background: '#777',
    color: '#fff',
    borderRadius: 6,
    cursor: 'pointer'
  },

  submitBtn: {
    padding: '10px 20px',
    border: 'none',
    background: '#1976d2',
    color: '#fff',
    borderRadius: 6,
    cursor: 'pointer'
  }

}

export default BrowseProducts