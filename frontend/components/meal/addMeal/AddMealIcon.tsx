import React, { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import style from './AddMealIcon.module.scss';
import Modal from '../../common/modal/Modal';

export default (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <div
        className={classNames(style['icon'], style['add-meal-icon'])}
        onClick={() => {
          setModalVisible(true);
        }}
      >
        {/* <Link href="/meal/new" className={style['add-meal-icon__content']}> */}
        +{/* </Link> */}
      </div>
      {modalVisible && (
        <Modal
          closeModal={() => {
            setModalVisible(false);
          }}
        >
          aa
        </Modal>
      )}
    </>
  );
};
