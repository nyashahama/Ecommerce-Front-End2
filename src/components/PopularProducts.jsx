import React from 'react'
import { Link } from 'react-router-dom';

const PopularProducts = () => {
  return (
    <div>
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
    </div>
  )
}

export default PopularProducts