import * as React from 'react';

const useModalVisiblity = (initialVisibility = false) => {
  const [modalVisible, setModalVisible] = React.useState(initialVisibility);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const toggleModal = () => {
    setModalVisible((prevState) => !prevState);
  };

  const openModalOnClick = (e) => {
    e.preventDefault();
    openModal();
  };

  const closeModalOnClick = (e) => {
    e.preventDefault();
    closeModal();
  };

  const toggleModalOnClick = (e) => {
    e.preventDefault();
    toggleModal();
  };

  return {
    modalVisible,
    openModal,
    closeModal,
    openModalOnClick,
    closeModalOnClick,
    toggleModalOnClick,
    toggleModal,
  };
};

const useModalRef = <
  ModalRefElement extends HTMLElement,
  ModalOpenerRef extends HTMLElement,
>(
  closeModal: () => void,
) => {
  const modalRef = React.useRef<ModalRefElement>(null);
  const modalOpenerRef = React.useRef<ModalOpenerRef>(null);

  React.useEffect(() => {
    const clickedInSpecifiedNode = (ref, mouseDownEvent) => {
      return !ref.current || ref.current.contains(mouseDownEvent.target);
    };
    const listener = (e) => {
      if (
        clickedInSpecifiedNode(modalRef, e) ||
        clickedInSpecifiedNode(modalOpenerRef, e)
      ) {
        return;
      }
      closeModal();
    };
    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [modalRef]);

  return {
    modalRef,
    modalOpenerRef,
  };
};

export default (initialVisibility = false) => {
  const {
    modalVisible,
    openModal,
    closeModal,
    openModalOnClick,
    closeModalOnClick,
    toggleModalOnClick,
    toggleModal,
  } = useModalVisiblity(initialVisibility);

  return {
    modalVisible,
    useModalRef,
    openModal,
    closeModal,
    openModalOnClick,
    closeModalOnClick,
    toggleModalOnClick,
    toggleModal,
  };
};
