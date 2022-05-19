import { CloseOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import { Modal } from '../../../components/Modal/Modal';
import { useCustomDispatch, useCustomSelector } from '../../../customHooks/customHooks';
import { fetchApi } from '../../../store/fetchApi';
import { setIsModalHide } from '../../../store/mainPageSlice';
import Column from './Column/Column';
import styles from './Main.module.scss';

const Main: React.FC = () => {
  const { t } = useTranslation();
  const mainSelector = useCustomSelector((state) => state.mainPageSlice);
  const [isOpen, setOpen] = useState<boolean>(false);
  const dispatch = useCustomDispatch();
  const selector = useCustomSelector((state) => state.boardPageSlice);
  const navigation = useNavigate();
  const [createNewColumn] = fetchApi.useCreateNewColumnMutation();
  const { refetch } = fetchApi.useGetBoardByIdQuery(selector.id);
  const returnToMainPage = () => {
    refetch();
    navigation('/');
  };

  const closeModal = () => {
    setOpen(false);
    // dispatch(setIsModalHide(true));
  };

  const createColumn = async () => {
    closeModal();
    console.log();
    try {
      const sortSelectorColumns = [...selector.columns].sort((a, b) => b.order - a.order);
      const board = {
        body: {
          title: 'ha',
          order: sortSelectorColumns.length ? sortSelectorColumns[0].order + 1 : 1,
        },
        boardId: selector.id,
      };
      await createNewColumn(board);
    } catch {
    } finally {
      refetch();
    }
  };

  const openModal = () => {
    setOpen(true);
    // dispatch(setIsModalHide(false));
  };

  return (
    <main className={styles.main}>
      <div className={styles['return-btn__wrapper']}>
        <Button onClick={returnToMainPage} type="button">
          {t('boardPage.buttons.returnToMainPage')}
        </Button>
      </div>
      <h2>{selector.title}</h2>
      <div className={styles.board}>
        {selector.columns.map((column) => {
          return (
            <Column key={column.id} order={column.order} id={column.id} title={column.title} />
          );
        })}
        <div className={styles['add-new-column__wrapper']}>
          <Button onClick={openModal} type="button">
            {t('boardPage.buttons.addNewColumn')}
          </Button>
          {/* <Modal
            title={t('modals.titles.createBoard')}
            submitText={t('modals.buttons.createBoard')}
            // isModalHide={mainSelector.isModalHide}
            closeModal={closeModal}
            isOpen={isOpen}
            onSubmit={createColumn}
          >
            <h1>Modal</h1>
          </Modal> */}
        </div>
      </div>
    </main>
  );
};

export default Main;
