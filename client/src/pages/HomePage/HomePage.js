import React, { useState, useEffect } from 'react';
import './HomePage.css';
import ComputerImage from '../../assests/images/computer.png';

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { logout } from '../../features/authentication/authenticationSlice';
import { axiosErrorHandler } from '../../utils/errorHandlers';
import Navbar from '../../component/Navbar/Navbar';

import BannerImage from '../../assests/images/banner.png';
import ProductPreview from '../../component/ProductPreview/ProductPreview';

const HomePage = ({ history }) => {
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.authentication.user);

  const [user, setUser] = useState({});
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    getFeaturedProducts();
  }, []);

  // if (
  //   userStore &&
  //   Object.keys(userStore).length === 0 &&
  //   userStore.constructor === Object
  // )
  //   return <Redirect to='/authentication' />;

  const getFeaturedProducts = async () => {
    try {
      const res = await axios.get('/api/v1/products/features');
      setFeaturedProducts(res.data.data.products);
      // console.log(res.data.data.products.map((cur) => cur.category));
    } catch (error) {
      axiosErrorHandler(error, dispatch);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.delete('/api/v1/users/token');
      dispatch(logout());
      history.push('/authentication');
    } catch (error) {
      axiosErrorHandler(error, dispatch);
    }
  };

  return (
    <>
      <div className='home'>
        <div className='container home-container'>
          <img src={BannerImage} alt='banner' className='home-banner' />
          <div className='home-categories-container'>
            {featuredProducts.map((cur) => (
              <Link
                to={`/search/${cur.type.toLowerCase()}`}
                className='home-category'
              >
                <p className='home-category-text'>{cur.type}</p>
              </Link>
            ))}
          </div>
          <h1 className='home-heading'>Highlights</h1>
          <div className='highlight-container'>
            <div className='highlight highlight-special'>
              <h2 className='highlight-heading'>peripherals | special</h2>
              <h3 className='highlight-title'>Storage Devices</h3>
              <div className='highlight-discount'>
                <div className='highlight-upto'>
                  <p className='hightlight-discount-up'>UP</p>
                  <p className='hightlight-discount-to'>TO</p>
                </div>
                <h4 className='highlight-discount-number'>20%</h4>
                <p className='hightlight-discount-off'>OFF</p>
              </div>
              <p className='highlight-footer'>only on peripherals</p>
            </div>

            {/* COUPON */}
            <div className='highlight highlight-coupon'>
              <h2 className='highlight-heading'>this week’s coupoun code</h2>
              <p className='highlight-text'>
                Shop above ₹5000 and <br /> Get flat discount of 8%
              </p>
              <div className='highlight-coupon-container'>
                <div className='highlight-dots highlight-dots-1' />
                <div className='highlight-dots highlight-dots-2' />
                <h3 className='highlight-coupon-code'>Splmar24</h3>
                <div className='highlight-dots highlight-dots-3' />
                <div className='highlight-dots highlight-dots-4' />
              </div>
              <p className='highlight-footer'>*Terms and conditions applied</p>
            </div>

            {/* ASSISTANCE */}
            <div className='highlight highlight-assistance'>
              <img
                src={ComputerImage}
                alt='computer'
                className='highlight-computer'
              />
              <h2 className='highlight-heading'>confuse where to go..?</h2>
              <p className='highlight-text'>
                I get it, our developers sucks, let me help find you what you
                are looking for..
              </p>
            </div>
          </div>
          {featuredProducts.map((cur) => (
            <>
              <h1 className='home-heading'>{cur.type}s</h1>
              <div className='home-product-container'>
                {cur.products.map((product) => (
                  <ProductPreview
                    productId={product.productId}
                    name={product.name}
                    shortDesc={product.shortInfo}
                    ratingAvg={product.ratingAvg}
                    ratingQty={product.ratingQty}
                    price={product.price}
                    oldPrice={product.oldPrice}
                    image={product.image[0]}
                  />
                ))}
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
