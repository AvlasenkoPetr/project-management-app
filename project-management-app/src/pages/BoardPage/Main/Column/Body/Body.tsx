import { useEffect } from 'react';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { useCustomDispatch, useCustomSelector } from '../../../../../customHooks/customHooks';
import { setNewOrderTasks } from '../../../../../store/boardPageSlice';
import { fetchApi } from '../../../../../store/fetchApi';
import { CreateNewTaskRequestType, TaskType } from '../../../../../store/fetchApiTypes';
import styles from './Body.module.scss';
import Task from './Task/Task';

type Props = {
  id: string;
  tasks: TaskType[];
};

const ColumnBody: React.FC<Props> = (props) => {
  const selector = useCustomSelector((state) => state.boardPageSlice);
  const UserId = useCustomSelector((state) => state.authorizeSlice.auth.id);
  const dispatch = useCustomDispatch();

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
              return <Task index={index} key={task.id} id={task.id} title={task.title} />;
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <button onClick={createNewTask}>Add new Task</button>
    </>
  );
};

export default ColumnBody;
