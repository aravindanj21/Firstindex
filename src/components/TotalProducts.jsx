import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SupplierLayout from './SupplierLayout'

const TotalProducts = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {

    axios
      .get('https://dummyjson.com/products')

      .then((response) => {
        setProducts(response.data.products)
      })

      .catch((error) => {
        console.log(error)
      })

  }, [])

  return (

    <SupplierLayout>

      <div style={styles.container}>

        <h1 style={styles.heading}>Total Products</h1>

        <p style={styles.subHeading}>
          Manage and view all available products
        </p>

        <div style={styles.card}>

          <h2 style={styles.total}>
            {products.length}
          </h2>

          <p style={styles.text}>
            Total Products Available
          </p>

        </div>

        <div style={styles.tableWrapper}>

          <table style={styles.table}>

            <thead>

              <tr>
                <th style={styles.th}>Image</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Stock</th>
              </tr>

            </thead>

            <tbody>

              {products.map((item) => (

                <tr key={item.id}>

                  <td style={styles.td}>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      style={styles.image}
                    />
                  </td>

                  <td style={styles.td}>{item.title}</td>

                  <td style={styles.td}>{item.category}</td>

                  <td style={styles.td}>${item.price}</td>

                  <td style={styles.td}>{item.stock}</td>

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
    color: '#ebe4e4',
    marginBottom: '25px'
  },

  card: {
    backgroundColor: '#06234e',
    color: '#fff',
    padding: '25px',
    borderRadius: '12px',
    marginBottom: '30px',
    textAlign: 'center'
  },

  total: {
    fontSize: '40px',
    margin: 0
  },

  text: {
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
  },

  image: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '8px'
  }
}

export default TotalProducts