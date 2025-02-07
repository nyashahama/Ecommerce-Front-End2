import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import ProductDetail from "./pages/ProductDetail";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Blog = lazy(() => import("./pages/Blog"));
const Contact = lazy(() => import("./pages/Contact"));
const Cart = lazy(() => import("./pages/Cart"));
const Thankyou = lazy(() => import("./pages/Thankyou"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Login = lazy(() => import("./Login"));
const Registration = lazy(() => import("./Registration"));

const routes = [
  { path: "/", element: <Home /> },
  { path: "/shop", element: <Shop /> },
  { path: "/about", element: <About /> },
  { path: "/services", element: <Services /> },
  { path: "/blog", element: <Blog /> },
  { path: "/contact", element: <Contact /> },
  { path: "/cart", element: <Cart /> },
  { path: "/thankyou", element: <Thankyou /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Registration /> },
  { path: "/product/:id", element: <ProductDetail /> },
];

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Routes>
          </Suspense>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
