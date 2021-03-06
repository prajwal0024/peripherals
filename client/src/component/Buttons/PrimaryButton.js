import React from 'react';
import './Buttons.css';

import Loader from '../Loader/Loader';

const PrimaryButton = ({ classes, onClick, text, loading }) => {
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <button className={classes} onClick={onClick}>
          {text}
        </button>
      )}
    </>
  );
};

export default PrimaryButton;
