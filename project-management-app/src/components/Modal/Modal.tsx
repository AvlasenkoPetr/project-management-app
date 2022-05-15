import React from 'react';
// import styles from './CreateBoardModal.module.scss';
import modalStyles from './Modal.module.scss';
import { Portal } from '../Portal/Portal';

interface IProps {
  title: string;
  isOpen: boolean;
  closeModal: () => void;
}

export const Modal: React.FC<IProps> = ({ title, isOpen, closeModal, children }) => {
  return (
    <>
      {isOpen && (
        <Portal>
          <div className={modalStyles.overlay}>
            <div className={modalStyles.container}>
              <div className={modalStyles.container__header}>
                <p>{title}</p>
              </div>
              {children}
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};
