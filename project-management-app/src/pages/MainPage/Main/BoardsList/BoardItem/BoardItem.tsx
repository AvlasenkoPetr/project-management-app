import React, { useState } from 'react';
import { BoardType } from '../../../../../store/fetchApiTypes';
import styles from './BoardItem.module.scss';

interface IProps {
  id: string;
  title: string;
  description: string;
  deleteBoardFromPage: (id: string) => void;
}

export const BoardItem: React.FC<IProps> = ({ id, title, description, deleteBoardFromPage }) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const openBoardPage = () => {
    console.log(`open ${id}  board`);
  };

  const deleteBoard = () => {
    setLoading(true);
    // fetch delete board
    setTimeout(() => {
      // finally
      setLoading(false);
      deleteBoardFromPage(id);
    }, 1000);
  };

  return (
    <div className={styles.container} onClick={openBoardPage}>
      <h2 className={styles.container__board_name}>{title}</h2>
      <p className={styles.container__board_description}>{description}</p>
      {isLoading ? (
        <p className={styles.container__loader}>лоадер))</p>
      ) : (
        <button className={styles.container__delete_button} onClick={deleteBoard} />
      )}
    </div>
  );
};
