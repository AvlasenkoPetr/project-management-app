import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../../../../components/Modal/Modal';
import { useCustomDispatch, useCustomSelector } from '../../../../../customHooks/customHooks';
import { fetchApi } from '../../../../../store/fetchApi';
import { setIsModalHide } from '../../../../../store/mainPageSlice';
import styles from './AddBoardButton.module.scss';

export const AddBoardButton: React.FC = () => {
  const { t } = useTranslation();
  const [addBoard, {}] = fetchApi.useCreateNewBoardMutation();
  const { refetch } = fetchApi.useGetAllBoardsQuery('');
  const [isOpen, setOpen] = useState<boolean>(false);
  const dispatch = useCustomDispatch();
  const selector = useCustomSelector((state) => state.mainPageSlice);

  const openModal = () => {
    dispatch(setIsModalHide(false));
  };

  const closeModal = () => {
    dispatch(setIsModalHide(true));
  };

  const createBoard = async () => {
    closeModal();
    try {
      const response = await addBoard({ title: 'Homework', description: 'My homework' });
    } catch {
    } finally {
      refetch();
    }
  };

  return (
    <>
      <div className={styles.container} onClick={openModal}>
        <h2 className={styles.container__board_name}>{t('mainPage.board.title')}</h2>
        <button className={styles.container__add_button} />
      </div>
      <Modal
        title={t('modals.titles.createBoard')}
        submitText={t('modals.buttons.createBoard')}
        isModalHide={selector.isModalHide}
        closeModal={closeModal}
        onSubmit={createBoard}
      >
        <h1>Modal</h1>
      </Modal>
    </>
  );
};
