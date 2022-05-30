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
  max?: number;
  min?: number;
}

export interface ErrorsBlock {
  [key: string]: {
    type: string;
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
  max = 12,
  min = 1,
}) => {
  const { t } = useTranslation();

  return (
    <label className={styles.container}>
      <p className={styles.container__description}>{text}</p>
      <input
        className={styles.container__input}
        type={type}
        autoComplete="off"
        defaultValue={defaultValue}
        {...register(name, { required: true, maxLength: max, minLength: min })}
      />
      <p className={styles['container__error-message']}>
        {errors[name] && errors[name].type === 'required' && t('authForm.errors.empty')}
      </p>
      <p className={styles['container__error-message']}>
        {errors[name] && errors[name].type === 'maxLength' && `${t('authForm.errors.long')} ${max}`}
      </p>
      <p className={styles['container__error-message']}>
        {errors[name] &&
          errors[name].type === 'minLength' &&
          `${t('authForm.errors.short')} ${min}`}
      </p>
    </label>
  );
};
