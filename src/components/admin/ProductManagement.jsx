import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProducts(response.data);
      setError(null);
    } catch (error) {
      console.error(
        "Product fetch error:",
        error.response?.data?.message || error.message
      );
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
    });
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProductUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/api/products/${currentProduct.id}`,
        formData
      );

      setProducts(
        products.map((product) =>
          product.id === currentProduct.id ? response.data : product
        )
      );

      toast.success("Product updated successfully!");
      setShowEditModal(false);
    } catch (error) {
      handleError("Failed to update product", error);
    }
  };

  const handleProductDelete = async (productId) => {
    console.log("Deleting product ID:", productId);
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:8080/api/products/${productId}`);
        toast.success("Product deleted successfully!");
        fetchProducts();
      } catch (error) {
        toast.error("Failed to delete product");
        console.error("Delete error:", error);
      }
    }
  };

  const handleError = (message, error) => {
    console.error(error);
    toast.error(message);
    setError(message);
  };

  if (loading)
    return <div className="text-center mt-4">Loading products...</div>;
  if (error) return <div className="alert alert-danger mt-4">{error}</div>;

  return (
    <div className="product-management p-4">
      <h3 className="mb-4">Product Management</h3>
      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowEditModal(true)}
      >
        Add New Product
      </button>

      <div className="list-group">
        {products.map((product) => (
          <div
            key={product.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h5>{product.name}</h5>
              <p className="mb-0">{product.description}</p>
              <small>R{product.price.toFixed(2)}</small>
            </div>
            <div>
              <button
                className="btn btn-sm btn-outline-primary me-2"
                onClick={() => handleEditClick(product)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleProductDelete(product.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Add Modal */}
      {showEditModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleProductUpdate}>
                <div className="modal-header">
                  <h5 className="modal-title">
                    {currentProduct ? "Edit Product" : "New Product"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowEditModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Product Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowEditModal(false)}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {currentProduct ? "Save Changes" : "Create Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
