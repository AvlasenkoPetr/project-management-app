import React from 'react';
import { useState } from 'react';
import { useCustomSelector } from '../../../../customHooks/customHooks';
import { BoardType } from '../../../../store/fetchApiTypes';
import { AddBoardButton } from './AddBoardButton/AddBoardButton';
import { BoardItem } from './BoardItem/BoardItem';
import styles from './BoardsList.module.scss';

export const BoardsList: React.FC = () => {
  const data: BoardType[] | null = useCustomSelector((state) => state.mainPageSlice.data.boards);

  const [boards, setBoards] = useState<BoardType[] | null>(data);

  const deleteBoardFromPage = (id: string) => {
    const newBoardsList = boards?.filter((board) => board.id != id);
    // наверн нужно еще поменять борды в редаксе?
    setBoards(newBoardsList || null);
  };

  return (
    <div className={styles.container}>
      {boards &&
        boards.map((board) => {
          return (
            <BoardItem
              id={board.id}
              title={board.title}
              description={board.description}
              deleteBoardFromPage={deleteBoardFromPage}
              key={board.id}
            />
          );
        })}
      <AddBoardButton />
    </div>
  );
};
