import { Input } from 'antd';
import React from 'react';
import styles from './Input.module.scss';

type Props = {
  type: 'text' | 'password';
  children: string;
};

const CustomInput: React.FC<Props> = (props) => {
  return (
    <label htmlFor="input" className={styles.label}>
      <p>{props.children}</p>
      <Input name="input" type={props.type} />
    </label>
  );
};

export default CustomInput;
