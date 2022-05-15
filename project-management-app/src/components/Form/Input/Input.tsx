import { Input } from 'antd';
import React, { useState } from 'react';
import styles from './Input.module.scss';
type Props = {
  type: 'text' | 'password';
  children: string;
};

const CustomInput: React.FC<Props> = (props) => {
  const [title, setTitle] = useState('');
  const isValid = title != null && title.trim().length > 0;
  function IsDisabled(): JSX.Element | undefined | any {
    if (!isValid) {
      return <div className="button-false">Поля обязательно к заполнению</div>;
    }
    if (title.trim().length <= 4) {
      return <div style={{ color: 'red' }}>минимум 4 символa</div>;
    }
  }

  return (
    <label htmlFor="input" className={styles.label}>
      <p>{props.children}</p>
      <Input
        name="input"
        required
        minLength={4}
        type={props.type}
        onChange={(event) => setTitle(event.target.value)}
      />
      <IsDisabled />
    </label>
  );
};

export default CustomInput;
