import React from 'react';
import './loader.css';

const Loader = () => {
  return (
    <div className='loader-container'>
      <span className='loader-dots loader-dot-1' />
      <span className='loader-dots loader-dot-2' />
      <span className='loader-dots loader-dot-3' />
    </div>
  );
};

export default Loader;
