import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ISubmitData } from '../../../../../components/Form/Form';
import { FormInput } from '../../../../../components/FormInput/FormInput';
import { Modal } from '../../../../../components/Modal/Modal';
import { useCustomDispatch, useCustomSelector } from '../../../../../customHooks/customHooks';
import { setBoardId } from '../../../../../store/boardPageSlice';
import { fetchApi } from '../../../../../store/fetchApi';
import { BoardType } from '../../../../../store/fetchApiTypes';
import { setIsModalHide } from '../../../../../store/mainPageSlice';
import { TextArea } from '../../../../BoardPage/Main/Column/Body/Task/TextArea/TextArea';
import styles from './BoardItem.module.scss';

export const BoardItem: React.FC<BoardType> = ({ id, title, description }) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteBoard, {}] = fetchApi.useDeleteBoardByIdMutation();
  const [editBoard, {}] = fetchApi.useUpdateBoardByIdMutation();
  const { refetch } = fetchApi.useGetAllBoardsQuery('');
  const { t } = useTranslation();
  const dispatch = useCustomDispatch();
  const navigation = useNavigate();
  const selector = useCustomSelector((state) => state.mainPageSlice);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    reValidateMode: 'onBlur',
  });

  const openBoardPage = () => {
    dispatch(setBoardId(id));
    navigation('/board');
  };

  const deleteBoardFromPage = async () => {
    setLoading(true);
    try {
      const response = await deleteBoard(id);
    } catch {
    } finally {
      setLoading(false);
      refetch();
    }
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const editBoardFn = async (data: ISubmitData) => {
    setEditModalOpen(false);
    const obj = {
      id: id,
      body: {
        title: data.title,
        description: data.description,
      },
    };
    await editBoard(obj);
    refetch();
  };

  return (
    <>
      <div className={styles.container} onClick={openBoardPage}>
        <h2 className={styles.container__board_name}>{title}</h2>
        <p className={styles.container__board_description}>{description}</p>
        {isLoading ? (
          <p className={styles.container__loader}>лоадер))</p>
        ) : (
          <>
            <div
              className={styles.container__edit_button}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                openEditModal();
              }}
            ></div>
            <div
              className={styles.container__delete_button}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                openDeleteModal();
              }}
            ></div>
          </>
        )}
      </div>
      <Modal
        title={t('modals.titles.deleteBoard')}
        submitText={t('modals.buttons.deleteBoard')}
        onSubmit={deleteBoardFromPage}
        closeModal={closeDeleteModal}
        isOpen={isDeleteModalOpen}
      >
        <h2>{t('modals.questions.deleteBoard')}</h2>
      </Modal>
      <Modal
        title={t('modals.titles.editBoard')}
        submitText={t('modals.buttons.editTask')}
        onSubmit={handleSubmit(editBoardFn)}
        closeModal={closeEditModal}
        isOpen={isEditModalOpen}
      >
        <form>
          <FormInput
            text={t('authForm.inputs.title')}
            type="text"
            name="title"
            register={register}
            errors={errors}
            defaultValue={[title]}
          ></FormInput>
          <TextArea
            text={t('authForm.inputs.description')}
            type="text"
            name="description"
            register={register}
            errors={errors}
            defaultValue={[description]}
          />
        </form>
      </Modal>
    </>
  );
};
