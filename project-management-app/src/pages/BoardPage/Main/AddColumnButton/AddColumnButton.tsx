import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ISubmitData } from '../../../../components/Form/Form';
import { FormInput } from '../../../../components/FormInput/FormInput';
import { Modal } from '../../../../components/Modal/Modal';
import { useCustomDispatch, useCustomSelector } from '../../../../customHooks/customHooks';
import { fetchApi } from '../../../../store/fetchApi';
import styles from './AddColumnButton.module.scss';

interface INewBoardBody {
  body: {
    title: string;
  };
  boardId: string;
}

export const AddColumnButton: React.FC = () => {
  const { t } = useTranslation();
  const [addColumn, {}] = fetchApi.useCreateNewColumnMutation();
  const [isOpen, setOpen] = useState<boolean>(false);
  const dispatch = useCustomDispatch();
  const selector = useCustomSelector((state) => state.boardPageSlice);
  const { refetch } = fetchApi.useGetBoardByIdQuery(selector.id);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    reValidateMode: 'onBlur',
  });

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const createColumnBody = (data: ISubmitData) => {
    const newColumn = {
      body: {
        title: data.title,
      },
      boardId: selector.id,
    };
    createColumn(newColumn);
  };

  const createColumn = async (newColumn: INewBoardBody) => {
    try {
      const response = await addColumn(newColumn);
    } catch {
    } finally {
      closeModal();
      reset();
      refetch();
    }
  };

  return (
    <>
      <div className={styles.container} onClick={openModal}>
        <h2 className={styles.container__board_name}>{t('boardPage.column.title')}</h2>
        <button className={styles.container__add_button} />
      </div>
      <Modal
        title={t('modals.titles.createColumn')}
        submitText={t('modals.buttons.createColumn')}
        isOpen={isOpen}
        closeModal={closeModal}
        onSubmit={handleSubmit(createColumnBody)}
      >
        <form>
          <FormInput
            text={t('authForm.inputs.title')}
            type="text"
            name="title"
            register={register}
            errors={errors}
          ></FormInput>
        </form>
      </Modal>
    </>
  );
};
