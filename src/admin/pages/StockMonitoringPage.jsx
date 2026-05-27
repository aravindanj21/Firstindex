import React, { useEffect, useState } from 'react'
import axios from 'axios'

const StockMonitoringPage = () => {
  const [stock, setStock] = useState(0)

  useEffect(() => {
    fetchStock()
  }, [])

  const fetchStock = async () => {
    try {
      const response = await axios.get(
        'https://fakestoreapi.com/products'
      )

      const totalStock = response.data.reduce(
        (acc, item) => acc + item.rating.count,
        0
      )

      setStock(totalStock)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h2>Stock Monitoring</h2>

      <div style={styles.card}>
        <h3>Total Stock Available : {stock}</h3>
      </div>
    </div>
  )
}

const styles = {
  card: {
    background: '#fff',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
}

export default StockMonitoringPage