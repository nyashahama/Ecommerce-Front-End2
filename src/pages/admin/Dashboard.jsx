import React from "react";
import { Outlet, Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard d-flex">
      <nav
        className="admin-sidebar bg-light p-3"
        style={{ width: "250px", minHeight: "100vh" }}
      >
        <h4 className="mb-4">Admin Panel</h4>
        <ul className="nav flex-column gap-2">
          <li className="nav-item">
            <Link className="nav-link text-dark" to="products">
              Products Management
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="orders">
              Orders Management
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="users">
              Users Management
            </Link>
          </li>
        </ul>
      </nav>
      <div className="admin-content p-4 flex-grow-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
