import React, { useEffect, useState } from "react"
import axios from "axios"

const StockList = () => {

  const [stocks, setStocks] = useState([])

  useEffect(() => {
    
    axios.get("https://dummyjson.com/products")
      .then((res) => {

        const data = res.data.products.map((item) => ({
          id: item.id,
          name: item.title,
          category: item.category,
          stock: item.stock,
          price: item.price,
          image: item.thumbnail,

          status:
            item.stock > 100
              ? "High Stock"
              : item.stock > 50
              ? "Medium Stock"
              : "Low Stock"
        }))

        setStocks(data)
      })
      .catch(err => console.log(err))
  }, [])

  const handleView = (item) => {
    alert(
      `Product: ${item.name}\nCategory: ${item.category}\nStock: ${item.stock}\nPrice: ₹${item.price}`
    )
  }

  const handleDelete = (id) => {
    setStocks(stocks.filter(item => item.id !== id))
  }

  const styles = {

    container: {
      marginLeft: "280px",
      padding: "25px",
      background: "#f1f5f9",
      minHeight: "100vh"
    },

    title: {
      fontSize: "26px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#0f172a"
    },

    table: {
      width: "100%",
      borderCollapse: "collapse",
      background: "white",
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
    },

    th: {
      background: "#0f172a",
      color: "white",
      padding: "12px",
      textAlign: "left"
    },

    td: {
      padding: "12px",
      borderBottom: "1px solid #e2e8f0"
    },

    image: {
      width: "45px",
      height: "45px",
      borderRadius: "8px",
      objectFit: "cover"
    },

    status: {
      padding: "5px 10px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "bold",
      display: "inline-block"
    },

    actions: {
      display: "flex",
      gap: "6px"
    },

    btnView: {
      background: "#16a34a",
      color: "white",
      border: "none",
      padding: "6px 10px",
      borderRadius: "5px",
      cursor: "pointer"
    },

    btnDelete: {
      background: "#dc2626",
      color: "white",
      border: "none",
      padding: "6px 10px",
      borderRadius: "5px",
      cursor: "pointer"
    }

  }

  return (
    <div style={styles.container}>

      <h2 style={styles.title}>Stock List</h2>

      <table style={styles.table}>

        <thead>
          <tr>
            <th style={styles.th}>Image</th>
            <th style={styles.th}>Product</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Stock</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>

        <tbody>

          {stocks.map((item) => (

            <tr key={item.id}>

              <td style={styles.td}>
                <img src={item.image} style={styles.image} />
              </td>

              <td style={styles.td}>{item.name}</td>
              <td style={styles.td}>{item.category}</td>
              <td style={styles.td}>{item.stock}</td>
              <td style={styles.td}>₹{item.price}</td>

              <td style={styles.td}>

                <span
                  style={{
                    ...styles.status,
                    background:
                      item.status === "High Stock"
                        ? "#dcfce7"
                        : item.status === "Medium Stock"
                        ? "#fef9c3"
                        : "#fee2e2",

                    color:
                      item.status === "High Stock"
                        ? "#166534"
                        : item.status === "Medium Stock"
                        ? "#854d0e"
                        : "#991b1b"
                  }}
                >
                  {item.status}
                </span>

              </td>

              <td style={styles.td}>

                <div style={styles.actions}>

                  <button
                    style={styles.btnView}
                    onClick={() => handleView(item)}
                  >
                    View
                  </button>

                  <button
                    style={styles.btnDelete}
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}

export default StockList