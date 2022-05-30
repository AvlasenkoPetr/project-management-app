import React, { ReactElement } from 'react';
import { Button } from 'antd';
import styles from './Button.module.scss';
import { useNavigate } from 'react-router-dom';

type Props = {
  children: string | ReactElement;
  onClick?: () => void;
  danger?: boolean;
  redirect?: string;
  type: 'button' | 'submit' | 'reset';
};

const CustomButton: React.FC<Props> = (props) => {
  const navigation = useNavigate();
  function handleClick() {
    props.onClick && props.onClick();
    props.redirect && navigation(props.redirect);
  }

  return (
    <div className={styles['button-wrapper']}>
      <Button
        className={styles.button}
        htmlType={props.type}
        onClick={() => handleClick()}
        danger={props.danger}
      >
        {props.children}
      </Button>
    </div>
  );
};

export default CustomButton;
