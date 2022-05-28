import React from 'react';
import { useCustomSelector } from '../../../../customHooks/customHooks';
import { BoardType } from '../../../../store/fetchApiTypes';
import { AddBoardButton } from '../../../../components/AddBoardButton/AddBoardButton';
import { BoardItem } from './BoardItem/BoardItem';
import styles from './BoardsList.module.scss';
import { useTranslation } from 'react-i18next';

export const BoardsList: React.FC = () => {
  const { t } = useTranslation();
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
      <AddBoardButton>
        <div className={styles.add_container}>
          <h2 className={styles.add_container__board_name}>{t('mainPage.board.title')}</h2>
          <button className={styles.add_container__add_button} />
        </div>
      </AddBoardButton>
    </div>
  );
};
