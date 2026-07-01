import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SupplierSidebar from "./Pages/supplier/SupplierSidebar";
import SupplierDashboard from "./Pages/supplier/SupplierDashboard";
import ProductList from "./Pages/supplier/ProductList";
import AddProduct from "./Pages/supplier/AddProduct";
import BulkUploadProducts from "./Pages/supplier/BulkUploadProducts";
import Orders from "./Pages/supplier/Orders";

function SupplierLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <SupplierSidebar />

      <div style={{ flex: 1, padding: "20px", background: "#f5f5f5" }}>
        <Routes>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<SupplierDashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="bulk-upload" element={<BulkUploadProducts />} />
          <Route path="orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/supplier/dashboard" replace />} />
      <Route path="/supplier/*" element={<SupplierLayout />} />
    </Routes>
  );
}