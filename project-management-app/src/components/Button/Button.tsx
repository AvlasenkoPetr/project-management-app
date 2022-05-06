import React from 'react';
import { Button } from 'antd';
import styles from './Button.module.scss';

type Props = {
  children: string;
  danger?: boolean;
};

const CustomButton: React.FC<Props> = (props) => {
  return (
    <div className={styles['button-wrapper']}>
      <Button danger={props.danger}>{props.children}</Button>
    </div>
  );
};

export default CustomButton;
