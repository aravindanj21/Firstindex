import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = () => {
    const storedInvoices =
      JSON.parse(localStorage.getItem("invoices")) || [];

    setInvoices(storedInvoices);
  };

  const deleteInvoice = (invoiceNumber) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this invoice?"
    );

    if (!confirmDelete) return;

    const updatedInvoices = invoices.filter(
      (invoice) =>
        invoice.invoiceNumber !== invoiceNumber
    );

    setInvoices(updatedInvoices);

    localStorage.setItem(
      "invoices",
      JSON.stringify(updatedInvoices)
    );

    alert("Invoice Deleted Successfully");
  };

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.invoiceNumber
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      invoice.vendorName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      invoice.supplierName
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  const totalAmount = invoices.reduce(
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
    .filter(
      (invoice) =>
        invoice.status === "Pending" ||
        invoice.status === "Overdue"
    )
    .reduce(
      (sum, invoice) =>
        sum + Number(invoice.totalAmount || 0),
      0
    );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Invoice List</h2>

        <button
          style={styles.createBtn}
          onClick={() =>
            navigate("/finance/create-invoice")
          }
        >
          + Create Invoice
        </button>
      </div>

      
      <div style={styles.summaryContainer}>
        <div style={styles.card}>
          <h3>Total Invoices</h3>
          <p>{invoices.length}</p>
        </div>

        <div style={styles.card}>
          <h3>Total Amount</h3>
          <p>₹ {totalAmount.toFixed(2)}</p>
        </div>

        <div style={styles.card}>
          <h3>Paid Amount</h3>
          <p>₹ {paidAmount.toFixed(2)}</p>
        </div>

        <div style={styles.card}>
          <h3>Pending Amount</h3>
          <p>₹ {pendingAmount.toFixed(2)}</p>
        </div>
      </div>

      

      <input
        type="text"
        placeholder="Search Invoice Number, Vendor, Supplier..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={styles.searchInput}
      />

      

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Vendor</th>
              <th>Supplier</th>
              <th>Amount</th>
              <th>Invoice Date</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map(
                (invoice, index) => (
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
                      {invoice.invoiceDate}
                    </td>

                    <td>
                      {invoice.dueDate}
                    </td>

                    <td>
                      <span
                        style={{
                          ...styles.status,
                          background:
                            invoice.status ===
                            "Paid"
                              ? "#dcfce7"
                              : invoice.status ===
                                "Pending"
                              ? "#fef3c7"
                              : invoice.status ===
                                "Draft"
                              ? "#dbeafe"
                              : "#fee2e2",
                          color:
                            invoice.status ===
                            "Paid"
                              ? "green"
                              : invoice.status ===
                                "Pending"
                              ? "#b45309"
                              : invoice.status ===
                                "Draft"
                              ? "#2563eb"
                              : "red",
                        }}
                      >
                        {invoice.status}
                      </span>
                    </td>

                    <td>
                      <div
                        style={
                          styles.actionButtons
                        }
                      >
                        <button
                          style={
                            styles.viewBtn
                          }
                          onClick={() =>
                            navigate(
                              "/finance/view-invoice",
                              {
                                state:
                                  invoice,
                              },
                            )
                          }
                        >
                          View
                        </button>

                        <button
                          style={
                            styles.deleteBtn
                          }
                          onClick={() =>
                            deleteInvoice(
                              invoice.invoiceNumber
                            )
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan="8"
                  style={
                    styles.noData
                  }
                >
                  No Invoices Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "25px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  createBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  summaryContainer: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "25px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.1)",
  },

  searchInput: {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  tableContainer: {
    overflowX: "auto",
    background: "#fff",
    borderRadius: "10px",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.1)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  status: {
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "bold",
  },

  actionButtons: {
    display: "flex",
    gap: "10px",
  },

  viewBtn: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  noData: {
    textAlign: "center",
    padding: "20px",
    fontWeight: "bold",
  },
};

export default InvoiceList;


