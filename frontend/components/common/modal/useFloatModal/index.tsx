import * as React from 'react';
import classNames from 'classnames';
import style from './FloatModal.module.scss';
import useModalTool, { UseModalToolArgs } from '../useModalTool';

type Args = UseModalToolArgs & {};

export default (args: Args = {}) => {
  const { onClose } = args;
  const {
    modalVisible,
    useModalRef,
    openModal,
    closeModal,
    openModalOnClick,
    closeModalOnClick,
    toggleModalOnClick,
    toggleModal,
  } = useModalTool();
  const { modalRef, modalOpenerRef } = useModalRef<
    HTMLDivElement,
    HTMLDivElement
  >(closeModal);

  const FloatModal = ({ children }: { children: React.ReactNode }) => (
    <div ref={modalRef} className={classNames(style['float-modal__wrapper'])}>
      {modalVisible && (
        <div className={classNames(style['float-modal'])}>{children}</div>
      )}
    </div>
  );
  const FloatModalOpener = ({ children }: { children: React.ReactNode }) => (
    <div
      ref={modalOpenerRef}
      onClick={toggleModalOnClick}
      className={classNames(style['float-modal-opener'])}
    >
      {children}
    </div>
  );

  return {
    FloatModal,
    FloatModalOpener,

    openModal,
    openModalOnClick,
    closeModal,
    closeModalOnClick,
    toggleModal,
    toggleModalOnClick,
  };
};
