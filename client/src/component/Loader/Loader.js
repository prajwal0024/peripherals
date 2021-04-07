import React from 'react';
import './loader.css';

const Loader = ({ classes }) => {
  return (
    <div className={`loader-container ${classes}`}>
      <span className='loader-dots loader-dot-1' />
      <span className='loader-dots loader-dot-2' />
      <span className='loader-dots loader-dot-3' />
    </div>
  );
};

export default Loader;
