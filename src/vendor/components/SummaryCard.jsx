import React from 'react'

const SummaryCard = ({ title, count }) => {
  return (
    <div style={styles.card}>

      <h4>{title}</h4>

      <h2>{count}</h2>

    </div>
  )
}

const styles = {
  card: {
    background: '#fff',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    flex: 1,
    minWidth: 220
  }
}

export default SummaryCard