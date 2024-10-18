import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import axios from 'axios';
import Testimonals from '../components/Testimonals';
import { Link, useNavigate } from 'react-router-dom';

function Home() {

    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
        checkUserAuthentication();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
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
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    };

    const addToCart = async (product) => {
        if (!user) {
            console.error('User not authenticated');
            navigate('/login');
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
                        <a className="product-item" href="#">
                            <img src={`images/product-${index + 1}.png`} className="img-fluid product-thumbnail"/>
                            <h3 className="product-title">{product.name}</h3>
                            <strong className="product-price">${product.price.toFixed(2)}</strong>
                            <span className="icon-cross" onClick={() => addToCart(product)}>
                                <img src="images/cross.svg" className="img-fluid"/>
                            </span>
                        </a>
                    </div>
                ))}
    {/* End Product Columns */}

        </div>
    </div>
</div>
{/* End Product Section */}

{/* Start Why Choose Us Section */}
<div className="why-choose-section">
    <div className="container">
        <div className="row justify-content-between">
            <div className="col-lg-6">
                <h2 className="section-title">Why Choose Us</h2>
                <p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.</p>

                <div className="row my-5">
                    <div className="col-6 col-md-6">
                        <div className="feature">
                            <div className="icon">
                                <img src="images/truck.svg" alt="Image" className="imf-fluid"/>
                            </div>
                            <h3>Fast &amp; Free Shipping</h3>
                            <p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
                        </div>
                    </div>

                    <div className="col-6 col-md-6">
                        <div className="feature">
                            <div className="icon">
                                <img src="images/bag.svg" alt="Image" className="imf-fluid"/>
                            </div>
                            <h3>Easy to Shop</h3>
                            <p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
                        </div>
                    </div>

                    <div className="col-6 col-md-6">
                        <div className="feature">
                            <div className="icon">
                                <img src="images/support.svg" alt="Image" className="imf-fluid"/>
                            </div>
                            <h3>24/7 Support</h3>
                            <p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
                        </div>
                    </div>

                    <div className="col-6 col-md-6">
                        <div className="feature">
                            <div className="icon">
                                <img src="images/return.svg" alt="Image" className="imf-fluid"/>
                            </div>
                            <h3>Hassle Free Returns</h3>
                            <p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="col-lg-5">
                <div className="img-wrap">
                    <img src="images/why-choose-us-img.jpg" alt="Image" className="img-fluid"/>
                </div>
            </div>

        </div>
    </div>
</div>
{/* End Why Choose Us Section */}

{/* Start We Help Section */}
<div className="we-help-section">
    <div className="container">
        <div className="row justify-content-between">
            <div className="col-lg-7 mb-5 mb-lg-0">
                <div className="imgs-grid">
                    <div className="grid grid-1"><img src="images/img-grid-1.jpg" alt="Untree.co"/></div>
                    <div className="grid grid-2"><img src="images/img-grid-2.jpg" alt="Untree.co"/></div>
                    <div className="grid grid-3"><img src="images/img-grid-3.jpg" alt="Untree.co"/></div>
                </div>
            </div>
            <div className="col-lg-5 ps-lg-5">
                <h2 className="section-title mb-4">We Help You Make Modern Interior Design</h2>
                <p>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada</p>

                <ul className="list-unstyled custom-list my-4">
                    <li>Donec vitae odio quis nisl dapibus malesuada</li>
                    <li>Donec vitae odio quis nisl dapibus malesuada</li>
                    <li>Donec vitae odio quis nisl dapibus malesuada</li>
                    <li>Donec vitae odio quis nisl dapibus malesuada</li>
                </ul>
                <p><Link to="/" className="btn">Explore</Link></p>
            </div>
        </div>
    </div>
</div>
{/* End We Help Section */}

{/* Start Popular Product */}
<div className="popular-product">
    <div className="container">
        <div className="row">

            <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                <div className="product-item-sm d-flex">
                    <div className="thumbnail">
                        <img src="images/product-1.png" alt="Image" className="img-fluid"/>
                    </div>
                    <div className="pt-3">
                        <h3>Nordic Chair</h3>
                        <p>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio </p>
                        <p><Link to="/">Read More</Link></p>
                    </div>
                </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                <div className="product-item-sm d-flex">
                    <div className="thumbnail">
                        <img src="images/product-2.png" alt="Image" className="img-fluid"/>
                    </div>
                    <div className="pt-3">
                        <h3>Kruzo Aero Chair</h3>
                        <p>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio </p>
                        <p><Link to="/">Read More</Link></p>
                    </div>
                </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                <div className="product-item-sm d-flex">
                    <div className="thumbnail">
                        <img src="images/product-3.png" alt="Image" className="img-fluid"/>
                    </div>
                    <div className="pt-3">
                        <h3>Ergonomic Chair</h3>
                        <p>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio </p>
                        <p><Link to="/">Read More</Link></p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
{/* End Popular Product */}

<Testimonals/>

{/* Start Blog Section */}
<div className="blog-section">
    <div className="container">
        <div className="row mb-5">
            <div className="col-md-6">
                <h2 className="section-title">Recent Blog</h2>
            </div>
            <div className="col-md-6 text-start text-md-end">
                <Link to="/" className="more">View All Posts</Link>
            </div>
        </div>

        <div className="row">

            <div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
                <div className="post-entry">
                    <Link to="/" className="post-thumbnail"><img src="images/post-1.jpg" alt="Image" className="img-fluid"/></Link>
                    <div className="post-content-entry">
                        <h3><Link to="/">First Time Home Owner Ideas</Link></h3>
                        <div className="meta">
                            <span>by <Link to="/">Kristin Watson</Link></span> <span>on <Link to="/">Dec 19, 2021</Link></span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
                <div className="post-entry">
                    <a href="#" className="post-thumbnail"><img src="images/post-2.jpg" alt="Image" className="img-fluid"/></a>
                    <div className="post-content-entry">
                        <h3><a href="#">How To Keep Your Furniture Clean</a></h3>
                        <div className="meta">
                            <span>by <a href="#">Robert Fox</a></span> <span>on <a href="#">Dec 15, 2021</a></span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
                <div className="post-entry">
                    <a href="#" className="post-thumbnail"><img src="images/post-3.jpg" alt="Image" className="img-fluid"/></a>
                    <div className="post-content-entry">
                        <h3><a href="#">Small Space Furniture Apartment Ideas</a></h3>
                        <div className="meta">
                            <span>by <a href="#">Kristin Watson</a></span> <span>on <a href="#">Dec 12, 2021</a></span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
{/* End Blog Section */}	







    </div>
    );
  }
  
  export default Home;