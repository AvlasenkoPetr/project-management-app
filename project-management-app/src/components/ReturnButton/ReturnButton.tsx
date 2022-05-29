import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useCustomSelector } from '../../customHooks/customHooks';
import { fetchApi } from '../../store/fetchApi';
import styles from './ReturnButton.module.scss';

export const ReturnButton: React.FC = () => {
  const selector = useCustomSelector((state) => state.boardPageSlice);
  const { refetch } = fetchApi.useGetBoardByIdQuery(selector.id);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <button
      className={styles.container}
      onClick={() => {
        refetch();
        navigate(-1);
      }}
    >
      {t('other.returnButton')}
    </button>
  );
};
