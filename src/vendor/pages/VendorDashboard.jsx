import React from 'react'

import VendorLayout from '../components/VendorLayout'
import SummaryCard from '../components/SummaryCard'

const VendorDashboard = () => {

  const stats = [
    {
      title: 'Total Available Products',
      count: 245
    },
    {
      title: 'My Orders',
      count: 18
    },
    {
      title: 'Pending Requests',
      count: 7
    },
    {
      title: 'Recent Activity',
      count: 12
    }
  ]

  return (
    <VendorLayout>

      <h2>Dashboard Overview</h2>

      <div style={styles.cards}>

        {
          stats.map((item, index) => (
            <SummaryCard
              key={index}
              title={item.title}
              count={item.count}
            />
          ))
        }

      </div>

    </VendorLayout>
  )
}

const styles = {
  cards: {
    display: 'flex',
    gap: 20,
    flexWrap: 'wrap',
    marginTop: 20
  }
}

export default VendorDashboard