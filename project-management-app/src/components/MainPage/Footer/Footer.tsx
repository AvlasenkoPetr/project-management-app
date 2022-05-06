import React from 'react';
import Logo from '../../Logo/Logo';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Logo />
      <div>Name 1 Name 2 Name 3</div>
      <div>2022</div>
    </footer>
  );
};

export default Footer;
