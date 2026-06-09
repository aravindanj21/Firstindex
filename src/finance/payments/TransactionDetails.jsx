import React, { useEffect, useState } from "react";

const TransactionDetails = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const storedPayments =
      JSON.parse(localStorage.getItem("payments")) || [];

    setPayments(storedPayments);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Transaction Details</h1>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Invoice</th>
            <th>Vendor</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment, index) => (
            <tr key={index}>
              <td>{payment.transactionId}</td>
              <td>{payment.invoiceNumber}</td>
              <td>{payment.vendorName}</td>
              <td>₹ {payment.amount}</td>
              <td>{payment.paymentMethod}</td>
              <td>{payment.paymentDate}</td>
              <td>{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};

export default TransactionDetails;