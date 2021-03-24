import React, { useEffect, useRef } from 'react';
import './alert.css';
import { useSelector } from 'react-redux';

const Alert = () => {
  const { message, activate } = useSelector((state) => state.alert);

  const ref = useRef(null);
  let isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    ref.current.className = 'alert alert-show';
    setTimeout(() => (ref.current.className = 'alert alert-hide'), 3000);
  }, [activate]);

  return (
    <div className='alert-container'>
      <div ref={ref} className='alert hidden'>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Alert;
