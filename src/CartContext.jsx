import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  // Fetch the initial cart count when the component mounts
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchCartCount(userId);
    }
  }, []);

  const fetchCartCount = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/cart/${userId}/count`
      );
      setCartCount(response.data);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  const updateCartCount = (count) => {
    setCartCount(count);
  };

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
