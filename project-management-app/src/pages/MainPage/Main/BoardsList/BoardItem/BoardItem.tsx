import React from 'react';
import { BoardType } from '../../../../../store/fetchApiTypes';
import styles from './BoardItem.module.scss';

export const BoardItem: React.FC<BoardType> = ({ id, title, description }) => {
  const openBoardPage = () => {
    console.log(id);
  };

  return (
    <div className={styles.container} onClick={openBoardPage}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};
