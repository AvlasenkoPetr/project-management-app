import '../Board/BordContainerStyle.scss';
import React, { useState } from 'react';
import { Button } from 'antd';
import ModalWindows from './ComponentsBoard/ModalWindows';

function BordContainer() {
  const [modalActiv, setModalActiv] = useState(false);

  return (
    <div className="bord-container">
      <div className="bc__contents">
        <div>
          <ModalWindows active={modalActiv} setActive={setModalActiv} />
        </div>
        <Button className="btn-content" onClick={() => setModalActiv(true)}>
          <h3>Создать доску</h3>
        </Button>
      </div>
    </div>
  );
}

export default BordContainer;
