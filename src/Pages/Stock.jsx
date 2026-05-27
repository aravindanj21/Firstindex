import React from 'react'

const Stock = () => {
  const products = [
    { id: 1, name: 'Rice', qty: 50 },
    { id: 2, name: 'Wheat', qty: 30 },
    { id: 3, name: 'Sugar', qty: 20 }
  ]

  return (
    <div style={{ padding: '20px' }}>
      <h1>Stock List</h1>

      <table border="1" cellPadding="10" style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Quantity</th>
          </tr>
        </thead>

        <tbody>
          {products.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Stock