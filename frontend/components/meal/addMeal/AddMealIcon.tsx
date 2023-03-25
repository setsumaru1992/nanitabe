import React, { useState } from 'react';
import classNames from 'classnames';
import style from './AddMealIcon.module.scss';
import Modal from '../../common/modal/Modal';
import AddMeal from './AddMeal';

type Props = {
  dateForAdd: Date;
  onAddSucceeded: () => void;
};

export default (props: Props) => {
  const { dateForAdd, onAddSucceeded } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <>
      <div
        className={classNames(style['icon'], style['add-meal-icon'])}
        onClick={() => {
          openModal();
        }}
      >
        +
      </div>
      {modalVisible && (
        <Modal closeModal={closeModal}>
          <AddMeal
            defaultDate={dateForAdd}
            onAddSucceeded={() => {
              closeModal();
              onAddSucceeded();
            }}
          />
        </Modal>
      )}
    </>
  );
};
