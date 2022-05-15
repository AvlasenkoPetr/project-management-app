import React from 'react';
import { useCustomSelector } from '../../../../customHooks/customHooks';
import { BoardType } from '../../../../store/fetchApiTypes';
import { AddBoardButton } from './AddBoardButton/AddBoardButton';
import { BoardItem } from './BoardItem/BoardItem';
import styles from './BoardsList.module.scss';

export const BoardsList: React.FC = () => {
  const boards: BoardType[] | null = useCustomSelector((state) => state.mainPageSlice.data.boards);

  return (
    <div className={styles.container}>
      {boards &&
        boards.map((board) => {
          return (
            <BoardItem
              id={board.id}
              title={board.title}
              description={board.description}
              key={board.id}
            />
          );
        })}
      <AddBoardButton />
    </div>
  );
};
