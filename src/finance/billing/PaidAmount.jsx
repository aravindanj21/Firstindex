import React, { useEffect, useState } from "react";

const PaidAmount = () => {
  const [paidInvoices, setPaidInvoices] = useState([]);

  useEffect(() => {
    const invoices =
      JSON.parse(localStorage.getItem("invoices")) || [];

    setPaidInvoices(
      invoices.filter(
        (invoice) => invoice.status === "Paid"
      )
    );
  }, []);

  const totalPaid = paidInvoices.reduce(
    (sum, invoice) =>
      sum + Number(invoice.totalAmount || 0),
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Paid Amount</h1>

      <h2>₹ {totalPaid.toFixed(2)}</h2>

      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Invoice No</th>
            <th>Vendor</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {paidInvoices.map((invoice, index) => (
            <tr key={index}>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.vendorName}</td>
              <td>
                ₹ {invoice.totalAmount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaidAmount;