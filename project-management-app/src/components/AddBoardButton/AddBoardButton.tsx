import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ISubmitData } from '../Form/Form';
import { FormInput } from '../FormInput/FormInput';
import { Modal } from '../Modal/Modal';
import { fetchApi } from '../../store/fetchApi';

export interface INewBoardBody {
  title: string;
  description: string;
}

export const AddBoardButton: React.FC = ({ children }) => {
  const { t } = useTranslation();
  const [addBoard, {}] = fetchApi.useCreateNewBoardMutation();
  const { refetch } = fetchApi.useGetAllBoardsQuery('');
  const [isOpen, setOpen] = useState<boolean>(false);
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

  const createBoardBody = (data: ISubmitData) => {
    const newBoard = {
      title: data.title,
      description: data.description,
    };
    createBoard(newBoard);
  };

  const createBoard = async (newBoard: INewBoardBody) => {
    try {
      await addBoard(newBoard);
    } catch {
    } finally {
      closeModal();
      reset();
      refetch();
    }
  };

  return (
    <>
      <div onClick={openModal}>{children}</div>
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
            max={12}
          ></FormInput>
          <FormInput
            text={t('authForm.inputs.description')}
            type="text"
            name="description"
            register={register}
            errors={errors}
            max={40}
          ></FormInput>
        </form>
      </Modal>
    </>
  );
};
