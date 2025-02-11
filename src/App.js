import React, { Suspense, lazy } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import Home from "./pages/Home";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import UserProfile from "./pages/user/UserProfile";

// Lazy-loaded components
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
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
const ProductManagement = lazy(() =>
  import("./components/admin/ProductManagement")
);
const OrderManagement = lazy(() => import("./pages/admin/OrderManagement"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));

// Suspense Wrapper Component
const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <SuspenseWrapper>
                  <Login />
                </SuspenseWrapper>
              }
            />
            <Route
              path="/register"
              element={
                <SuspenseWrapper>
                  <Registration />
                </SuspenseWrapper>
              }
            />
            <Route
              path="/product/:id"
              element={
                <SuspenseWrapper>
                  <ProductDetail />
                </SuspenseWrapper>
              }
            />
            <Route
              path="/shop"
              element={
                <SuspenseWrapper>
                  <Shop />
                </SuspenseWrapper>
              }
            />
            <Route
              path="/about"
              element={
                <SuspenseWrapper>
                  <About />
                </SuspenseWrapper>
              }
            />
            <Route
              path="/services"
              element={
                <SuspenseWrapper>
                  <Services />
                </SuspenseWrapper>
              }
            />
            <Route
              path="/blog"
              element={
                <SuspenseWrapper>
                  <Blog />
                </SuspenseWrapper>
              }
            />
            <Route
              path="/contact"
              element={
                <SuspenseWrapper>
                  <Contact />
                </SuspenseWrapper>
              }
            />

            {/* User-protected routes */}
            <Route element={<UserRoutes />}>
              <Route path="/profile" element={<UserProfile />} />
              <Route
                path="/cart"
                element={
                  <SuspenseWrapper>
                    <Cart />
                  </SuspenseWrapper>
                }
              />
              <Route
                path="/checkout"
                element={
                  <SuspenseWrapper>
                    <Checkout />
                  </SuspenseWrapper>
                }
              />
              <Route
                path="/thankyou"
                element={
                  <SuspenseWrapper>
                    <Thankyou />
                  </SuspenseWrapper>
                }
              />
            </Route>

            {/* Admin-protected routes */}
            <Route element={<AdminRoutes />}>
              <Route
                path="/admin"
                element={
                  <SuspenseWrapper>
                    <AdminDashboard />
                  </SuspenseWrapper>
                }
              >
                <Route
                  index
                  element={
                    <SuspenseWrapper>
                      <ProductManagement />
                    </SuspenseWrapper>
                  }
                />
                <Route
                  path="products"
                  element={
                    <SuspenseWrapper>
                      <ProductManagement />
                    </SuspenseWrapper>
                  }
                />
                <Route
                  path="orders"
                  element={
                    <SuspenseWrapper>
                      <OrderManagement />
                    </SuspenseWrapper>
                  }
                />
                <Route
                  path="users"
                  element={
                    <SuspenseWrapper>
                      <UserManagement />
                    </SuspenseWrapper>
                  }
                />
              </Route>
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
