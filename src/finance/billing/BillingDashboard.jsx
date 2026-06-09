import React, { useEffect, useState } from "react";

const BillingDashboard = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const storedInvoices =
      JSON.parse(localStorage.getItem("invoices")) || [];

    setInvoices(storedInvoices);
  }, []);

  const totalRevenue = invoices.reduce(
    (sum, invoice) =>
      sum + Number(invoice.totalAmount || 0),
    0
  );

  const paidAmount = invoices
    .filter((invoice) => invoice.status === "Paid")
    .reduce(
      (sum, invoice) =>
        sum + Number(invoice.totalAmount || 0),
      0
    );

  const pendingAmount = invoices
    .filter((invoice) => invoice.status === "Pending")
    .reduce(
      (sum, invoice) =>
        sum + Number(invoice.totalAmount || 0),
      0
    );

  const overdueAmount = invoices
    .filter((invoice) => invoice.status === "Overdue")
    .reduce(
      (sum, invoice) =>
        sum + Number(invoice.totalAmount || 0),
      0
    );

  return (
    <div style={styles.container}>
      <h1>Billing Dashboard</h1>

      
      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h3>Total Revenue</h3>
          <h2>₹ {totalRevenue.toFixed(2)}</h2>
        </div>

        <div style={styles.card}>
          <h3>Paid Amount</h3>
          <h2>₹ {paidAmount.toFixed(2)}</h2>
        </div>

        <div style={styles.card}>
          <h3>Pending Amount</h3>
          <h2>₹ {pendingAmount.toFixed(2)}</h2>
        </div>

        <div style={styles.card}>
          <h3>Overdue Amount</h3>
          <h2>₹ {overdueAmount.toFixed(2)}</h2>
        </div>
      </div>

      
      <div style={styles.tableContainer}>
        <h2>Recent Invoices</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Vendor</th>
              <th>Supplier</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {invoices.length > 0 ? (
              invoices.slice(-5).reverse().map((invoice, index) => (
                <tr key={index}>
                  <td>{invoice.invoiceNumber}</td>
                  <td>{invoice.vendorName}</td>
                  <td>{invoice.supplierName}</td>
                  <td>
                    ₹{" "}
                    {Number(
                      invoice.totalAmount
                    ).toFixed(2)}
                  </td>
                  <td>
                    <span
                      style={{
                        color:
                          invoice.status === "Paid"
                            ? "green"
                            : invoice.status ===
                              "Pending"
                            ? "orange"
                            : invoice.status ===
                              "Overdue"
                            ? "red"
                            : "blue",
                        fontWeight: "bold",
                      }}
                    >
                      {invoice.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign: "center",
                  }}
                >
                  No Invoice Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      
      <div style={styles.statsContainer}>
        <div style={styles.statBox}>
          <h3>Total Invoices</h3>
          <p>{invoices.length}</p>
        </div>

        <div style={styles.statBox}>
          <h3>Paid Invoices</h3>
          <p>
            {
              invoices.filter(
                (i) => i.status === "Paid"
              ).length
            }
          </p>
        </div>

        <div style={styles.statBox}>
          <h3>Pending Invoices</h3>
          <p>
            {
              invoices.filter(
                (i) => i.status === "Pending"
              ).length
            }
          </p>
        </div>

        <div style={styles.statBox}>
          <h3>Overdue Invoices</h3>
          <p>
            {
              invoices.filter(
                (i) => i.status === "Overdue"
              ).length
            }
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "25px",
  },

  cardContainer: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  card: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  tableContainer: {
    marginTop: "40px",
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.1)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  statsContainer: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginTop: "30px",
  },

  statBox: {
    background: "#f8f9fa",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
  },
};

export default BillingDashboard;