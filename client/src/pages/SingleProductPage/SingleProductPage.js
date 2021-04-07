import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Footer from '../../component/Footer/Footer';
import Navbar from '../../component/Navbar/Navbar';
import Review from '../../component/Review/Review';
import PrimaryButton from '../../component/Buttons/PrimaryButton';
import { axiosErrorHandler } from '../../utils/errorHandlers';
import { Link } from 'react-router-dom';
import './SingleProductPage.css';
import ProductPreview from '../../component/ProductPreview/ProductPreview';
import LoadingPage from '../../pages/Loading/LoadingPage';
import Loader from '../../component/Loader/Loader';

const SingleProductPage = ({ match, history }) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedQty, setSelectedQty] = useState(1);

  useEffect(() => {
    getProduct();
    console.log({ history });
  }, []);

  const getProduct = async () => {
    try {
      const res = await axios.get(`/api/v1/products/${match.params.id}`);
      setProduct(res.data.product);
    } catch (error) {
      axiosErrorHandler(error, dispatch);
    }
  };

  return (
    <>
      {!product.name ? (
        <LoadingPage />
      ) : (
        <>
          <div className='container prod-single'>
            {/* Main Product body */}
            <div className='prod-single-main-container'>
              {/* Main Images */}
              <div className='prod-single-main-imgs-container'>
                <div className='prod-single-main-img-container'>
                  <img
                    src={product.images[selectedImage]}
                    alt='img'
                    className='prod-single-main-img'
                  />
                </div>

                {/* Side Images */}
                <div className='prod-single-side-imgs-container'>
                  {product.images.map((image, index) => (
                    <div
                      className='prod-single-side-img-container'
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={image}
                        alt='img'
                        className='prod-single-side-img'
                      />
                    </div>
                  ))}
                </div>

                <div className='prod-single-quantity-container'>
                  <p className='prod-single-quantity-text'>Quality</p>

                  <span
                    className='prod-single-quantity-icon noselect'
                    onClick={() =>
                      selectedQty > 1 && setSelectedQty(selectedQty - 1)
                    }
                  >
                    &#60;
                  </span>
                  <p className='prod-single-quantity-qty'>{selectedQty}</p>
                  <span
                    className='prod-single-quantity-icon noselect'
                    onClick={() =>
                      selectedQty < product.quantity &&
                      setSelectedQty(selectedQty + 1)
                    }
                  >
                    &#62;
                  </span>
                </div>

                <PrimaryButton
                  text='Add to Cart'
                  classes='button cart-button'
                />
              </div>
              {/* Main Body */}
              <div className='prod-single-body'>
                <p className='prod-single-path'>
                  <Link to='/home'>Home</Link> <span>&#62;</span>
                  <Link to={`/search/${product.type.toLowerCase()}`}>
                    {product.type}
                  </Link>{' '}
                  <span>&#62;</span>
                  <Link>{product.name.substr(0, 10).trim()}...</Link>
                </p>

                <h1 className='prod-single-name'>{product.name}</h1>

                <div className='prod-single-rating-container'>
                  <p className='prod-single-rating-count'>
                    {product.ratingAvg}
                  </p>
                  <p className='prod-single-rating-text'>
                    {product.ratingQty} Ratings & {0} Reviews
                  </p>
                </div>

                <div className='prod-single-price-container'>
                  <h3 className='prod-single-main-price'>₹{product.price}</h3>
                  {product.oldPrice > 0 && (
                    <>
                      <p className='prod-single-old-price'>
                        ₹{product.oldPrice}
                      </p>
                      <p className='prod-single-price-diff'>
                        {Math.round(
                          ((product.oldPrice - product.price) /
                            product.oldPrice) *
                            100
                        )}
                        %
                      </p>
                    </>
                  )}
                </div>
                {product.description.length > 1 && (
                  <>
                    <h2 className='prod-single-heading'>Product Description</h2>
                    <ul className='prod-single-desc-list'>
                      {product.description.map((cur) => (
                        <li className='prod-single-desc-list-item'>{cur}</li>
                      ))}
                    </ul>
                  </>
                )}

                <h2 className='prod-single-heading'>Product Details</h2>
                <table className='prod-single-table'>
                  <tbody>
                    {Object.entries(product.information).map((cur) => (
                      <tr>
                        <td>{cur[0]}</td>
                        <td>{cur[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h2 className='prod-single-heading'>Customer Reviews</h2>
                <Review />
                <Review />
                <Review />
                <Review />
                <Review />
                <Review />
              </div>
            </div>
            <div className='prod-single-suggestion-container'>
              <h1 className='home-heading'>Other Mouse</h1>
              <div className='home-product-container'>
                <ProductPreview
                  productId={123}
                  name={'Mouse'}
                  shortDesc={'mouse | mouse'}
                  ratingAvg={4.3}
                  ratingQty={2}
                  price={1222}
                  oldPrice={1000}
                  // image={}
                />
                <ProductPreview
                  productId={123}
                  name={'Mouse'}
                  shortDesc={'mouse | mouse'}
                  ratingAvg={4.3}
                  ratingQty={2}
                  price={1222}
                  oldPrice={1000}
                  // image={}
                />
                <ProductPreview
                  productId={123}
                  name={'Mouse'}
                  shortDesc={'mouse | mouse'}
                  ratingAvg={4.3}
                  ratingQty={2}
                  price={1222}
                  oldPrice={1000}
                  // image={}
                />
                <ProductPreview
                  productId={123}
                  name={'Mouse'}
                  shortDesc={'mouse | mouse'}
                  ratingAvg={4.3}
                  ratingQty={2}
                  price={1222}
                  oldPrice={1000}
                  // image={}
                />
                <ProductPreview
                  productId={123}
                  name={'Mouse'}
                  shortDesc={'mouse | mouse'}
                  ratingAvg={4.3}
                  ratingQty={2}
                  price={1222}
                  oldPrice={1000}
                  // image={}
                />
                <ProductPreview
                  productId={123}
                  name={'Mouse'}
                  shortDesc={'mouse | mouse'}
                  ratingAvg={4.3}
                  ratingQty={2}
                  price={1222}
                  oldPrice={1000}
                  // image={}
                />
                <ProductPreview
                  productId={123}
                  name={'Mouse'}
                  shortDesc={'mouse | mouse'}
                  ratingAvg={4.3}
                  ratingQty={2}
                  price={1222}
                  oldPrice={1000}
                  // image={}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SingleProductPage;
