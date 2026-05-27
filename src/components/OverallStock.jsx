import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SupplierLayout from './SupplierLayout'

const OverallStock = () => {

  const [products, setProducts] = useState([])
  const [totalStock, setTotalStock] = useState(0)

  useEffect(() => {

    axios
      .get('https://dummyjson.com/products')

      .then((response) => {

        const data = response.data.products

        setProducts(data)

        const stockCount = data.reduce((sum, item) => {
          return sum + item.stock
        }, 0)

        setTotalStock(stockCount)

      })

      .catch((error) => {
        console.log(error)
      })

  }, [])

  return (

    <SupplierLayout>

      <div style={styles.container}>

        <h1 style={styles.heading}>Overall Stock</h1>

        <p style={styles.subHeading}>
          Track total stock available in inventory
        </p>

        <div style={styles.stockCard}>

          <h2 style={styles.stockNumber}>
            {totalStock}
          </h2>

          <p style={styles.stockText}>
            Total Stock Units Available
          </p>

        </div>

        <div style={styles.tableWrapper}>

          <table style={styles.table}>

            <thead>

              <tr>
                <th style={styles.th}>Product</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Stock</th>
              </tr>

            </thead>

            <tbody>

              {products.map((item) => (

                <tr key={item.id}>

                  <td style={styles.td}>
                    {item.title}
                  </td>

                  <td style={styles.td}>
                    {item.category}
                  </td>

                  <td style={styles.td}>
                    {item.stock}
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
    color: '#efe5e5',
    marginBottom: '25px'
  },

  stockCard: {
    backgroundColor: '#059669',
    color: '#fff',
    padding: '25px',
    borderRadius: '12px',
    textAlign: 'center',
    marginBottom: '30px'
  },

  stockNumber: {
    fontSize: '42px',
    margin: 0
  },

  stockText: {
    marginTop: '10px'
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
  }
}

export default OverallStock