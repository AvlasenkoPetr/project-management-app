import { useState } from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import styles from './Task.module.scss';
import closeBtnSvg from '../../../../../../assets/svg/close-blue-dark.svg';
import { Modal } from '../../../../../../components/Modal/Modal';
import { useTranslation } from 'react-i18next';
import { fetchApi } from '../../../../../../store/fetchApi';
import { FormInput } from '../../../../../../components/FormInput/FormInput';
import { useForm } from 'react-hook-form';
import { TextArea } from './TextArea/TextArea';
import { UpdateTaskRequestType } from '../../../../../../store/fetchApiTypes';
import { ISubmitData } from '../../../../../../components/Form/Form';

type Props = {
  title: string;
  id: string;
  index: number;
  columnId: string;
  boardId: string;
  description: string;
  order: number;
  userId: string;
};
const Task: React.FC<Props> = (props) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const [deleteTask, {}] = fetchApi.useDeleteTaskMutation();
  const [updateTask, {}] = fetchApi.useUpdateTaskMutation();
  const { refetch } = fetchApi.useGetBoardByIdQuery(props.boardId);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    reValidateMode: 'onBlur',
  });

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
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

  const editTaskFn = async (data: ISubmitData) => {
    setEditModalOpen(false);
    const obj: UpdateTaskRequestType = {
      boardId: props.boardId,
      columnId: props.columnId,
      taskId: props.id,
      body: {
        title: data.title,
        description: data.description,
        order: props.order,
        userId: props.userId,
        boardId: props.boardId,
        columnId: props.columnId,
      },
    };
    await updateTask(obj);
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
              className={styles.container}
              onDoubleClick={openEditModal}
            >
              <p className={styles.container__title}>{props.title}</p>
              <button className={styles['deleteColumn']} onClick={openDeleteModal} />
            </div>
          );
        }}
      </Draggable>
      <Modal
        title={t('modals.titles.deleteTask')}
        submitText={t('modals.buttons.deleteTask')}
        onSubmit={deleteTaskFn}
        closeModal={closeDeleteModal}
        isOpen={isDeleteModalOpen}
      >
        <h2>{t('modals.questions.deleteTask')}</h2>
      </Modal>
      <Modal
        title={t('modals.titles.editTask')}
        submitText={t('modals.buttons.editTask')}
        onSubmit={handleSubmit(editTaskFn)}
        closeModal={closeEditModal}
        isOpen={isEditModalOpen}
      >
        <form>
          <FormInput
            text={t('authForm.inputs.title')}
            type="text"
            name="title"
            register={register}
            errors={errors}
            defaultValue={[props.title]}
          ></FormInput>
          <TextArea
            text={t('authForm.inputs.description')}
            type="text"
            name="description"
            register={register}
            errors={errors}
            defaultValue={[props.description]}
          />
        </form>
      </Modal>
    </>
  );
};

export default Task;
