import React, { useEffect, useState } from "react";

const RevenueOverview = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const storedInvoices =
      JSON.parse(localStorage.getItem("invoices")) || [];

    setInvoices(storedInvoices);
  }, []);

  
  const monthlyRevenue = {};

  invoices.forEach((invoice) => {
    if (!invoice.invoiceDate) return;

    const date = new Date(invoice.invoiceDate);

    const month = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    monthlyRevenue[month] =
      (monthlyRevenue[month] || 0) +
      Number(invoice.totalAmount || 0);
  });

  const revenueData = Object.entries(monthlyRevenue).map(
    ([month, revenue]) => ({
      month,
      revenue,
    })
  );

  
  const totalRevenue = revenueData.reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  const highestRevenue =
    revenueData.length > 0
      ? Math.max(
          ...revenueData.map((item) => item.revenue)
        )
      : 0;

  const lowestRevenue =
    revenueData.length > 0
      ? Math.min(
          ...revenueData.map((item) => item.revenue)
        )
      : 0;

  const averageRevenue =
    revenueData.length > 0
      ? totalRevenue / revenueData.length
      : 0;

 

  let growthPercentage = 0;

  if (revenueData.length >= 2) {
    const current =
      revenueData[revenueData.length - 1].revenue;

    const previous =
      revenueData[revenueData.length - 2].revenue;

    growthPercentage =
      previous > 0
        ? ((current - previous) / previous) * 100
        : 0;
  }

  return (
    <div style={styles.container}>
      <h1>Revenue Overview</h1>

     
      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h3>Total Revenue</h3>
          <h2>₹ {totalRevenue.toFixed(2)}</h2>
        </div>

        <div style={styles.card}>
          <h3>Average Revenue</h3>
          <h2>₹ {averageRevenue.toFixed(2)}</h2>
        </div>

        <div style={styles.card}>
          <h3>Highest Revenue</h3>
          <h2>₹ {highestRevenue.toFixed(2)}</h2>
        </div>

        <div style={styles.card}>
          <h3>Revenue Growth</h3>
          <h2>{growthPercentage.toFixed(2)}%</h2>
        </div>
      </div>

      

      <div style={styles.statsSection}>
        <h2>Revenue Statistics</h2>

        <div style={styles.statsGrid}>
          <div style={styles.statBox}>
            <strong>Total Revenue</strong>
            <p>₹ {totalRevenue.toFixed(2)}</p>
          </div>

          <div style={styles.statBox}>
            <strong>Highest Revenue</strong>
            <p>₹ {highestRevenue.toFixed(2)}</p>
          </div>

          <div style={styles.statBox}>
            <strong>Lowest Revenue</strong>
            <p>₹ {lowestRevenue.toFixed(2)}</p>
          </div>

          <div style={styles.statBox}>
            <strong>Average Revenue</strong>
            <p>₹ {averageRevenue.toFixed(2)}</p>
          </div>
        </div>
      </div>

     
      <div style={styles.tableSection}>
        <h2>Monthly Revenue Report</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Month</th>
              <th>Revenue</th>
            </tr>
          </thead>

          <tbody>
            {revenueData.length > 0 ? (
              revenueData.map((item, index) => (
                <tr key={index}>
                  <td>{item.month}</td>

                  <td>
                    ₹ {item.revenue.toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="2"
                  style={{
                    textAlign: "center",
                  }}
                >
                  No Revenue Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

     

      <div style={styles.summary}>
        <h2>Revenue Insights</h2>

        <ul>
          <li>
            Total Revenue Generated:
            ₹ {totalRevenue.toFixed(2)}
          </li>

          <li>
            Highest Revenue Month:
            ₹ {highestRevenue.toFixed(2)}
          </li>

          <li>
            Lowest Revenue Month:
            ₹ {lowestRevenue.toFixed(2)}
          </li>

          <li>
            Average Monthly Revenue:
            ₹ {averageRevenue.toFixed(2)}
          </li>

          <li>
            Revenue Growth:
            {growthPercentage.toFixed(2)}%
          </li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "25px",
    background: "#f4f6f9",
    minHeight: "100vh",
  },

  cardContainer: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "20px",
    marginBottom: "30px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.1)",
  },

  statsSection: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "30px",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.1)",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  statBox: {
    background: "#f8f9fa",
    padding: "15px",
    borderRadius: "8px",
  },

  tableSection: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "30px",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.1)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  summary: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.1)",
  },
};

export default RevenueOverview;