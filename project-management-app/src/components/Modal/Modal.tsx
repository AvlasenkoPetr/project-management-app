import React from 'react';
import styles from './Modal.module.scss';
import { Portal } from '../Portal/Portal';
import { t } from 'i18next';

interface IProps {
  title: string;
  submitText: string;
  isModalHide: boolean;
  closeModal: () => void;
  onSubmit: () => void;
}

export const Modal: React.FC<IProps> = ({
  title,
  submitText,
  isModalHide,
  closeModal,
  onSubmit,
  children,
}) => {
  const submitButtonClasses = `${styles.container__button} ${styles.container__submit_button}`;
  const cancelButtonClasses = `${styles.container__button} ${styles.container__cancel_button}`;

  return (
    <>
      {!isModalHide && (
        <Portal>
          <div className={styles.overlay} onClick={closeModal}>
            <div className={styles.container} onClick={(e) => e.stopPropagation()}>
              <div className={styles.container__header}>
                <h3>{title}</h3>
                <button className={styles.container__close_button} onClick={closeModal} />
              </div>
              {children}
              <div className={styles.container__main_buttons}>
                <button className={submitButtonClasses} onClick={onSubmit}>
                  {submitText}
                </button>
                <button className={cancelButtonClasses} onClick={closeModal}>
                  {t('modals.buttons.cancel')}
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};
