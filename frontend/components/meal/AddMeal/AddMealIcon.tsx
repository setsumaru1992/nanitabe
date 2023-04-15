import React, { useState } from 'react';
import classNames from 'classnames';
import style from './AddMealIcon.module.scss';
import FullScreenModal from '../../common/modal/FullScreenModal';
import AddMeal from './index';

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
        <FullScreenModal closeModal={closeModal} title="食事登録">
          <AddMeal
            defaultDate={dateForAdd}
            onAddSucceeded={() => {
              closeModal();
              onAddSucceeded();
            }}
            displayInModal
          />
        </FullScreenModal>
      )}
    </>
  );
};
