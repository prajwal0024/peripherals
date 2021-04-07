import React from 'react';
import './ProductSearch.css';
import { Link } from 'react-router-dom';

const ProductSearch = ({
  productId,
  image,
  name,
  shortInfo,
  ratingAverage,
  ratingQuantity,
  price,
  oldPrice,
}) => {
  return (
    <Link className='prod-search' to={`/products/${productId}`}>
      <div className='prod-search-img-container'>
        <img className='prod-search-img' src={image} alt='product' />
      </div>
      <div className='prod-search-body'>
        <h2 className='prod-search-name'>{name}</h2>
        <p className='prod-search-desc'>{shortInfo}</p>

        <div className='prod-search-rating-container'>
          <p className='prod-search-rating-count'>{ratingAverage}</p>
          <p className='prod-search-rating-text'>({ratingQuantity}) ratings</p>
        </div>

        <div className='prod-search-price-container'>
          <p className='prod-search-price'>₹{price}</p>
          <p className='prod-search-old-price'>₹{oldPrice}</p>
          <p className='prod-search-price-off'>50%</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductSearch;
