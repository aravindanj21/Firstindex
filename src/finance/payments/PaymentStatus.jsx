import React, { useEffect, useState } from "react";

const PaymentStatus = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const storedPayments =
      JSON.parse(localStorage.getItem("payments")) || [];

    setPayments(storedPayments);
  }, []);

  const paidCount = payments.filter(
    (p) => p.status === "Paid"
  ).length;

  const pendingCount = payments.filter(
    (p) => p.status === "Pending"
  ).length;

  const failedCount = payments.filter(
    (p) => p.status === "Failed"
  ).length;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Payment Status</h1>

      <div style={styles.cards}>
        <div style={styles.card}>
          <h3>Paid</h3>
          <h2>{paidCount}</h2>
        </div>

        <div style={styles.card}>
          <h3>Pending</h3>
          <h2>{pendingCount}</h2>
        </div>

        <div style={styles.card}>
          <h3>Failed</h3>
          <h2>{failedCount}</h2>
        </div>
      </div>
    </div>
  );
};

const styles = {
  cards: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    minWidth: "200px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
};

export default PaymentStatus;