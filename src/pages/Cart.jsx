import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import { CartContext } from "../CartContext"; // Import CartContext

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { updateCartCount } = useContext(CartContext); // Use CartContext

  useEffect(() => {
    checkUserAuthentication();
  }, []);

  useEffect(() => {
    if (user) {
      fetchCartItems();
      fetchCartTotal();
    }
  }, [user]);

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
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/cart/${user.id}`
      );
      setCartItems(response.data);
      updateCartCount(response.data.length); // Update cart count
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const fetchCartTotal = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/cart/${user.id}/total`
      );
      setTotal(response.data);
    } catch (error) {
      console.error("Error fetching cart total:", error);
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    try {
      await axios.put(
        `http://localhost:8080/api/cart/${cartItemId}?quantity=${quantity}`
      );
      fetchCartItems();
      fetchCartTotal();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      await axios.delete(`http://localhost:8080/api/cart/${cartItemId}`);
      fetchCartItems();
      fetchCartTotal();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Hero title="Cart" />

      <div className="untree_co-section before-footer-section">
        <div className="container">
          <div className="row mb-5">
            <form className="col-md-12" method="post">
              <div className="site-blocks-table">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="product-thumbnail">Image</th>
                      <th className="product-name">Product</th>
                      <th className="product-price">Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-total">Total</th>
                      <th className="product-remove">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td className="product-thumbnail">
                          <img
                            src={`images/product-${item.product.id}.png`}
                            alt="Image"
                            className="img-fluid"
                          />
                        </td>
                        <td className="product-name">
                          <h2 className="h5 text-black">{item.product.name}</h2>
                        </td>
                        <td>R{item.product.price.toFixed(2)}</td>
                        <td>
                          <div
                            className="input-group mb-3 d-flex align-items-center quantity-container"
                            style={{ maxWidth: "120px" }}
                          >
                            <div className="input-group-prepend">
                              <button
                                className="btn btn-outline-black decrease"
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                &minus;
                              </button>
                            </div>
                            <input
                              type="text"
                              className="form-control text-center quantity-amount"
                              value={item.quantity}
                              readOnly
                            />
                            <div className="input-group-append">
                              <button
                                className="btn btn-outline-black increase"
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </td>
                        <td>
                          R{(item.product.price * item.quantity).toFixed(2)}
                        </td>
                        <td>
                          <a
                            href="#"
                            className="btn btn-black btn-sm"
                            onClick={() => removeItem(item.id)}
                          >
                            X
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </form>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="row mb-5">
                <div className="col-md-6 mb-3 mb-md-0">
                  <button className="btn btn-black btn-sm btn-block">
                    Update Cart
                  </button>
                </div>
                <div className="col-md-6">
                  <button
                    className="btn btn-outline-black btn-sm btn-block"
                    onClick={() => {
                      navigate("/shop");
                      window.scrollTo(0, 0); // Scroll to the top of the page
                    }}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <label className="text-black h4" for="coupon">
                    Coupon
                  </label>
                  <p>Enter your coupon code if you have one.</p>
                </div>
                <div className="col-md-8 mb-3 mb-md-0">
                  <input
                    type="text"
                    className="form-control py-3"
                    id="coupon"
                    placeholder="Coupon Code"
                  />
                </div>
                <div className="col-md-4">
                  <button className="btn btn-black">Apply Coupon</button>
                </div>
              </div>
            </div>
            <div className="col-md-6 pl-5">
              <div className="row justify-content-end">
                <div className="col-md-7">
                  <div className="row">
                    <div className="col-md-12 text-right border-bottom mb-5">
                      <h3 className="text-black h4 text-uppercase">
                        Cart Totals
                      </h3>
                    </div>
                  </div>
                  <div className="row mb-5">
                    <div className="col-md-6">
                      <span className="text-black">Subtotal</span>
                    </div>
                    <div className="col-md-6 text-right">
                      <strong className="text-black">
                        R{total.toFixed(2) - (0, 15)}
                      </strong>
                    </div>
                  </div>

                  <div className="row mb-5">
                    <div className="col-md-6">
                      <span className="text-black">Total</span>
                    </div>
                    <div className="col-md-6 text-right">
                      <strong className="text-black">
                        R{total.toFixed(2)}
                      </strong>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <button
                        className="btn btn-black btn-lg py-3 btn-block"
                        onClick={() => (window.location = "/checkout")}
                      >
                        Proceed To Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
