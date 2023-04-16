import React from 'react';

type Props = {
  title?: string;
  children: React.ReactNode;
  closeModal: () => void;
  onClose?: () => void;
};

export default (props: Props) => {
  const { title, children, closeModal: closeModalFunc, onClose } = props;
  const closeModal = () => {
    closeModalFunc();
    if (onClose) onClose();
  };
  return <div />;
};
