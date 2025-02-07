import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import axios from 'axios';
import Testimonals from '../components/Testimonals';
import { Link, useNavigate } from 'react-router-dom';
import RecentBlog from '../components/RecentBlog';
import ChooseUs from '../components/ChooseUs';
import PopularProducts from '../components/PopularProducts';
import HelpSection from '../components/HelpSection';

function Home() {

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




<Hero title="Modern Interior Design Studio"/>

{/* Start Product Section */}
<div className="product-section">
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

                {/* Start Column 1 */}
                <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
                    <h2 className="mb-4 section-title">Crafted with excellent material.</h2>
                    <p className="mb-4">Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. </p>
                    <p><Link to="/shop" className="btn">Explore</Link></p>
                </div> 
                {/* End Column 1 */}

                    {/* Start Product Columns */}
                    {products.slice(0, 3).map((product, index) =>
                     (
                        <div key={product.id} className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
                            <Link className="product-item" to={`/product/${product.id}`}>
                                <img src={`images/product-${index + 1}.png`} className="img-fluid product-thumbnail"/>
                                <h3 className="product-title">{product.name}</h3>
                                <strong className="product-price">${product.price.toFixed(2)}</strong>
                                <span className="icon-cross" onClick={(e) => {
                                    e.preventDefault();
                                    addToCart(product);
                                }}>
                                    <img src="images/cross.svg" className="img-fluid"/>
                                </span>
                            </Link>
                        </div>
                    ))}
        {/* End Product Columns */}

            </div>
        )}
    </div>
</div>
{/* End Product Section */}

<ChooseUs/>

<HelpSection/>

<PopularProducts/>

<Testimonals/>

<RecentBlog/>







    </div>
    );
  }
  
  export default Home;