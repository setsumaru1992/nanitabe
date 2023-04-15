import * as React from 'react';
import useModalTool from './useModalTool';

export default (initialVisibility = false) => {
  const {
    modalVisible,
    useModalRef,
    openModal,
    closeModal,
    openModalOnClick,
    closeModalOnClick,
    toggleModalOnClick,
    toggleModal,
  } = useModalTool(initialVisibility);
  const { modalRef, modalOpenerRef } = useModalRef<
    HTMLDivElement,
    HTMLDivElement
  >(closeModal);

  const FloatModal = ({ children }: { children: React.ReactNode }) => (
    <div ref={modalRef}> {modalVisible && <div>{children}</div>} </div>
  );
  const FloatModalOpener = ({ children }: { children: React.ReactNode }) => (
    <div ref={modalOpenerRef} onClick={toggleModalOnClick}>
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
