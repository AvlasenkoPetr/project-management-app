import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import styles from './ReturnButton.module.scss';

export const ReturnButton: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <button className={styles.container} onClick={() => navigate(-1)}>
      {t('other.returnButton')}
    </button>
  );
};
