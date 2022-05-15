import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AddBoardButton.module.scss';

export const AddBoardButton: React.FC = () => {
  const { t } = useTranslation();
  const openModal = () => {
    console.log('open modal');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.container__board_name}>{t('mainPage.board.title')}</h2>
      <button className={styles.container__add_button} onClick={openModal} />
    </div>
  );
};
