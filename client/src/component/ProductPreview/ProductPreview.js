import React from 'react';
import './ProductPreview.css';
import ProductMissing from '../../assests/images/product_missing.png';
import { Link } from 'react-router-dom';

const ProductPreview = ({
  name,
  shortDesc,
  ratingAvg,
  ratingQty,
  price,
  image,
  productId,
}) => {
  return (
    <Link className='prod-prev' to={`/products/${productId}`}>
      <div className='prod-prev-image-container'>
        <img
          src={image || ProductMissing}
          alt='product missing'
          className='prod-prev-image'
        />
      </div>
      <div className='prod-prev-text-container'>
        <h4 className='prod-prev-name'>
          {(name && `${name.substr(0, 23)}...`) || 'Product Name'}
        </h4>
        <p className='prod-prev-desc'>{shortDesc || 'Product desc'}</p>
        <div className='prod-prev-rating-container'>
          <p className='prod-prev-rating'>{ratingAvg}</p>
          <p className='prod-prev-rating-count'>
            ({ratingQty}) rating{ratingQty !== 1 && 's'}
          </p>
        </div>
        <h4 className='prod-prev-price'>
          Rs. <span>{price}</span>
        </h4>
      </div>
    </Link>
  );
};

export default ProductPreview;
