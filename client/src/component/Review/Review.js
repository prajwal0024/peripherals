import React from 'react';
import './Review.css';

import { ReactComponent as LikeIcon } from '../../assests/icons/like.svg';
import { ReactComponent as DislikeIcon } from '../../assests/icons/dislike.svg';

const Review = () => {
  return (
    <div className='review'>
      <div className='review-header'>
        <div className='review-rating-container'>
          <p className='review-rating'>3.2</p>
          <h4 className='review-title'>Super</h4>
        </div>
        <p className='review-time'>8 months ago</p>
      </div>
      <p className='review-text'>
        What more do you need at this price segment ?! It’s a beast. Very
        powerful. I can easily edit 4k videos. Design and build quality is
        superb. Dragon center gives you an advantage to set your laptop
        according to your usage and preferences. With single fan thermal control
        is great. Speakers are way better than other brands.{' '}
      </p>
      <div className='review-footer'>
        <p className='review-buyer'>By: Steve | VERIFIED BUYER</p>
        <div className='review-action-container'>
          <div className='review-action'>
            <LikeIcon className='review-action-icon review-action-icon-like' />
            <p className='review-action-count'>2</p>
          </div>
          <div className='review-action'>
            <DislikeIcon className='review-action-icon review-action-icon-dislike' />
            <p className='review-action-count'>1</p>
          </div>
        </div>
      </div>
      <hr className='review-line' />
    </div>
  );
};

export default Review;
