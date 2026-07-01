import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./SupplierSidebar.css";

const SupplierSidebar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("supplier_id");
        localStorage.removeItem("token");

        navigate("/login");

    };

    return (

        <div className="supplier-sidebar">

            <div className="sidebar-header">

                <h2>Supplier Panel</h2>

            </div>

            <ul className="sidebar-menu">

                <li>
                    <NavLink to="/supplier/dashboard">
                         Dashboard
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/supplier/profile">
                        Profile
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/supplier/products">
                      My Products
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/supplier/add-product">
                        Add Product
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/supplier/bulk-upload">
                         Bulk Upload Products
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/supplier/orders">
                         Orders
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/supplier/settings">
                         Settings
                    </NavLink>
                </li>

            </ul>

            <div className="sidebar-footer">

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                     Logout
                </button>

            </div>

        </div>

    );

};

export default SupplierSidebar;