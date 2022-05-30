import React from 'react';
import Logo from '../Logo/Logo';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.container}>
      <Logo />
      <div className={styles.container__links}>
        <a href="https://github.com/AvlasenkoPetr" target="_blank" rel="noreferrer">
          AvlasenkoPetr
        </a>
        <a href="https://github.com/rakyt4gin" target="_blank" rel="noreferrer">
          rakyt4gin
        </a>
        <a href="https://github.com/R5G1" target="_blank" rel="noreferrer">
          R5G1
        </a>
      </div>
      <div className={styles.container__year}>2022</div>
    </footer>
  );
};

export default Footer;
