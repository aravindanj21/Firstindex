import React, { useEffect, useState } from "react";

const ReportsDashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const storedInvoices =
      JSON.parse(localStorage.getItem("invoices")) || [];

    const storedPayments =
      JSON.parse(localStorage.getItem("payments")) || [];

    setInvoices(storedInvoices);
    setPayments(storedPayments);
  }, []);

  

  const totalInvoices = invoices.length;

  const paidInvoices = invoices.filter(
    (invoice) => invoice.status === "Paid"
  ).length;

  const pendingInvoices = invoices.filter(
    (invoice) => invoice.status === "Pending"
  ).length;

  const overdueInvoices = invoices.filter(
    (invoice) => invoice.status === "Overdue"
  ).length;

  
  const totalRevenue = invoices.reduce(
    (sum, invoice) =>
      sum + Number(invoice.totalAmount || 0),
    0
  );

  const paidRevenue = invoices
    .filter((invoice) => invoice.status === "Paid")
    .reduce(
      (sum, invoice) =>
        sum + Number(invoice.totalAmount || 0),
      0
    );

  const pendingRevenue = invoices
    .filter((invoice) => invoice.status === "Pending")
    .reduce(
      (sum, invoice) =>
        sum + Number(invoice.totalAmount || 0),
      0
    );

  const overdueRevenue = invoices
    .filter((invoice) => invoice.status === "Overdue")
    .reduce(
      (sum, invoice) =>
        sum + Number(invoice.totalAmount || 0),
      0
    );

  

  const totalPayments = payments.length;

  const successfulPayments = payments.filter(
    (payment) => payment.status === "Paid"
  ).length;

  const failedPayments = payments.filter(
    (payment) => payment.status === "Failed"
  ).length;

  const pendingPayments = payments.filter(
    (payment) => payment.status === "Pending"
  ).length;

  const exportReport = () => {
    const reportData = `
======================================
INVOICE & BILLING REPORT
======================================

Invoice Statistics

Total Invoices : ${totalInvoices}
Paid Invoices : ${paidInvoices}
Pending Invoices : ${pendingInvoices}
Overdue Invoices : ${overdueInvoices}

======================================

Revenue Statistics

Total Revenue : ₹${totalRevenue}

Paid Revenue : ₹${paidRevenue}

Pending Revenue : ₹${pendingRevenue}

Overdue Revenue : ₹${overdueRevenue}

======================================

Payment Statistics

Total Payments : ${totalPayments}

Successful Payments : ${successfulPayments}

Pending Payments : ${pendingPayments}

Failed Payments : ${failedPayments}

====================================
`;

    const blob = new Blob(
      [reportData],
      { type: "text/plain" }
    );

    const link =
      document.createElement("a");

    link.href =
      URL.createObjectURL(blob);

    link.download =
      "Invoice_Report.txt";

    link.click();
  };

  return (
    <div style={styles.container}>
      <h1>Reports Dashboard</h1>

      
      <h2>Invoice Reports</h2>

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h3>Total Invoices</h3>
          <h1>{totalInvoices}</h1>
        </div>

        <div style={styles.card}>
          <h3>Paid Invoices</h3>
          <h1>{paidInvoices}</h1>
        </div>

        <div style={styles.card}>
          <h3>Pending Invoices</h3>
          <h1>{pendingInvoices}</h1>
        </div>

        <div style={styles.card}>
          <h3>Overdue Invoices</h3>
          <h1>{overdueInvoices}</h1>
        </div>
      </div>

     

      <h2>Revenue Reports</h2>

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h3>Total Revenue</h3>
          <h2>
            ₹ {totalRevenue.toFixed(2)}
          </h2>
        </div>

        <div style={styles.card}>
          <h3>Paid Revenue</h3>
          <h2>
            ₹ {paidRevenue.toFixed(2)}
          </h2>
        </div>

        <div style={styles.card}>
          <h3>Pending Revenue</h3>
          <h2>
            ₹ {pendingRevenue.toFixed(2)}
          </h2>
        </div>

        <div style={styles.card}>
          <h3>Overdue Revenue</h3>
          <h2>
            ₹ {overdueRevenue.toFixed(2)}
          </h2>
        </div>
      </div>

      
      <h2>Payment Reports</h2>

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h3>Total Payments</h3>
          <h1>{totalPayments}</h1>
        </div>

        <div style={styles.card}>
          <h3>Successful</h3>
          <h1>{successfulPayments}</h1>
        </div>

        <div style={styles.card}>
          <h3>Pending</h3>
          <h1>{pendingPayments}</h1>
        </div>

        <div style={styles.card}>
          <h3>Failed</h3>
          <h1>{failedPayments}</h1>
        </div>
      </div>

      

      <div style={styles.tableSection}>
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
              invoices
                .slice(-5)
                .reverse()
                .map((invoice, index) => (
                  <tr key={index}>
                    <td>
                      {invoice.invoiceNumber}
                    </td>

                    <td>
                      {invoice.vendorName}
                    </td>

                    <td>
                      {invoice.supplierName}
                    </td>

                    <td>
                      ₹
                      {Number(
                        invoice.totalAmount
                      ).toFixed(2)}
                    </td>

                    <td>
                      {invoice.status}
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
                  No Invoice Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      
      <div style={{ marginTop: "30px" }}>
        <button
          onClick={exportReport}
          style={styles.exportBtn}
        >
          Export Report
        </button>
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
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "35px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  tableSection: {
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

  exportBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default ReportsDashboard;