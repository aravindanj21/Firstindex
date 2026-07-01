import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Orders.css";

const API = "http://127.0.0.1:8000/api/orders";

const Orders = () => {

    const supplierId = localStorage.getItem("supplier_id");

    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] =
        useState("All");

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchOrders();

    }, []);

    useEffect(() => {

        let data = [...orders];

        if (statusFilter !== "All") {

            data = data.filter(
                order =>
                    order.status === statusFilter
            );

        }

        if (search !== "") {

            data = data.filter(order =>
                order.customer_name
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );

        }

        setFilteredOrders(data);

    }, [orders, search, statusFilter]);

    const fetchOrders = async () => {

        try {

            setLoading(true);

            const response =
                await axios.get(
                    `${API}/${supplierId}`
                );

            setOrders(response.data);

        } catch (error) {

            console.error(error);

            alert("Unable to load orders.");

        } finally {

            setLoading(false);

        }

    };

    const updateStatus = async (
        orderId,
        status
    ) => {

        try {

            await axios.put(
                `${API}/${orderId}`,
                {
                    status,
                }
            );

            fetchOrders();

        } catch (error) {

            console.error(error);

            alert("Status update failed.");

        }

    };

    if (loading) {

        return <h3>Loading Orders...</h3>;

    }

    return (

        <div className="orders-container">

            <div className="orders-header">

                <h2>Orders</h2>

                <button
                    onClick={fetchOrders}
                >
                    Refresh
                </button>

            </div>

            <div className="orders-filters">

                <input
                    type="text"
                    placeholder="Search Customer..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />

                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(
                            e.target.value
                        )
                    }
                >
                    <option>
                        All
                    </option>

                    <option>
                        Pending
                    </option>

                    <option>
                        Processing
                    </option>

                    <option>
                        Shipped
                    </option>

                    <option>
                        Delivered
                    </option>

                    <option>
                        Cancelled
                    </option>

                </select>

            </div>

             <table className="orders-table">

                <thead>

                    <tr>

                        <th>Order ID</th>

                        <th>Customer</th>

                        <th>Product</th>

                        <th>Quantity</th>

                        <th>Total Amount</th>

                        <th>Order Date</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {filteredOrders.length === 0 ? (

                        <tr>

                            <td colSpan="8">
                                No Orders Found
                            </td>

                        </tr>

                    ) : (

                        filteredOrders.map((order) => (

                            <tr key={order.order_id}>

                                <td>{order.order_id}</td>

                                <td>{order.customer_name}</td>

                                <td>{order.product_name}</td>

                                <td>{order.quantity}</td>

                                <td>₹ {order.total_amount}</td>

                                <td>
                                    {new Date(
                                        order.order_date
                                    ).toLocaleDateString()}
                                </td>

                                <td>

                                    <select
                                        value={order.status}
                                        onChange={(e) =>
                                            updateStatus(
                                                order.order_id,
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="Pending">
                                            Pending
                                        </option>

                                        <option value="Processing">
                                            Processing
                                        </option>

                                        <option value="Shipped">
                                            Shipped
                                        </option>

                                        <option value="Delivered">
                                            Delivered
                                        </option>

                                        <option value="Cancelled">
                                            Cancelled
                                        </option>

                                    </select>

                                </td>

                                <td>

                                    <button
                                        className="refresh-btn"
                                        onClick={fetchOrders}
                                    >
                                        Refresh
                                    </button>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

};

export default Orders;