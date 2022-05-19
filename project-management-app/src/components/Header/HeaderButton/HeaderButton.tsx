import React, { ReactNode } from 'react';
import ButtonBlueDark from '../../ButtonBlueDark/ButtonBlueDark';
import styles from './HeaderButton.module.scss';

interface IProps {
  cb?: () => void;
  children: ReactNode;
}

export const HeaderButton: React.FC<IProps> = ({ children, cb }) => {
  return (
    <div className={styles.wrapper}>
      <ButtonBlueDark cb={cb}>{children}</ButtonBlueDark>
    </div>
  );
};
