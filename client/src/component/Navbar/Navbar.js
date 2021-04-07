import React from 'react';
import './Navbar.css';

import { ReactComponent as HamIcon } from '../../assests/icons/hamburger.svg';
import { ReactComponent as SearchIcon } from '../../assests/icons/search.svg';
import { ReactComponent as CartIcon } from '../../assests/icons/cart.svg';

import LogoFull from '../../assests/images/logo_full.png';
import LogoSmall from '../../assests/images/logo_small.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='nav'>
      <div className=' nav-container'>
        <div className='nav-left'>
          <HamIcon className='nav-icon nav-icon-search' />
          <SearchIcon className='nav-icon nav-icon-search' />
        </div>
        <Link to='/home' className='nav-center'>
          <img src={LogoFull} alt='logo' className='nav-logo nav-logo-full' />
          <img src={LogoSmall} alt='logo' className='nav-logo nav-logo-small' />
        </Link>
        <div className='nav-right'>
          <CartIcon className='nav-icon' />
          <div className='nav-icon nav-user'></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
