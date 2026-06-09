import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

const ViewInvoice = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const invoice = location.state;

  if (!invoice) {
    return (
      <div style={styles.container}>
        <div style={styles.noInvoiceCard}>
          <h2>No Invoice Selected</h2>

          <button
            style={styles.btn}
            onClick={() =>
              navigate("/finance/invoices")
            }
          >
            Back to Invoice List
          </button>
        </div>
      </div>
    );
  }

  const printInvoice = () => {
    window.print();
  };

  const downloadInvoice = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("INVOICE", 80, 20);

    doc.setFontSize(12);

    doc.text(
      `Invoice Number: ${invoice.invoiceNumber}`,
      20,
      40
    );

    doc.text(
      `Invoice Date: ${invoice.invoiceDate}`,
      20,
      50
    );

    doc.text(
      `Due Date: ${invoice.dueDate}`,
      20,
      60
    );

    doc.text(
      `Status: ${invoice.status}`,
      20,
      70
    );

    doc.text(
      `Vendor Name: ${invoice.vendorName}`,
      20,
      90
    );

    doc.text(
      `Supplier Name: ${invoice.supplierName}`,
      20,
      100
    );

    doc.text(
      `Product Details: ${invoice.productDetails}`,
      20,
      120
    );

    doc.text(
      `Quantity: ${invoice.quantity}`,
      20,
      130
    );

    doc.text(
      `Price: ₹ ${invoice.price}`,
      20,
      140
    );

    doc.text(
      `Tax: ${invoice.tax}%`,
      20,
      150
    );

    doc.setFontSize(14);

    doc.text(
      `Total Amount: ₹ ${Number(
        invoice.totalAmount
      ).toFixed(2)}`,
      20,
      170
    );

    doc.save(
      `${invoice.invoiceNumber}.pdf`
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.invoiceCard}>
        <h1 style={styles.title}>
          Invoice Details
        </h1>

        <hr />

        <div style={styles.section}>
          <h3>Invoice Information</h3>

          <p>
            <strong>Invoice Number:</strong>{" "}
            {invoice.invoiceNumber}
          </p>

          <p>
            <strong>Invoice Date:</strong>{" "}
            {invoice.invoiceDate}
          </p>

          <p>
            <strong>Due Date:</strong>{" "}
            {invoice.dueDate}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              style={{
                color:
                  invoice.status === "Paid"
                    ? "green"
                    : invoice.status ===
                      "Pending"
                    ? "orange"
                    : invoice.status ===
                      "Draft"
                    ? "#2563eb"
                    : "red",
                fontWeight: "bold",
              }}
            >
              {invoice.status}
            </span>
          </p>
        </div>

        <div style={styles.section}>
          <h3>Vendor Details</h3>
          <p>{invoice.vendorName}</p>
        </div>

        <div style={styles.section}>
          <h3>Supplier Details</h3>
          <p>{invoice.supplierName}</p>
        </div>

        <div style={styles.section}>
          <h3>Product Details</h3>

          <p>{invoice.productDetails}</p>

          <p>
            <strong>Quantity:</strong>{" "}
            {invoice.quantity}
          </p>

          <p>
            <strong>Price:</strong> ₹{" "}
            {invoice.price}
          </p>

          <p>
            <strong>Tax:</strong>{" "}
            {invoice.tax}%
          </p>
        </div>

        <div style={styles.totalBox}>
          <h2>
            Total Amount : ₹{" "}
            {Number(
              invoice.totalAmount
            ).toFixed(2)}
          </h2>
        </div>

        <div style={styles.btnContainer}>
          <button
            style={styles.btn}
            onClick={printInvoice}
          >
            Print Invoice
          </button>

          <button
            style={{
              ...styles.btn,
              background: "#16a34a",
            }}
            onClick={downloadInvoice}
          >
            Download PDF
          </button>

          <button
            style={{
              ...styles.btn,
              background: "#64748b",
            }}
            onClick={() =>
              navigate("/finance/invoices")
            }
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    padding: "30px",
    background: "#f1f5f9",
  },

  invoiceCard: {
    maxWidth: "900px",
    margin: "0 auto",
    background: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.1)",
  },

  noInvoiceCard: {
    maxWidth: "500px",
    margin: "100px auto",
    background: "#fff",
    padding: "30px",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.1)",
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
  },

  section: {
    marginTop: "20px",
    paddingBottom: "10px",
    borderBottom:
      "1px solid #e2e8f0",
  },

  totalBox: {
    marginTop: "25px",
    padding: "20px",
    background: "#dcfce7",
    borderRadius: "10px",
    textAlign: "right",
  },

  btnContainer: {
    display: "flex",
    gap: "15px",
    marginTop: "25px",
    flexWrap: "wrap",
  },

  btn: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default ViewInvoice;
