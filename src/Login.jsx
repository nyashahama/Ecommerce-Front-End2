import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from './AuthContext'; // Adjust the path as needed

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Use the login function from AuthContext

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:8080/api/users/login', { email, password });
            toast.success("Login Successful!");
            login(response.data.id, response.data.firstName); // Update the AuthContext state
            navigate('/');
        } catch (error) {
            toast.error("Invalid credentials. Please try again.");
            setError('Invalid credentials. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <ToastContainer />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title text-center mb-4">Login</h2>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <form onSubmit={handleLogin}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email:</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password:</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Logging in...' : 'Login'}
                                    </button>
                                </form>
                                <div className="mt-3 text-center">
                                    <Link to="/forgot-password">Forgot Password?</Link>
                                </div>
                                <hr />
                                <div className="text-center">
                                    Don't have an account? <Link to="/register">Register here</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;