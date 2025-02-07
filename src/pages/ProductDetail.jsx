import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError("Product not found or server error");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      if (
        window.confirm(
          "You need to log in to add items to the cart. Log in now?"
        )
      ) {
        navigate("/login");
      }
      return;
    }

    try {
      const cartItem = {
        user: { id: userId },
        product: { id: product.id },
        quantity: 1,
      };
      await axios.post("http://localhost:8080/api/cart", cartItem);
      navigate("/cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  if (loading)
    return <div className="container text-center py-5">Loading...</div>;
  if (error)
    return (
      <div className="container text-center py-5 text-danger">{error}</div>
    );
  if (!product)
    return <div className="container text-center py-5">Product not found</div>;

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={`/images/product-${product.id}.png`}
            className="img-fluid rounded-3 shadow-lg"
            alt={product.name}
          />
        </div>
        <div className="col-md-6">
          <h1 className="display-5">{product.name}</h1>
          <p className="lead">${product.price.toFixed(2)}</p>
          <p className="text-muted">
            {product.description || "No description available"}
          </p>

          <button onClick={addToCart} className="btn btn-dark btn-lg me-3">
            Add to Cart
          </button>

          <Link to="/" className="btn btn-outline-secondary btn-lg">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
