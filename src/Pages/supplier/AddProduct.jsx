import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AddProduct.css";

const API = "http://127.0.0.1:8000/api";

const AddProduct = () => {
  const navigate = useNavigate();

  const supplierId = localStorage.getItem("supplier_id");

  const [categories, setCategories] = useState([]);

  const [product, setProduct] = useState({
    product_name: "",
    category_id: "",
    description: "",
    price: "",
    stock: "",
    unit: "",
    status: "Active",
  });

  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${API}/categories`
      );

      setCategories(response.data);

    } catch (error) {
      console.error(error);
      alert("Unable to load categories.");
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };



   return (
    <div className="add-product-container">

      <div className="add-product-card">

        <h2>Add New Product</h2>

        <form className="product-form">

          <div className="form-group">

            <label>Product Name</label>

            <input
              type="text"
              name="product_name"
              value={product.product_name}
              onChange={handleChange}
              placeholder="Enter Product Name"
              required
            />

          </div>

          <div className="form-group">

            <label>Category</label>

            <select
              name="category_id"
              value={product.category_id}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Category
              </option>

              {categories.map((category) => (

                <option
                  key={category.category_id}
                  value={category.category_id}
                >
                  {category.category_name}
                </option>

              ))}

            </select>

          </div>

          <div className="form-group">

            <label>Description</label>

            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter Product Description"
            />

          </div>

          <div className="form-row">

            <div className="form-group">

              <label>Price</label>

              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />

            </div>

            <div className="form-group">

              <label>Stock Quantity</label>

              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                placeholder="0"
                min="0"
                required
              />

            </div>

          </div>

          <div className="form-row">

            <div className="form-group">

              <label>Unit</label>

              <input
                type="text"
                name="unit"
                value={product.unit}
                onChange={handleChange}
                placeholder="Kg / Litre / Piece"
                required
              />

            </div>

            <div className="form-group">

              <label>Status</label>

              <select
                name="status"
                value={product.status}
                onChange={handleChange}
              >
                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>

              </select>

            </div>

          </div>

          <div className="form-group">

            <label>Product Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
            />

          </div>

          <div className="button-group">

            <button
              type="button"
              className="save-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Product"}
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/supplier/products")}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );

  async function handleSubmit() {

    if (
      !product.product_name ||
      !product.category_id ||
      !product.price ||
      !product.stock ||
      !product.unit
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("supplier_id", supplierId);
      formData.append("product_name", product.product_name);
      formData.append("category_id", product.category_id);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("unit", product.unit);
      formData.append("status", product.status);

      if (image) {
        formData.append("image", image);
      }

      await axios.post(
        "http://127.0.0.1:8000/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Product added successfully.");

      navigate("/supplier/products");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.detail ||
        "Failed to add product."
      );

    } finally {

      setLoading(false);

    }

  }

};

export default AddProduct;