import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styles from './TextArea.module.scss';

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

export const TextArea: React.FC<IProps> = ({
  text,
  type,
  name,
  defaultValue,
  register,
  errors,
  max,
  min,
}) => {
  const { t } = useTranslation();

  return (
    <label className={styles.container}>
      <p className={styles.container__description}>{text}</p>
      <textarea
        className={styles.container__textarea}
        defaultValue={defaultValue}
        {...register(name, { required: true, maxLength: max || 12, minLength: min || 1 })}
        data-testid={type}
      />
      <p className={styles['container__error-message']}>
        {errors[name] && errors[name].type === 'required' && t('authForm.errors.empty')}
      </p>
      <p className={styles['container__error-message']}>
        {errors[name] &&
          errors[name].type === 'maxLength' &&
          `${t('authForm.errors.long')} ${max || 12}`}
      </p>
      <p className={styles['container__error-message']}>
        {errors[name] &&
          errors[name].type === 'minLength' &&
          `${t('authForm.errors.short')} ${min || 4}`}
      </p>
    </label>
  );
};
