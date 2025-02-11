import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import ProductManagement from "../components/ProductManagement";
import OrderManagement from "../components/OrderManagement";
import UserManagement from "../components/UserManagement";
import { AuthContext } from "../AuthContext";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [activeManagerTab, setActiveManagerTab] = useState("products");
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect non-admin users away from this page
    if (!user || user.role !== "ADMIN") {
      navigate("/");
      return;
    }
    fetchProducts();
  }, [user, navigate]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/products");
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(
        "Unable to connect to the backend service. Please check if the server is running."
      );
    }
  };

  const handleProductUpdate = async (productId, updatedData) => {
    try {
      await axios.put(
        `http://localhost:8080/api/products/${productId}`,
        updatedData
      );
      fetchProducts();
      toast.success("Product updated successfully!");
    } catch (err) {
      console.error("Failed to update product", err);
      toast.error("Failed to update product");
    }
  };

  const handleProductDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await axios.delete(`http://localhost:8080/api/products/${productId}`);
      fetchProducts();
      toast.success("Product deleted successfully!");
    } catch (err) {
      console.error("Failed to delete product", err);
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="manager-panel mt-5">
      <div className="container">
        <h2 className="mb-4">Management Dashboard</h2>
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link ${
                activeManagerTab === "products" ? "active" : ""
              }`}
              onClick={() => setActiveManagerTab("products")}
            >
              Products
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link ${
                activeManagerTab === "orders" ? "active" : ""
              }`}
              onClick={() => setActiveManagerTab("orders")}
            >
              Orders
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link ${
                activeManagerTab === "users" ? "active" : ""
              }`}
              onClick={() => setActiveManagerTab("users")}
            >
              Users
            </button>
          </li>
        </ul>

        {activeManagerTab === "products" && (
          <ProductManagement
            products={products}
            onUpdate={handleProductUpdate}
            onDelete={handleProductDelete}
          />
        )}
        {activeManagerTab === "orders" && <OrderManagement />}
        {activeManagerTab === "users" && <UserManagement />}

        {error && (
          <div className="alert alert-danger text-center mt-4">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
