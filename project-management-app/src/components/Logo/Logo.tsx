import React from 'react';
import styles from './Logo.module.scss';
import logo from '../../assets/svg/Logo.svg';

const Logo: React.FC = () => {
  return (
    <a
      className={styles['logo__wrapper']}
      href="https://rs.school/"
      target="_blank"
      rel="noreferrer"
    >
      <img src={logo} alt="logo" />
    </a>
  );
};

export default Logo;
