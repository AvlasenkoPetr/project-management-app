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
  defaultValue?: readonly string[] | undefined;
}

export interface ErrorsBlock {
  [key: string]: {
    message: string;
  };
}

export const FormInput: React.FC<IProps> = ({
  text,
  type,
  name,
  defaultValue,
  register,
  errors,
}) => {
  const { t } = useTranslation();

  return (
    <label className={styles.container}>
      <p className={styles.container__description}>{text}</p>
      <input
        className={styles.container__input}
        type={type}
        defaultValue={defaultValue}
        {...register(name, { required: t('authForm.errors.empty') })}
        data-testid={type}
      />
      <p className={styles['container__error-message']}>{errors[name] && errors[name].message}</p>
    </label>
  );
};
