import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Add useLocation
import { AuthContext } from '../AuthContext';
import { CartContext } from '../CartContext';

function Header() {
    const navigate = useNavigate();
    const location = useLocation(); // Get current location
    const { isLoggedIn, username, logout } = useContext(AuthContext);
    const { cartCount } = useContext(CartContext);

    // Helper function to check if path matches current route
    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div>
            <nav className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark" arial-label="Furni navigation bar">
                <div className="container">
                    <Link className="navbar-brand" to="/">Furni<span>.</span></Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsFurni">
                        <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
                            {/* Dynamic active class for Home */}
                            <li className={`nav-item ${isActive('/') ? 'active' : ''}`}>
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            {/* Dynamic active class for other pages */}
                            <li className={`nav-item ${isActive('/shop') ? 'active' : ''}`}>
                                <Link className="nav-link" to="/shop">Shop</Link>
                            </li>
                            <li className={`nav-item ${isActive('/about') ? 'active' : ''}`}>
                                <Link className="nav-link" to="/about">About us</Link>
                            </li>
                            <li className={`nav-item ${isActive('/services') ? 'active' : ''}`}>
                                <Link className="nav-link" to="/services">Services</Link>
                            </li>
                            <li className={`nav-item ${isActive('/blog') ? 'active' : ''}`}>
                                <Link className="nav-link" to="/blog">Blog</Link>
                            </li>
                            <li className={`nav-item ${isActive('/contact') ? 'active' : ''}`}>
                                <Link className="nav-link" to="/contact">Contact us</Link>
                            </li>
                        </ul>

                        <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
                            {isLoggedIn ? (
                                <>
                                    <li className="nav-item">
                                        <span className="nav-link" style={{ color: 'white' }}>
                                            Welcome, {username}
                                        </span>
                                    </li>
                                    <li>
                                        <button className="nav-link" onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li className={`nav-item ${isActive('/login') ? 'active' : ''}`}>
                                    <Link className="nav-link" to="/login">
                                        <img src="images/user.svg" alt="User profile" />
                                        Login
                                    </Link>
                                </li>
                            )}
                            <li className={`nav-item ${isActive('/cart') ? 'active' : ''}`}>
                                <Link className="nav-link" to="/cart">
                                    <img src="images/cart.svg" alt="Shopping cart" />
                                    {cartCount > 0 && (
                                        <span className="badge bg-danger">{cartCount}</span>
                                    )}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;