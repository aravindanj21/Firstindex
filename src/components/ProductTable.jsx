import React from "react"

const ProductTable = () => {

  const products = [
    {
      id: 1,
      image: "/images/rice.jpg",
      name: 'Rice Bag',
      category: 'Food',
      stock: 120,
      price: 900,
      status: 'Available'
    },
    {
      id: 2,
      image: "/images/oil.jpg",
      name: 'Oil Bottle',
      category: 'Grocery',
      stock: 80,
      price: 150,
      status: 'Low Stock'
    },
    {
      id: 3,
      image: "/images/wheat.jpg",
      name: 'Wheat',
      category: 'Food',
      stock: 100,
      price: 70,
      status: 'Low Stock'
    },
    {
      id: 4,
      image: "/images/soap.avif",
      name: 'Soap',
      category: 'Grocery',
      stock: 100,
      price: 40,
      status: 'Low Stock'
    },
    {
      id: 5,
      image: "/images/detergent.png",
      name: 'Detergent Liquid',
      category: 'Grocery',
      stock: 600,
      price: 140,
      status: 'Medium Stock'
    },
    {
      id: 6,
      image: "/images/washingsoap.jpg",
      name: 'Washing Soap',
      category: 'Grocery',
      stock: 300,
      price: 30,
      status: 'Medium Stock'
    },
    {
      id: 7,
      image: "/images/fan.webp",
      name: 'Fan',
      category: 'Electricals',
      stock: 200,
      price: 2000,
      status: 'Low Stock'
    },
    {
      id: 8,
      image: "/images/lights.jpg",
      name: 'Lights',
      category: 'Electricals',
      stock: 1000,
      price: 100,
      status: 'High Stock'
    },
    {
      id: 9,
      image: "/images/biscuits.jpg",
      name: 'Biscuits',
      category: 'Food',
      stock: 2000,
      price: 20,
      status: 'High Stock'
    },
    {
      id: 10,
      image: "/images/microwaveoven.jpg",
      name: 'Microwave Oven',
      category: 'Electricals',
      stock: 300,
      price: 6000,
      status: 'Medium Stock'
    },
  ]

  return (
    <div style={styles.container}>

      <style>
        {`
          .title {
            text-align: center;
            margin: 25px 0;
            font-size: 30px;
            font-weight: bold;
            color: white;
            background: linear-gradient(90deg, #2563eb, #1e40af);
            padding: 15px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            letter-spacing: 2px;
            text-transform: uppercase;
          }

          .add-product {
            display: inline-block;
            background: #000;
            color: #fff;
            padding: 10px 15px;
            border-radius: 8px;
            cursor: pointer;
            margin-bottom: 15px;
            transition: 0.3s;
            font-weight: bold;
          }

          .add-product:hover {
            background: #333;
            transform: scale(1.05);
          }

          tr:hover {
            background: #f3f4f6;
            transition: 0.3s;
          }
        `}
      </style>

      <h2 className="title">Product List</h2>

      <h3 className="add-product">
        + Add Product
      </h3>

      <table style={styles.table}>

        <thead>
          <tr>
            <th style={styles.th}>Image</th>
            <th style={styles.th}>Product Name</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Stock</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>

              <td style={styles.td}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={styles.image}
                />
              </td>

              <td style={styles.td}>{product.name}</td>
              <td style={styles.td}>{product.category}</td>
              <td style={styles.td}>{product.stock}</td>
              <td style={styles.td}>₹{product.price}</td>

              <td style={styles.td}>
                <span
                  style={{
                    ...styles.status,
                    background:
                      product.status === "High Stock"
                        ? "#16a34a"
                        : product.status === "Medium Stock"
                        ? "#eab308"
                        : "#dc2626"
                  }}
                >
                  {product.status}
                </span>
              </td>

              <td style={styles.td}>
                <div style={styles.actions}>
                  <button style={styles.edit}>Edit</button>
                  <button style={styles.delete}>Delete</button>
                  <button style={styles.view}>View</button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  )
}

const styles = {

  container: {
    background: '#c7bd7c',
    padding: '20px',
    borderRadius: '12px',
    marginTop: '20px',
    overflowX: 'auto',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
    background: 'white',
    borderRadius: '10px',
    overflow: 'hidden'
  },

  th: {
    background: '#2563eb',
    color: 'white',
    padding: '14px',
    textAlign: 'center',
    border: '1px solid #ddd',
    fontSize: '16px'
  },

  td: {
    padding: '12px',
    textAlign: 'center',
    border: '1px solid #ddd',
    fontSize: '15px'
  },

  image: {
    width: '60px',
    height: '60px',
    borderRadius: '8px',
    objectFit: 'cover'
  },

  status: {
    color: 'white',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 'bold'
  },

  actions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px'
  },

  edit: {
    background: '#2563eb',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },

  delete: {
    background: '#dc2626',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },

  view: {
    background: '#16a34a',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
}

export default ProductTable
