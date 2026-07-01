import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/ProductList.css";

const API = "http://127.0.0.1:8000/api/products";

const ProductList = () => {
  const navigate = useNavigate();

  const supplierId = localStorage.getItem("supplier_id");

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.product_name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [search, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API}/${supplierId}`
      );

      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/${id}`);

      alert("Product deleted successfully.");

      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Delete failed.");
    }
  };

  if (loading) {
    return <h3>Loading products...</h3>;
  }

  return (
    <div className="product-list-container">

      <div className="product-header">

        <h2>My Products</h2>

        <div className="header-buttons">

          <button
            onClick={() =>
              navigate("/supplier/add-product")
            }
          >
            + Add Product
          </button>

          <button
            onClick={() =>
              navigate("/supplier/bulk-upload")
            }
          >
            Bulk Upload
          </button>

          <button onClick={fetchProducts}>
            Refresh
          </button>

        </div>

      </div>

      <input
        type="text"
        className="search-box"
        placeholder="Search Product..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <table className="product-table">

        <thead>

          <tr>

            <th>Image</th>

            <th>Product Name</th>

            <th>Category</th>

            <th>Description</th>

            <th>Price</th>

            <th>Stock</th>

            <th>Unit</th>

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {filteredProducts.length === 0 ? (

            <tr>

              <td colSpan="9">
                No products found.
              </td>

            </tr>

          ) : (

            filteredProducts.map((product) => (

              <tr key={product.product_id}>

                <td>

                  {product.image_url ? (

                    <img
                      src={`http://127.0.0.1:8000/${product.image_url}`}
                      alt={product.product_name}
                      className="product-image"
                    />

                  ) : (

                    "No Image"

                  )}

                </td>

                <td>{product.product_name}</td>

                <td>{product.category}</td>

                <td>{product.description}</td>

                <td>₹ {product.price}</td>

                <td>{product.stock}</td>

                <td>{product.unit}</td>

                <td>

                  <span
                    className={
                      product.status === "Active"
                        ? "status-active"
                        : "status-inactive"
                    }
                  >
                    {product.status}
                  </span>

                </td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() =>
                      navigate(
                        `/supplier/edit-product/${product.product_id}`
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteProduct(product.product_id)
                    }
                  >
                    Delete
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

export default ProductList;