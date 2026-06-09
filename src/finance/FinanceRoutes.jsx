import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import CreateInvoice from "./invoice/CreateInvoice";
import InvoiceList from "./invoice/InvoiceList";
import ViewInvoice from "./invoice/ViewInvoice";

import BillingDashboard from "./billing/BillingDashboard";
import RevenueOverview from "./billing/RevenueOverview";
import PaidAmount from "./billing/PaidAmount";
import PendingAmount from "./billing/PendingAmount";
import OverdueAmount from "./billing/OverdueAmount";

import PaymentHistory from "./payments/PaymentHistory";
import PaymentStatus from "./payments/PaymentStatus";
import TransactionDetails from "./payments/TransactionDetails";

import ReportsDashboard from "./reports/ReportsDashboard";

const FinanceRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/finance/create-invoice" />}
      />

     
      <Route
        path="/finance/create-invoice"
        element={<CreateInvoice />}
      />

      <Route
        path="/finance/invoices"
        element={<InvoiceList />}
      />

      <Route
        path="/finance/view-invoice"
        element={<ViewInvoice />}
      />

      
      <Route
        path="/finance/billing"
        element={<BillingDashboard />}
      />

      <Route
        path="/finance/revenue-overview"
        element={<RevenueOverview />}
      />

      <Route
        path="/finance/paid-amount"
        element={<PaidAmount />}
      />

      <Route
        path="/finance/pending-amount"
        element={<PendingAmount />}
      />

      <Route
        path="/finance/overdue-amount"
        element={<OverdueAmount />}
      />

      
      <Route
        path="/finance/payments"
        element={<PaymentHistory />}
      />

      <Route
        path="/finance/payment-status"
        element={<PaymentStatus />}
      />

      <Route
        path="/finance/transaction-details"
        element={<TransactionDetails />}
      />

      
      <Route
        path="/finance/reports"
        element={<ReportsDashboard />}
      />

      
      <Route
        path="*"
        element={
          <div
            style={{
              textAlign: "center",
              marginTop: "50px",
            }}
          >
            <h1>404</h1>
            <h2>Page Not Found</h2>
          </div>
        }
      />
    </Routes>
  );
};

export default FinanceRoutes;