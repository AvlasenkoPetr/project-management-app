import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import '../ComponentsBoard/BoardStyle.scss';
import '../ComponentsBoard/ModalWindowsStyle.scss';
interface Iactiv {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalWindows({ active, setActive }: Iactiv) {
  const araySum: object[] = [];
  const [arrayConst, setarrayConst] = useState(araySum);
  const { register, handleSubmit } = useForm();

  function onSubmit(data: any, event: any) {
    data.id = uuid();
    setarrayConst([...arrayConst, data]);

    event.target.reset();

    setActive(false);
  }

  function Board() {
    function deleteArrray(id: string) {
      setarrayConst((prevForm: any) => prevForm.filter((el: { id: string }) => el.id !== id));
    }

    const listItems = arrayConst.map((item: any) => (
      <div className="board__contents-stylys" key={item.id}>
        <div className="board__container" style={{ background: `${item.color}` }}>
          <button onClick={() => deleteArrray(item.id)}>X</button>
          <div className="board-text-main">{item.textMain} </div>
          <div className="board-text-content">{item.textContent}</div>
          <div className="board-text-content">{item.id}</div>
          <div className="board-text-content">{item.color}</div>
        </div>
      </div>
    ));
    return <div className="board__content">{listItems}</div>;
  }
  return (
    <div>
      <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
        <div
          className={active ? 'modal-windows active' : 'modal-windows'}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={() => setActive(false)}>X</button>
          <form className="form-main" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-main__input-content">
              <label className="form-main__label-input">
                <p>Введите заголовок:</p>
                <input
                  required
                  className="form-main__input-text"
                  type="text"
                  {...register('textMain')}
                  placeholder="Введите заголовок"
                />
              </label>
              <label className="form-main__label-input">
                <p>Введите описание:</p>
                <input
                  required
                  className="form-main__input-text"
                  type="text"
                  {...register('textContent')}
                  placeholder="Введите описание"
                />
              </label>
              <label className="form-main__label-input">
                <p>Выберите цвет фона:</p>
                <input
                  defaultValue="#e1d5d5"
                  required
                  className="form-main__input-text"
                  type="color"
                  {...register('color')}
                />
              </label>
            </div>
            <div className="form-main__input-container-select">
              <select className="form-main__input-select" {...register('id')}>
                <option value={uuid()}>1</option>
              </select>
            </div>
            <button className="form-main__input-btn" type="submit">
              Создать
            </button>
          </form>
        </div>
      </div>
      <div>
        <Board />
      </div>
    </div>
  );
}
export default ModalWindows;
