import React, { useEffect, useState } from "react";

const OverdueAmount = () => {
  const [overdueInvoices, setOverdueInvoices] =
    useState([]);

  useEffect(() => {
    const invoices =
      JSON.parse(localStorage.getItem("invoices")) || [];

    setOverdueInvoices(
      invoices.filter(
        (invoice) =>
          invoice.status === "Overdue"
      )
    );
  }, []);

  const totalOverdue =
    overdueInvoices.reduce(
      (sum, invoice) =>
        sum +
        Number(invoice.totalAmount || 0),
      0
    );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Overdue Amount</h1>

      <h2>₹ {totalOverdue.toFixed(2)}</h2>

      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Invoice No</th>
            <th>Vendor</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {overdueInvoices.map(
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

export default OverdueAmount;