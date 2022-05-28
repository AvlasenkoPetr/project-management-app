import { useState } from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import styles from './Task.module.scss';
import closeBtnSvg from '../../../../../../assets/svg/close-blue-dark.svg';
import { Modal } from '../../../../../../components/Modal/Modal';
import { useTranslation } from 'react-i18next';
import { fetchApi } from '../../../../../../store/fetchApi';

type Props = {
  title: string;
  id: string;
  index: number;
  columnId: string;
  boardId: string;
};
const Task: React.FC<Props> = (props) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const [deleteTask, {}] = fetchApi.useDeleteTaskMutation();
  const { refetch } = fetchApi.useGetBoardByIdQuery(props.boardId);

  const openModal = () => {
    // dispatch(setIsModalHide(false));
    setDeleteModalOpen(true);
  };

  const closeModal = () => {
    // dispatch(setIsModalHide(true));
    setDeleteModalOpen(false);
  };

  const deleteTaskFn = async () => {
    setDeleteModalOpen(false);
    const obj = {
      boardId: props.boardId,
      columnId: props.columnId,
      taskId: props.id,
    };
    await deleteTask(obj);
    refetch();
  };

  return (
    <>
      <Draggable draggableId={props.id} index={props.index}>
        {(provided: DraggableProvided) => {
          return (
            <div
              {...provided.draggableProps}
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              className={styles.task}
            >
              <p>{props.title}</p>
              <button className={styles['deleteColumn']} onClick={openModal}>
                <img src={closeBtnSvg} alt="" />
              </button>
            </div>
          );
        }}
      </Draggable>
      <Modal
        title={t('modals.titles.deleteTask')}
        submitText={t('modals.buttons.deleteTask')}
        onSubmit={deleteTaskFn}
        closeModal={closeModal}
        isOpen={isDeleteModalOpen}
      >
        <h2>{t('modals.questions.deleteTask')}</h2>
      </Modal>
    </>
  );
};

export default Task;
