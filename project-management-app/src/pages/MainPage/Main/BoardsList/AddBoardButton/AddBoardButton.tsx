import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ISubmitData } from '../../../../../components/Form/Form';
import { FormInput } from '../../../../../components/FormInput/FormInput';
import { Modal } from '../../../../../components/Modal/Modal';
import { useCustomDispatch, useCustomSelector } from '../../../../../customHooks/customHooks';
import { fetchApi } from '../../../../../store/fetchApi';
import { setIsModalHide } from '../../../../../store/mainPageSlice';
import styles from './AddBoardButton.module.scss';

interface INewBoardBody {
  title: string;
  description: string;
}

export const AddBoardButton: React.FC = () => {
  const { t } = useTranslation();
  const [addBoard, {}] = fetchApi.useCreateNewBoardMutation();
  const { refetch } = fetchApi.useGetAllBoardsQuery('');
  const [isOpen, setOpen] = useState<boolean>(false);
  const dispatch = useCustomDispatch();
  const selector = useCustomSelector((state) => state.mainPageSlice);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    reValidateMode: 'onBlur',
  });

  const openModal = () => {
    // dispatch(setIsModalHide(false));
    setOpen(true);
  };

  const closeModal = () => {
    // dispatch(setIsModalHide(true));
    setOpen(false);
  };

  const createBoardBody = (data: ISubmitData) => {
    const newBoard = {
      title: data.title,
      description: data.description,
    };
    createBoard(newBoard);
  };

  const createBoard = async (newBoard: INewBoardBody) => {
    try {
      const response = await addBoard(newBoard);
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
        <h2 className={styles.container__board_name}>{t('mainPage.board.title')}</h2>
        <button className={styles.container__add_button} />
      </div>
      <Modal
        title={t('modals.titles.createBoard')}
        submitText={t('modals.buttons.createBoard')}
        isOpen={isOpen}
        closeModal={closeModal}
        onSubmit={handleSubmit(createBoardBody)}
      >
        <form>
          <FormInput
            text={t('authForm.inputs.title')}
            type="text"
            name="title"
            register={register}
            errors={errors}
          ></FormInput>
          <FormInput
            text={t('authForm.inputs.description')}
            type="text"
            name="description"
            register={register}
            errors={errors}
          ></FormInput>
        </form>
      </Modal>
    </>
  );
};
