import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styles from './FormInput.module.scss';

interface IProps {
  type: string;
  text: string;
  name: string;
  errors: ErrorsBlock;
  register: UseFormRegister<FieldValues>;
}

export interface ErrorsBlock {
  [key: string]: any;
}

export const FormInput: React.FC<IProps> = ({ text, type, name, register, errors }) => {
  const { t } = useTranslation();

  return (
    <label className={styles.container}>
      <p className={styles.container__description}>{text}</p>
      <input
        className={styles.container__input}
        type={type}
        {...register(name, { required: t('authForm.errors.empty') })}
      />
      <p className={styles['container__error-message']}>{errors[name] && errors[name].message}</p>
    </label>
  );
};
