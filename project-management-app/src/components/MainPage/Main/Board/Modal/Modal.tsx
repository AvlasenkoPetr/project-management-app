import '../ComponentsBoard/Modal.scss';
interface Iactiv {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children?: object;
}

function Modal({ active, setActive, children }: Iactiv) {
  return (
    <div>
      <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
        <div
          className={active ? 'modal-content active' : 'modal-content'}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={() => setActive(false)}>X</button>
          {children}
        </div>
      </div>
    </div>
  );
}
export default Modal;
