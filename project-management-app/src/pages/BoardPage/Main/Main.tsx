import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCustomDispatch, useCustomSelector } from '../../../customHooks/customHooks';
import { fetchApi } from '../../../store/fetchApi';
import Column from './Column/Column';
import styles from './Main.module.scss';
import { DragDropContext, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd';
import { GetColumnByIdType, TaskType, UpdateTaskRequestType } from '../../../store/fetchApiTypes';
import { setNewOrderColumns, setNewOrderTasks } from '../../../store/boardPageSlice';
import { AddColumnButton } from './AddColumnButton/AddColumnButton';
import { ReturnButton } from '../../../components/ReturnButton/ReturnButton';

const Main: React.FC = () => {
  const { t } = useTranslation();
  const mainSelector = useCustomSelector((state) => state.mainPageSlice);
  const authSelector = useCustomSelector((state) => state.authorizeSlice);
  const [isOpen, setOpen] = useState<boolean>(false);
  const dispatch = useCustomDispatch();
  const selector = useCustomSelector((state) => state.boardPageSlice);
  const navigation = useNavigate();
  const [createNewColumn, { error: customError }] = fetchApi.useCreateNewColumnMutation();
  const { refetch } = fetchApi.useGetBoardByIdQuery(selector.id);
  const [updateColumn, { error: UpdateError }] = fetchApi.useUpdateColumnMutation();
  const [updateTask, {}] = fetchApi.useUpdateTaskMutation();
  const returnToMainPage = () => {
    refetch();
    navigation('/');
  };

  const closeModal = () => {
    setOpen(false);
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
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (type === 'DEFAULT') {
      const columnStart = selector.columns.filter((item) => item.id == source.droppableId);
      const columnFinish = selector.columns.filter((item) => item.id == destination.droppableId);
      if (JSON.stringify(columnStart) === JSON.stringify(columnFinish)) {
        const newTasksById = [...columnStart[0].tasks];
        const spliceTask = newTasksById.splice(source.index, 1) as TaskType[];
        newTasksById.splice(destination.index, 0, ...spliceTask);
        const a = newTasksById.map((task, index) => {
          return { ...task, order: index + 1 };
        });
        for (let i = 0; i < a.length; i++) {
          const obj: UpdateTaskRequestType = {
            boardId: selector.id,
            columnId: columnStart[0].id,
            taskId: a[i].id,
            body: {
              title: a[i].title,
              order: a[i].order,
              description: a[i].description,
              userId: authSelector.auth.id,
              boardId: selector.id,
              columnId: columnStart[0].id,
            },
          };
          try {
            updateTask(obj);
          } catch {}
        }
        dispatch(
          setNewOrderTasks({
            columnId: columnStart[0].id,
            tasks: a,
          })
        );
        return;
      }

      const startTaskById = [...columnStart[0].tasks];
      const spliceTask = startTaskById.splice(source.index, 1) as TaskType[];
      for (let i = 0; i < startTaskById.length; i++) {
        const obj: UpdateTaskRequestType = {
          boardId: selector.id,
          columnId: columnStart[0].id,
          taskId: startTaskById[i].id,
          body: {
            title: startTaskById[i].title,
            order: startTaskById[i].order,
            description: startTaskById[i].description,
            userId: authSelector.auth.id,
            boardId: selector.id,
            columnId: columnStart[0].id,
          },
        };
        try {
          updateTask(obj);
        } catch {}
      }
      dispatch(
        setNewOrderTasks({
          columnId: columnStart[0].id,
          tasks: startTaskById,
        })
      );
      const finishTaskById = [...columnFinish[0].tasks];
      finishTaskById.splice(destination.index, 0, ...spliceTask);
      const a = finishTaskById.map((task, index) => {
        return { ...task, order: index + 1 };
      });
      for (let i = 0; i < a.length; i++) {
        const obj: UpdateTaskRequestType = {
          boardId: selector.id,
          columnId: columnStart[0].id,
          taskId: a[i].id,
          body: {
            title: a[i].title,
            order: a[i].order,
            description: a[i].description,
            userId: authSelector.auth.id,
            boardId: selector.id,
            columnId: columnFinish[0].id,
          },
        };
        try {
          updateTask(obj);
        } catch {}
      }
      dispatch(
        setNewOrderTasks({
          columnId: columnFinish[0].id,
          tasks: a,
        })
      );
    }

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
    <main className={styles.container}>
      <ReturnButton />
      <h2 className={styles.container_title}>{selector.title}</h2>
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
                      tasks={column.tasks}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <AddColumnButton />
      </div>
    </main>
  );
};

export default Main;
