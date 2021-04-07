import React from 'react';
import './Footer.css';
import FullLogo from '../../assests/images/logo_full.png';

import { ReactComponent as LinkedinLogo } from '../../assests/icons/linkedin_logo.svg';
import { ReactComponent as GithubLogo } from '../../assests/icons/github_logo.svg';
import { ReactComponent as TwitterLogo } from '../../assests/icons/twitter_logo.svg';
import { ReactComponent as InstagramLogo } from '../../assests/icons/instagram_logo.svg';

const Footer = () => {
  return (
    <div className='footer'>
      <img src={FullLogo} alt='logo' className='footer-logo' />
      <div className='container footer-container'>
        <p className='footer-text'>designed and developed by prajwal</p>
        <div className='footer-icons-container'>
          <LinkedinLogo className='footer-icon' />
          <GithubLogo className='footer-icon' />
          <TwitterLogo className='footer-icon' />
          <InstagramLogo className='footer-icon' />
        </div>
      </div>
    </div>
  );
};

export default Footer;
