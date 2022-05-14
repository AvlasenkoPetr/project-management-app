import React from 'react';
import { ReactNode } from 'react';
import styles from './HeaderButton.module.scss';

interface IProps {
  cb?: () => void;
  children: ReactNode;
}

const HeaderButton: React.FC<IProps> = ({ cb, children }) => {
  return (
    <button
      className={styles.header__button}
      onClick={() => {
        if (cb) cb();
      }}
    >
      {children}
    </button>
  );
};

export default HeaderButton;
