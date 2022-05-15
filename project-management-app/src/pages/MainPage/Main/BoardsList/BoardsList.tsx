import React from 'react';
import { BoardItem } from './BoardItem/BoardItem';
import styles from './BoardsList.module.scss';

export const BoardsList: React.FC = () => {
  return (
    <div className={styles.container}>
      <BoardItem></BoardItem>
      <BoardItem></BoardItem>
      <BoardItem></BoardItem>
      <BoardItem></BoardItem>
      <BoardItem></BoardItem>
      <BoardItem></BoardItem>
    </div>
  );
};
