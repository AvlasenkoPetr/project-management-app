import { useState } from 'react';
import { useCustomSelector } from '../../../../../customHooks/customHooks';
import { fetchApi } from '../../../../../store/fetchApi';
import styles from './Column.module.scss';
import closeBtnSvg from '../../../../../assets/svg/close-blue-dark.svg';
import rejectChangeTitleBtnSvg from '../../../../../assets/svg/close-blue-dark.svg';
import submitChangeTitleBtnSvg from '../../../../../assets/svg/add-blue-dark.svg';

type Props = {
  id: string;
  order: number;
  title: string;
};

const ColumnHeader: React.FC<Props> = (props) => {
  const [isTextAreaShow, toggleTextArea] = useState(false);
  const [previosInputTitle, setPreviousInputTitle] = useState(props.title);
  const [textareaValue, setTextAreaValue] = useState(props.title);
  const [updateColumn, {}] = fetchApi.useUpdateColumnMutation();
  const selector = useCustomSelector((state) => state.boardPageSlice);
  const { refetch } = fetchApi.useGetBoardByIdQuery(selector.id);
  const [deleteColumn, {}] = fetchApi.useDeleteColumnMutation();

  const deleteColumnFn = async (id: string) => {
    await deleteColumn({
      boardId: selector.id,
      columnId: id,
    });
    refetch();
  };

  const submitTitle = async () => {
    try {
      const column = {
        boardId: selector.id,
        columnId: props.id,
        body: {
          title: textareaValue,
          order: props.order,
        },
      };
      setPreviousInputTitle(textareaValue);
      await updateColumn(column);
    } catch {
    } finally {
      refetch();
      toggleTextArea(false);
    }
  };

  const rejectTitle = () => {
    toggleTextArea(false);
    setTextAreaValue(previosInputTitle);
  };

  const changeTextAreaValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTextAreaValue(event.target.value);
  };

  return (
    <div className={styles['column-header']}>
      {isTextAreaShow && (
        <div className={styles['column-header-btn__wrapper']}>
          <button onClick={() => submitTitle()}>
            <img src={submitChangeTitleBtnSvg} alt="" />
          </button>
          <button onClick={() => rejectTitle()}>
            <img src={rejectChangeTitleBtnSvg} alt="" />
          </button>
        </div>
      )}
      {isTextAreaShow ? (
        <input
          className={isTextAreaShow ? styles['show'] : styles['hide']}
          onChange={changeTextAreaValue}
          value={textareaValue}
        ></input>
      ) : (
        <p className={styles['placeholder']} onClick={() => toggleTextArea(true)}>
          {textareaValue}
        </p>
      )}
      <button className={styles['deleteColumn']} onClick={() => deleteColumnFn(props.id)}>
        <img src={closeBtnSvg} alt="" />
      </button>
    </div>
  );
};

export default ColumnHeader;
