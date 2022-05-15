import React from 'react';
import BordContainer from './Board/BordContainer';
import { BoardsList } from './BoardsList/BoardsList';
import styles from './Main.module.scss';

const Main: React.FC = () => {
  return (
    <main className={styles.container}>
      <BoardsList />
    </main>
  );
};

export default Main;
