import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Thankyou from "./pages/Thankyou";
import Checkout from "./pages/Checkout";
import Login from "./Login";
import Registration from "./Registration";

const RoutesConfig = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/shop" element={<Shop />} />
    <Route path="/about" element={<About />} />
    <Route path="/services" element={<Services />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/thankyou" element={<Thankyou />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Registration />} />
  </Routes>
);

export default RoutesConfig;
