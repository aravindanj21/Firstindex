import React, { useEffect, useState } from "react";

const PendingAmount = () => {
  const [pendingInvoices, setPendingInvoices] =
    useState([]);

  useEffect(() => {
    const invoices =
      JSON.parse(localStorage.getItem("invoices")) || [];

    setPendingInvoices(
      invoices.filter(
        (invoice) =>
          invoice.status === "Pending"
      )
    );
  }, []);

  const totalPending =
    pendingInvoices.reduce(
      (sum, invoice) =>
        sum +
        Number(invoice.totalAmount || 0),
      0
    );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pending Amount</h1>

      <h2>₹ {totalPending.toFixed(2)}</h2>

      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Invoice No</th>
            <th>Vendor</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {pendingInvoices.map(
            (invoice, index) => (
              <tr key={index}>
                <td>
                  {invoice.invoiceNumber}
                </td>
                <td>
                  {invoice.vendorName}
                </td>
                <td>
                  ₹ {invoice.totalAmount}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PendingAmount;