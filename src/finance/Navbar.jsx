import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <h2> Invoice & Billing System</h2>
      </div>

      <div className="navbar-right">
        <input
          type="text"
          placeholder="Search invoices..."
          className="search-box"
        />

        <button className="nav-btn">
          🔔
        </button>

        <button className="nav-btn">
          ⚙️
        </button>

        <div className="profile-card">
          <div className="avatar">A</div>
          <span>Admin</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;