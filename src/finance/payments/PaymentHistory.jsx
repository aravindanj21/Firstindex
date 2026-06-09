import React, { useEffect, useState } from "react";
import "./paymentHistory.css";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    transactionId: "",
    invoiceNumber: "",
    vendorName: "",
    amount: "",
    paymentMethod: "UPI",
    paymentDate: "",
    status: "Paid",
  });

  useEffect(() => {
    const storedPayments =
      JSON.parse(localStorage.getItem("payments")) || [];
    setPayments(storedPayments);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addPayment = (e) => {
    e.preventDefault();

    const newPayment = {
      ...formData,
      transactionId: `TXN-${Date.now()}`,
    };

    const updatedPayments = [...payments, newPayment];

    setPayments(updatedPayments);

    localStorage.setItem(
      "payments",
      JSON.stringify(updatedPayments)
    );

    setFormData({
      transactionId: "",
      invoiceNumber: "",
      vendorName: "",
      amount: "",
      paymentMethod: "UPI",
      paymentDate: "",
      status: "Paid",
    });

    alert("Payment Added Successfully");
  };

  const deletePayment = (transactionId) => {
    const updatedPayments = payments.filter(
      (payment) =>
        payment.transactionId !== transactionId
    );

    setPayments(updatedPayments);

    localStorage.setItem(
      "payments",
      JSON.stringify(updatedPayments)
    );
  };

  const filteredPayments = payments.filter(
    (payment) =>
      payment.invoiceNumber
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      payment.vendorName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      payment.transactionId
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const paidAmount = payments
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const pendingAmount = payments
    .filter((p) => p.status === "Pending")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const failedAmount = payments
    .filter((p) => p.status === "Failed")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <div className="payment-container">
      <div className="page-header">
        <h1>Payment History</h1>
        <p>Manage and track all invoice payments</p>
      </div>

      
      <div className="summary-cards">
        <div className="summary-card paid-card">
          <h3>Paid Amount</h3>
          <h2>₹ {paidAmount.toFixed(2)}</h2>
        </div>

        <div className="summary-card pending-card">
          <h3>Pending Amount</h3>
          <h2>₹ {pendingAmount.toFixed(2)}</h2>
        </div>

        <div className="summary-card failed-card">
          <h3>Failed Amount</h3>
          <h2>₹ {failedAmount.toFixed(2)}</h2>
        </div>
      </div>

      
      <div className="payment-form-box">
        <h2>Add New Payment</h2>

        <form onSubmit={addPayment}>
          <input
            type="text"
            name="invoiceNumber"
            placeholder="Invoice Number"
            value={formData.invoiceNumber}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="vendorName"
            placeholder="Vendor Name"
            value={formData.vendorName}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="paymentDate"
            value={formData.paymentDate}
            onChange={handleChange}
            required
          />

          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="UPI">UPI</option>
            <option value="Bank Transfer">
              Bank Transfer
            </option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>

          <button type="submit">
            Add Payment
          </button>
        </form>
      </div>

      
      <div className="search-section">
        <input
          type="text"
          className="search-box"
          placeholder="Search by Invoice, Vendor, Transaction ID..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

     
      <div className="table-container">
        <table className="payment-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Invoice No</th>
              <th>Vendor Name</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Payment Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map(
                (payment, index) => (
                  <tr key={index}>
                    <td>
                      {payment.transactionId}
                    </td>

                    <td>
                      {payment.invoiceNumber}
                    </td>

                    <td>
                      {payment.vendorName}
                    </td>

                    <td>
                      ₹{" "}
                      {Number(
                        payment.amount
                      ).toLocaleString()}
                    </td>

                    <td>
                      {payment.paymentMethod}
                    </td>

                    <td>
                      {payment.paymentDate}
                    </td>

                    <td>
                      <span
                        className={`status-badge ${
                          payment.status ===
                          "Paid"
                            ? "paid"
                            : payment.status ===
                              "Pending"
                            ? "pending"
                            : "failed"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="delete-btn"
                        onClick={() =>
                          deletePayment(
                            payment.transactionId
                          )
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="no-data"
                >
                  No Payments Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;