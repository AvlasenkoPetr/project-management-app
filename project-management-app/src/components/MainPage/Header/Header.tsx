import React, { useEffect, useState } from 'react';
import Button from '../../Button/Button';
import styles from './Header.module.scss';
import '../Header/HeaderComponents/HeaderStyles.scss';

const Header: React.FC = () => {
  const dark = 'rgba(0, 0, 0, 0.6)';
  const light = 'rgba(0, 0, 0, 0.2)';
  const [scroll, setScroll] = useState(dark);

  const listenScrollEvent = () => {
    if (window.scrollY > 100) {
      setScroll(light);
    } else {
      setScroll(dark);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
  });
  return (
    <div className="section-heder">
      <header className="contents__heder" style={{ background: scroll }}>
        <Button type="button">Edit Profile</Button>
        <Button type="button">Create board</Button>
        <Button type="button">En/Ru</Button>
        <Button type="button" danger>
          Logout
        </Button>
      </header>
    </div>
  );
};

export default Header;
