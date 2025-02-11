import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import Hero from "../components/Hero";
import Testimonals from "../components/Testimonals";
import RecentBlog from "../components/RecentBlog";
import ChooseUs from "../components/ChooseUs";
import PopularProducts from "../components/PopularProducts";
import HelpSection from "../components/HelpSection";
import { useAuth } from "../AuthContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

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

    const cartItem = {
      user: { id: user.id },
      product: { id: product.id },
      quantity: 1,
    };

    try {
      await axios.post("http://localhost:8080/api/cart", cartItem);
      navigate("/cart");
    } catch (err) {
      console.error("Error adding product to cart:", err);
      toast.error("Error adding product to cart");
    }
  };

  return (
    <div>
      <Hero title="Modern Interior Design Studio" />

      {/* Product Section */}
      <section className="product-section">
        <div className="container">
          {error ? (
            <div className="alert alert-danger text-center p-4 shadow-lg rounded">
              <h3 className="fw-bold">
                <i className="bi bi-exclamation-triangle-fill me-2" />
                Backend Service Unavailable
              </h3>
              <p className="mb-0">{error}</p>
            </div>
          ) : (
            <div className="row">
              {/* Introductory Column */}
              <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
                <h2 className="mb-4 section-title">
                  Crafted with excellent material.
                </h2>
                <p className="mb-4">
                  Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                  aliquet velit. Aliquam vulputate velit imperdiet dolor tempor
                  tristique.
                </p>
                <Link to="/shop" className="btn">
                  Explore
                </Link>
              </div>

              {/* Product Columns */}
              {products.slice(0, 3).map((product, index) => (
                <div
                  key={product.id}
                  className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0"
                >
                  <Link className="product-item" to={`/product/${product.id}`}>
                    <img
                      src={`images/product-${index + 1}.png`}
                      alt={product.name}
                      className="img-fluid product-thumbnail"
                    />
                    <h3 className="product-title">{product.name}</h3>
                    <strong className="product-price">
                      R{product.price.toFixed(2)}
                    </strong>
                    <span
                      className="icon-cross"
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                      }}
                    >
                      <img
                        src="images/cross.svg"
                        alt="Add to Cart"
                        className="img-fluid"
                      />
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <ChooseUs />
      <HelpSection />
      <PopularProducts />
      <Testimonals />
      <RecentBlog />
    </div>
  );
};

export default Home;
