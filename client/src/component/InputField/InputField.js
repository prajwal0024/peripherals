import React, { useState } from 'react';
import './InputField.css';

import { ReactComponent as ShowPassword } from '../../assests/icons/show_password.svg';
import { ReactComponent as HidePassword } from '../../assests/icons/hide_password.svg';

const InputField = ({
  label,
  disable,
  type,
  placeholder,
  value,
  handleChange,
  onClick,
  name,
  classes,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className='inputfield'>
      {label && <label className='inputfield-label'>{label}</label>}
      <input
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        className={`inputfield-input 
          ${type === 'password' && 'inputfield-input-password'} 
          ${disable && 'noselect'} ${classes}`}
        value={value}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        onClick={onClick}
      />
      {type === 'password' && (
        <div
          className='inputfield-icon-container'
          onClick={(e) => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <HidePassword className='inputfield-icon' />
          ) : (
            <ShowPassword className='inputfield-icon' />
          )}
        </div>
      )}
    </div>
  );
};

export default InputField;
