import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Hero from "../components/Hero";
import Testimonals from "../components/Testimonals";
import ServicesUs from "../components/ServicesUs";

function Services() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    checkUserAuthentication();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      setProducts(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(
        "Unable to connect to the backend service. Please check if the server is running."
      );
    }
  };

  const checkUserAuthentication = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        localStorage.removeItem("userId");
      }
    }
    // No redirect to login here
  };

  const addToCart = async (product) => {
    if (!user) {
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
        user: { id: user.id },
        product: { id: product.id },
        quantity: 1,
      };
      await axios.post("http://localhost:8080/api/cart", cartItem);
      navigate("/cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div>
      <Hero title="Services" />

      <ServicesUs />

      {/* Product Section */}
      <div className="product-section pt-0">
        <div className="container">
          <div className="row">
            {/* Column 1 */}
            <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
              <h2 className="mb-4 section-title">
                Crafted with excellent material.
              </h2>
              <p className="mb-4">
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
                velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
              </p>
              <p>
                <Link to="#" className="btn">
                  Explore
                </Link>
              </p>
            </div>

            {/* Error/Products Columns */}
            {error ? (
              <div className="col-12 col-md-9">
                <div className="alert alert-danger text-center p-4 shadow-lg rounded">
                  <h3 className="fw-bold">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    Backend Service Unavailable
                  </h3>
                  <p className="mb-0">{error}</p>
                </div>
              </div>
            ) : (
              products.slice(0, 3).map((product, index) => (
                <div
                  key={product.id}
                  className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0"
                >
                  <div className="product-item">
                    <Link
                      className="product-item"
                      to={`/product/${product.id}`}
                    >
                      <img
                        src={`images/product-${index + 1}.png`}
                        className="img-fluid product-thumbnail"
                      />
                      <h3 className="product-title">{product.name}</h3>
                      <strong className="product-price">
                        ${product.price.toFixed(2)}
                      </strong>
                      <span
                        className="icon-cross"
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                      >
                        <img src="images/cross.svg" className="img-fluid" />
                      </span>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Testimonals />
    </div>
  );
}

export default Services;
