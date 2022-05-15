import { CloseOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React, { useState } from 'react';
import Button from '../../../components/Button/Button';
import { useCustomSelector } from '../../../customHooks/customHooks';
import { fetchApi } from '../../../store/fetchApi';
import styles from './Main.module.scss';

const Main: React.FC = () => {
  const selector = useCustomSelector((state) => state.boardPageSlice);
  const [isFormActive, setToggleForm] = useState(false);
  const [inputText, setInputText] = useState('');
  const [createNewColumn, {}] = fetchApi.useCreateNewColumnMutation();
  const [deleteColumn, {}] = fetchApi.useDeleteColumnMutation();
  const { refetch } = fetchApi.useGetBoardByIdQuery(selector.id);
  const handleSumbit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setToggleForm(false);
    if (!inputText) {
      return;
    }
    const sortSelectorColumns = [...selector.columns].sort((a, b) => b.order - a.order);
    const board = {
      body: {
        title: inputText,
        order: sortSelectorColumns.length ? sortSelectorColumns[0].order + 1 : 1,
      },
      boardId: selector.id,
    };
    const response = await createNewColumn(board);
    setInputText('');
    refetch();
  };

  const deleteColumnFn = async (id: string) => {
    const response = await deleteColumn({
      boardId: selector.id,
      columnId: id,
    });
    refetch();
  };

  return (
    <main className={styles.main}>
      <h2>{selector.title}</h2>
      <div className={styles.board}>
        {selector.columns.map((column) => {
          return (
            <div className={styles.column} key={column.id}>
              <div className={styles['column-header']}>
                {column.title}
                <Button onClick={() => deleteColumnFn(column.id)} danger type="button">
                  <CloseOutlined style={{ fontSize: '8px' }} />
                </Button>
              </div>
            </div>
          );
        })}
        <div className={styles['add-new-column__wrapper']}>
          {!isFormActive ? (
            <Button onClick={() => setToggleForm(true)} type="button">
              + Add new column
            </Button>
          ) : (
            <form onSubmit={handleSumbit}>
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter list title..."
              />
              <div className={styles['buttons-wrapper']}>
                <Button type="submit">Add</Button>
                <Button onClick={() => setToggleForm(false)} type="button">
                  <CloseOutlined style={{ fontSize: '12px' }} />
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default Main;
