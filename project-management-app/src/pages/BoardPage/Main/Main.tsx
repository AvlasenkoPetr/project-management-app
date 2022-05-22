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
import { DragDropContext, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd';
import { GetColumnByIdType } from '../../../store/fetchApiTypes';
import { setNewOrderColumns } from '../../../store/boardPageSlice';
import { fireEvent } from '@testing-library/react';

const Main: React.FC = () => {
  const { t } = useTranslation();
  const mainSelector = useCustomSelector((state) => state.mainPageSlice);
  const [isOpen, setOpen] = useState<boolean>(false);
  const dispatch = useCustomDispatch();
  const selector = useCustomSelector((state) => state.boardPageSlice);
  const navigation = useNavigate();
  const [createNewColumn, { error: customError }] = fetchApi.useCreateNewColumnMutation();
  const { refetch } = fetchApi.useGetBoardByIdQuery(selector.id);
  const [updateColumn, { error: UpdateError }] = fetchApi.useUpdateColumnMutation();
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
      const board = {
        body: {
          title: 'ha',
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

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    if (type === 'column') {
      const newColumnOrder = [...selector.columns];
      const spliceColumn = newColumnOrder.splice(source.index, 1) as GetColumnByIdType[];
      newColumnOrder.splice(destination.index, 0, ...spliceColumn);
      const a = newColumnOrder.map((column, index) => {
        return { ...column, order: index + 1 };
      });
      for (let i = 0; i < a.length; i++) {
        const obj = {
          boardId: selector.id,
          columnId: a[i].id,
          body: {
            title: a[i].title,
            order: a[i].order,
          },
        };
        updateColumn(obj);
      }
      dispatch(setNewOrderColumns(a));
      return;
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles['return-btn__wrapper']}>
        <Button onClick={returnToMainPage} type="button">
          {t('boardPage.buttons.returnToMainPage')}
        </Button>
      </div>
      <h2>{selector.title}</h2>
      <div className={styles['board-wrapper']}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {(provided: DroppableProvided) => (
              <div className={styles.board} {...provided.droppableProps} ref={provided.innerRef}>
                {selector.columns.map((column, index: number) => {
                  return (
                    <Column
                      index={index}
                      key={column.id}
                      order={column.order}
                      id={column.id}
                      title={column.title}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className={styles['add-new-column__wrapper']}>
          <Button onClick={openModal} type="button">
            {t('boardPage.buttons.addNewColumn')}
          </Button>
          <Modal
            title={t('modals.titles.createBoard')}
            submitText={t('modals.buttons.createBoard')}
            // isModalHide={mainSelector.isModalHide}
            closeModal={closeModal}
            isOpen={isOpen}
            onSubmit={createColumn}
          >
            <h1>Modal</h1>
          </Modal>
        </div>
      </div>
    </main>
  );
};

export default Main;
