import { useAuth, useCart } from "../contexts/AuthContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = () => {
    if (!user) {
      // Redirect to login or show modal
      alert("Please login to add items to your cart");
      return;
    }
    addToCart(product);
  };

  return (
    <button onClick={handleAddToCart} className="btn btn-primary">
      Add to Cart
    </button>
  );
}
