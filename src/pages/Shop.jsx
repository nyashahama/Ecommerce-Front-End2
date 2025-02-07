import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import { useNavigate } from 'react-router-dom';

function Shop() {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
        checkUserAuthentication();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/products');
            setProducts(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Unable to connect to the backend service. Please check if the server is running.');
        }
    };

    const checkUserAuthentication = async () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            try {
                const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
                localStorage.removeItem('userId');
            }
        }
        // No redirect to login here
    };
    
    const addToCart = async (product) => {
        if (!user) {
            if (window.confirm("You need to log in to add items to the cart. Log in now?")) {
                navigate('/login');
            }
            return;
        }
    
        try {
            const cartItem = {
                user: { id: user.id },
                product: { id: product.id },
                quantity: 1
            };
            await axios.post('http://localhost:8080/api/cart', cartItem);
            navigate('/cart');
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };
    

    return (
        <div>
            <Hero title="Shop"/>

            <div className="untree_co-section product-section before-footer-section">
                <div className="container">
                    {error ? (
                       <div className="alert alert-danger text-center p-4 shadow-lg rounded">
                       <h3 className="fw-bold">
                           <i className="bi bi-exclamation-triangle-fill me-2"></i>
                           Backend Service Unavailable
                       </h3>
                       <p className="mb-0">{error}</p>
                   </div>
                   
                    ) : (
                        <div className="row">
                            {products.map((product, index) => (
                                <div key={product.id} className="col-12 col-md-4 col-lg-3 mb-5">
                                    <a className="product-item" href="#">
                                        <img src={`images/product-${(index % 3) + 1}.png`} className="img-fluid product-thumbnail"/>
                                        <h3 className="product-title">{product.name}</h3>
                                        <strong className="product-price">${product.price.toFixed(2)}</strong>

                                        <span className="icon-cross"  onClick={() => addToCart(product)}>
                                            <img src="images/cross.svg" className="img-fluid"/>
                                        </span>
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Shop;