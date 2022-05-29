import { useEffect, useState } from 'react';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../../../../components/Modal/Modal';
import { useCustomDispatch, useCustomSelector } from '../../../../../customHooks/customHooks';
import { setNewOrderTasks } from '../../../../../store/boardPageSlice';
import { fetchApi } from '../../../../../store/fetchApi';
import { CreateNewTaskRequestType, TaskType } from '../../../../../store/fetchApiTypes';
import styles from './Body.module.scss';
import Task from './Task/Task';
import { useForm } from 'react-hook-form';
import { FormInput } from '../../../../../components/FormInput/FormInput';
import { ISubmitData } from '../../../../../components/Form/Form';

interface INewBoardBody {
  title: string;
  description: string;
}

type Props = {
  id: string;
  tasks: TaskType[];
};

const ColumnBody: React.FC<Props> = (props) => {
  const selector = useCustomSelector((state) => state.boardPageSlice);
  const UserId = useCustomSelector((state) => state.authorizeSlice.auth.id);
  const dispatch = useCustomDispatch();
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    reValidateMode: 'onBlur',
  });

  const { refetch } = fetchApi.useGetBoardByIdQuery(selector.id);

  const [createNewTaskFn, { error: customError }] = fetchApi.useCreateNewTaskMutation();

  const createNewTask = async () => {
    const task: CreateNewTaskRequestType = {
      boardId: selector.id,
      columnId: props.id,
      body: {
        title: '9',
        description: 'Description',
        userId: UserId,
      },
    };
    await createNewTaskFn(task);
    refetch();
  };

  const openModal = () => {
    // dispatch(setIsModalHide(false));
    setOpen(true);
  };

  const closeModal = () => {
    // dispatch(setIsModalHide(true));
    setOpen(false);
  };

  const createBoardBody = (data: ISubmitData) => {
    const newBoard: CreateNewTaskRequestType = {
      boardId: selector.id,
      columnId: props.id,
      body: {
        title: data.title,
        description: data.description,
        userId: UserId,
      },
    };
    createBoard(newBoard);
  };

  const createBoard = async (newBoard: CreateNewTaskRequestType) => {
    try {
      const response = await createNewTaskFn(newBoard);
    } catch {
    } finally {
      closeModal();
      reset();
      refetch();
    }
  };

  return (
    <>
      <Droppable droppableId={props.id}>
        {(provided: DroppableProvided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={styles['tasks__wrapper']}
          >
            {props.tasks.map((task, index) => {
              return (
                <Task
                  index={index}
                  columnId={props.id}
                  boardId={selector.id}
                  order={task.order}
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  userId={UserId}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <button onClick={openModal}>Add new Task</button>
      <Modal
        title={t('modals.titles.createTask')}
        submitText={t('modals.buttons.createTask')}
        isOpen={isOpen}
        closeModal={closeModal}
        onSubmit={handleSubmit(createBoardBody)}
      >
        <form>
          <FormInput
            text={t('authForm.inputs.title')}
            type="text"
            name="title"
            register={register}
            errors={errors}
          ></FormInput>
          <FormInput
            text={t('authForm.inputs.description')}
            type="text"
            name="description"
            register={register}
            errors={errors}
          ></FormInput>
        </form>
      </Modal>
    </>
  );
};

export default ColumnBody;
