import React from 'react';
import classNames from 'classnames';
import style from './Modal.module.scss';

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
  return (
    <div className={classNames(style['modal__background'])}>
      <div className={classNames(style['modal__wrap'])}>
        <div className={classNames(style['modal__header'])}>
          <p className={classNames(style['modal__title'])}>
            <i className="fa fa-check-circle" />
            {title}
          </p>
          <a
            className={classNames(style['modal__icon'])}
            onClick={(e) => {
              e.preventDefault();
              closeModal();
            }}
          >
            <i className="fa fa-times" />
          </a>
        </div>
        <div className={classNames(style['modal__contents'])}>{children}</div>
      </div>
    </div>
  );
};
