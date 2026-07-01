import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/SupplierDashboard.css";

const SupplierDashboard = () => {
  const navigate = useNavigate();

  const supplierName =
    localStorage.getItem("supplier_name") || "Supplier";

  return (
    <div className="supplier-dashboard">

      <div className="dashboard-header">
        <h2>Welcome, {supplierName}</h2>
        <p>Supplier Dashboard</p>
      </div>

      <div className="dashboard-cards">

        <div
          className="dashboard-card"
          onClick={() => navigate("/supplier/products")}
        >
          <h3>📦 My Products</h3>
          <p>View and manage all your products.</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/supplier/add-product")}
        >
          <h3>➕ Add Product</h3>
          <p>Add a new product to your catalog.</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/supplier/bulk-upload")}
        >
          <h3>📄 Bulk Upload</h3>
          <p>Upload products using Excel or CSV.</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/supplier/orders")}
        >
          <h3>🛒 Orders</h3>
          <p>View customer orders.</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/supplier/profile")}
        >
          <h3>👤 My Profile</h3>
          <p>Update supplier profile information.</p>
        </div>

      </div>

    </div>
  );
};

export default SupplierDashboard;