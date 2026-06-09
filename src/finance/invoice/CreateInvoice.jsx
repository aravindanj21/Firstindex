import React, { useState } from "react";
import "./CreateInvoice.css";

const CreateInvoice = () => {
  const [invoice, setInvoice] = useState({
    invoiceNumber: `INV-${Date.now()}`,
    vendorName: "",
    supplierName: "",
    productDetails: "",
    quantity: "",
    price: "",
    tax: "",
    invoiceDate: "",
    dueDate: "",
    status: "Draft",
  });

  const handleChange = (e) => {
    setInvoice({
      ...invoice,
      [e.target.name]: e.target.value,
    });
  };

  const calculateTotal = () => {
    const qty = Number(invoice.quantity) || 0;
    const price = Number(invoice.price) || 0;
    const tax = Number(invoice.tax) || 0;

    const subtotal = qty * price;
    const taxAmount = (subtotal * tax) / 100;

    return subtotal + taxAmount;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const invoiceData = {
      ...invoice,
      totalAmount: calculateTotal(),
    };

    const existingInvoices =
      JSON.parse(localStorage.getItem("invoices")) || [];

    existingInvoices.push(invoiceData);

    localStorage.setItem(
      "invoices",
      JSON.stringify(existingInvoices)
    );

    alert("Invoice Created Successfully");

    setInvoice({
      invoiceNumber: `INV-${Date.now()}`,
      vendorName: "",
      supplierName: "",
      productDetails: "",
      quantity: "",
      price: "",
      tax: "",
      invoiceDate: "",
      dueDate: "",
      status: "Draft",
    });
  };

  return (
  <div className="invoice-container">
    <div className="invoice-card">
      <h2 className="invoice-title">Create Invoice</h2>

      <form onSubmit={handleSubmit} className="invoice-form">
        <input
          type="text"
          value={invoice.invoiceNumber}
          readOnly
        />

        <input
          type="text"
          name="vendorName"
          placeholder="Vendor Name"
          value={invoice.vendorName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="supplierName"
          placeholder="Supplier Name"
          value={invoice.supplierName}
          onChange={handleChange}
          required
        />

        <textarea
          name="productDetails"
          placeholder="Product Details"
          value={invoice.productDetails}
          onChange={handleChange}
          className="full-width"
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={invoice.quantity}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={invoice.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="tax"
          placeholder="Tax %"
          value={invoice.tax}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="invoiceDate"
          value={invoice.invoiceDate}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="dueDate"
          value={invoice.dueDate}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={invoice.status}
          onChange={handleChange}
          className="full-width"
        >
          <option>Draft</option>
          <option>Sent</option>
          <option>Paid</option>
          <option>Pending</option>
          <option>Overdue</option>
        </select>

        <div className="total-box">
          <h3>
            Total Amount: ₹ {calculateTotal().toFixed(2)}
          </h3>
        </div>

        <button
          type="submit"
          className="submit-btn"
        >
          Create Invoice
        </button>
      </form>
    </div>
  </div>
);
};
export default CreateInvoice;

