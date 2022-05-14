import React from 'react';
import BordContainer from './Board/BordContainer';
import styles from './Main.module.scss';

const Main: React.FC = () => {
  return (
    <main className={styles.main}>
      <BordContainer />
    </main>
  );
};

export default Main;
