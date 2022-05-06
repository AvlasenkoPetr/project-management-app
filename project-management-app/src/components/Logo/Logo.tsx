import React from 'react';
import styles from './Logo.module.scss';
import logo from '../../assets/img/Logo.png';

const Logo: React.FC = () => {
  return (
    <div className={styles['logo__wrapper']}>
      <img src={logo} alt="logo" />
    </div>
  );
};

export default Logo;
