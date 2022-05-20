import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../../../../../components/Modal/Modal';
import { useCustomDispatch, useCustomSelector } from '../../../../../customHooks/customHooks';
import { setBoardId } from '../../../../../store/boardPageSlice';
import { fetchApi } from '../../../../../store/fetchApi';
import { BoardType } from '../../../../../store/fetchApiTypes';
import { setIsModalHide } from '../../../../../store/mainPageSlice';
import styles from './BoardItem.module.scss';

export const BoardItem: React.FC<BoardType> = ({ id, title, description }) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [deleteBoard, {}] = fetchApi.useDeleteBoardByIdMutation();
  const { refetch } = fetchApi.useGetAllBoardsQuery('');
  const { t } = useTranslation();
  const dispatch = useCustomDispatch();
  const navigation = useNavigate();
  const selector = useCustomSelector((state) => state.mainPageSlice);

  const openBoardPage = () => {
    dispatch(setBoardId(id));
    navigation('/board');
  };

  const deleteBoardFromPage = async () => {
    setLoading(true);
    try {
      const response = await deleteBoard(id);
    } catch {
    } finally {
      setLoading(false);
      refetch();
    }
  };

  const openModal = () => {
    // dispatch(setIsModalHide(false));
    setOpen(true);
  };

  const closeModal = () => {
    // dispatch(setIsModalHide(true));
    setOpen(false);
  };

  return (
    <>
      <div className={styles.container} onClick={openBoardPage}>
        <h2 className={styles.container__board_name}>{title}</h2>
        <p className={styles.container__board_description}>{description}</p>
        {isLoading ? (
          <p className={styles.container__loader}>лоадер))</p>
        ) : (
          <div
            className={styles.container__delete_button}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              openModal();
            }}
          ></div>
        )}
      </div>
      <Modal
        title={t('modals.titles.deleteBoard')}
        submitText={t('modals.buttons.deleteBoard')}
        onSubmit={deleteBoardFromPage}
        closeModal={closeModal}
        isOpen={isOpen}
      >
        <h2>{t('modals.questions.deleteBoard')}</h2>
      </Modal>
    </>
  );
};
