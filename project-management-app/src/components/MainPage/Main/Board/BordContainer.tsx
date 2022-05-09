import '../Board/BordContainerStyle.scss';
import React, { useState } from 'react';
import { Button } from 'antd';
import ModalWindows from './ComponentsBoard/ModalWindows';

function BordContainer() {
  const [modalActiv, setModalActiv] = useState(false);
  const boardArray: object = [];
  const [array, setArray] = useState(boardArray);

  return (
    <div className="bord-container">
      <div className="bc__contents">
        {/* <div>
          <Board formA={array} setFormA={setArray} />
        </div> */}
        <div>
          <ModalWindows
            active={modalActiv}
            setActive={setModalActiv}
            formA={array}
            setFormA={setArray}
          />
        </div>
        <Button className="btn-content" onClick={() => setModalActiv(true)}>
          <h3>Создать доску</h3>
        </Button>
      </div>
    </div>
  );
}

export default BordContainer;
