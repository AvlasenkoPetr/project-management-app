import React, { useState } from 'react';
import { fetchApi } from '../../../../../store/fetchApi';
import { BoardType } from '../../../../../store/fetchApiTypes';
import styles from './BoardItem.module.scss';

export const BoardItem: React.FC<BoardType> = ({ id, title, description }) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [deleteBoard, {}] = fetchApi.useDeleteBoardByIdMutation();
  const { refetch } = fetchApi.useGetAllBoardsQuery('');

  const openBoardPage = () => {
    console.log(`open ${id}  board`);
  };

  const deleteBoardOnPage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setLoading(true);
    try {
      const response = await deleteBoard(id);
    } catch {
    } finally {
      setLoading(false);
      refetch();
    }
  };

  return (
    <div className={styles.container} onClick={openBoardPage}>
      <h2 className={styles.container__board_name}>{title}</h2>
      <p className={styles.container__board_description}>{description}</p>
      {isLoading ? (
        <p className={styles.container__loader}>лоадер))</p>
      ) : (
        <button className={styles.container__delete_button} onClick={deleteBoardOnPage} />
      )}
    </div>
  );
};
