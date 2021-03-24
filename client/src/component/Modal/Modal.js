import React, { useState } from 'react';
import './modal.css';

const Modal = ({
  heading,
  message,
  onPrimaryClick,
  onSecondaryClick,
  activate,
  setActivate,
  secondaryText,
  primaryText,
}) => {
  const closeModal = () => setActivate(false);
  return (
    <div className={`modal-overlay ${!activate && 'hidden'}`}>
      <div className='modal-body'>
        <h1 className='modal-heading'>{heading}</h1>
        <hr className='modal-line' />
        <p className='modal-message'>{message}</p>
        <div className='modal-btn-container'>
          {onSecondaryClick && (
            <button
              className='modal-btn modal-btn-secondary'
              onClick={
                onSecondaryClick === 'close-modal'
                  ? closeModal
                  : onSecondaryClick
              }
            >
              {secondaryText || 'No'}
            </button>
          )}
          {onPrimaryClick && (
            <button
              className='modal-btn modal-btn-primary'
              onClick={
                onPrimaryClick === 'close-modal' ? closeModal : onPrimaryClick
              }
            >
              {primaryText || 'Yes'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
