import React from 'react';
import Header from './Header/Header';
import styles from './WelcomePage.module.scss';

const WelcomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />
    </div>
  );
};

export default WelcomePage;
