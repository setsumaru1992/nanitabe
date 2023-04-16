import React from 'react';
import classNames from 'classnames';
import style from './FullScreenModal.module.scss';
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
  } = useModalTool({ onClose });
  const { modalRef, modalOpenerRef } = useModalRef<
    HTMLDivElement,
    HTMLDivElement
  >(closeModal);

  const FullScreenModal = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <>
      {modalVisible && (
        <div className={classNames(style['modal__background'])}>
          <div className={classNames(style['modal__wrap'])} ref={modalRef}>
            <div className={classNames(style['modal__header'])}>
              <p className={classNames(style['modal__title'])}>{title}</p>
              <a
                className={classNames(style['modal__icon'])}
                onClick={closeModalOnClick}
              >
                <i className="fa fa-times" />
              </a>
            </div>
            <div className={classNames(style['modal__contents'])}>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
  const FullScreenModalOpener = ({
    children,
  }: {
    children: React.ReactNode;
  }) => (
    <div
      ref={modalOpenerRef}
      onClick={toggleModalOnClick}
      className={classNames(style['float-modal-opener'])}
    >
      {children}
    </div>
  );

  return {
    FullScreenModal,
    FullScreenModalOpener,

    openModal,
    openModalOnClick,
    closeModal,
    closeModalOnClick,
    toggleModal,
    toggleModalOnClick,
  };
};
