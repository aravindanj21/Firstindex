import React, { useEffect, useState } from 'react'
import axios from 'axios'

const DashboardHome = () => {
  const [cards, setCards] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const suppliers = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      )

      const products = await axios.get(
        'https://fakestoreapi.com/products'
      )

      const orders = await axios.get(
        'https://dummyjson.com/carts'
      )

      setCards([
        {
          title: 'Total Suppliers',
          value: suppliers.data.length,
        },
        {
          title: 'Total Vendors',
          value: 80,
        },
        {
          title: 'Total Products',
          value: products.data.length,
        },
        {
          title: 'Pending Orders',
          value: orders.data.carts.length,
        },
        {
          title: 'Total Stock',
          value: 2300,
        },
        {
          title: 'Recent Activity',
          value: '18 Updates',
        },
      ])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.headerSection}>
        <h1 style={styles.heading}>Admin Dashboard</h1>
        <p style={styles.subText}>
          Monitor suppliers, vendors, products and orders
        </p>
      </div>

      <div style={styles.grid}>
        {cards.map((card, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.topBar}></div>

            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>{card.title}</h3>

              <p style={styles.value}>{card.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: 10,
  },

  headerSection: {
    marginBottom: 30,
  },

  heading: {
    fontSize: 32,
    color: '#d9dce2',
    marginBottom: 5,
  },

  subText: {
    color: '#dee3ea',
    fontSize: 16,
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 25,
  },

  card: {
    background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
    borderRadius: 18,
    overflow: 'hidden',
    boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
    transition: '0.3s',
    cursor: 'pointer',
  },

  topBar: {
    height: 8,
    background: 'linear-gradient(to right, #021132, #553986)',
  },

  cardContent: {
    padding: 25,
  },

  cardTitle: {
    color: '#475569',
    fontSize: 18,
    marginBottom: 15,
  },

  value: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0f172a',
  },
}

export default DashboardHome