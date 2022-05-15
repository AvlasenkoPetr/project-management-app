import React from 'react';
import { useState } from 'react';
import { useCustomSelector } from '../../../../customHooks/customHooks';
import { BoardType } from '../../../../store/fetchApiTypes';
import { BoardItem } from './BoardItem/BoardItem';
import styles from './BoardsList.module.scss';

export const BoardsList: React.FC = () => {
  const data: BoardType[] | null = useCustomSelector((state) => state.mainPageSlice.data.boards);

  const [boards, setBoards] = useState<BoardType[] | null>(data);

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
    </div>
  );
};
