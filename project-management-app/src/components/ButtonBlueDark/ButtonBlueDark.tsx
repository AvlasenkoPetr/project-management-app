import React from 'react';
import { ReactNode } from 'react';
import styles from './ButtonBlueDark.module.scss';

interface IProps {
  cb?: () => void;
  children: ReactNode;
}

const ButtonBlueDark: React.FC<IProps> = ({ cb, children }) => {
  return (
    <button
      className={styles.container}
      onClick={() => {
        if (cb) cb();
      }}
    >
      {children}
    </button>
  );
};

export default ButtonBlueDark;
