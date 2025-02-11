import React, { useContext } from "react";
import { Link, useNavigate, useLocation, NavLink } from "react-router-dom"; // Add useLocation and NavLink
import { useAuth } from "../AuthContext";
import { CartContext } from "../CartContext";

function Header() {
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const { user, logout } = useAuth();
  const { cartCount } = useContext(CartContext);

  // Helper function to check if path matches current route
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow-sm py-3">
        <div className="container">
          <Link className="navbar-brand fs-3 fw-bold position-relative" to="/">
            Furni<span className="text-primary">.</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              {["/", "/shop", "/about", "/services", "/blog", "/contact"].map(
                (path) => (
                  <li className="nav-item" key={path}>
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link px-3 ${
                          isActive ? "active text-primary" : "text-light"
                        } hover-opacity`
                      }
                      to={path}
                    >
                      {path === "/"
                        ? "Home"
                        : path
                            .replace("/", "")
                            .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
                    </NavLink>
                  </li>
                )
              )}
            </ul>

            <ul className="navbar-nav ms-auto align-items-center gap-3">
              {user ? (
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle d-flex align-items-center py-0 bg-transparent border-0"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    id="userDropdown"
                  >
                    <span className="badge bg-primary me-2 fs-6">
                      Hi, {user?.firstName}
                    </span>
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="userDropdown"
                  >
                    {user?.role === "ADMIN" && (
                      <li>
                        <Link className="dropdown-item" to="/admin">
                          Admin Dashboard
                        </Link>
                      </li>
                    )}
                    <li>
                      <button
                        className="dropdown-item text-danger fw-medium"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${
                        isActive ? "active" : ""
                      } d-flex align-items-center`
                    }
                    to="/login"
                  >
                    <img
                      src="images/user.svg"
                      alt="User"
                      className="me-2"
                      style={{ width: "20px" }}
                    />
                    Login
                  </NavLink>
                </li>
              )}

              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link position-relative ${isActive ? "active" : ""}`
                  }
                  to="/cart"
                >
                  <img
                    src="images/cart.svg"
                    alt="Cart"
                    className="me-1"
                    style={{ width: "24px" }}
                  />
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartCount}
                    </span>
                  )}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
