import React from 'react';
import classNames from 'classnames';
import style from './AddMealIcon.module.scss';
import useFullScreenModal from '../../../common/modal/useFullScreenModal';
import { AddMeal } from '../../../meal/MealForm';

type Props = {
  dateForAdd: Date;
  onAddSucceeded: () => void;
};

export default (props: Props) => {
  const { dateForAdd, onAddSucceeded } = props;
  const { FullScreenModal, FullScreenModalOpener, closeModal } =
    useFullScreenModal();
  return (
    <>
      <FullScreenModalOpener>
        <div className={classNames(style['icon'], style['add-meal-icon'])}>
          +
        </div>
      </FullScreenModalOpener>
      <FullScreenModal title="食事登録">
        <AddMeal
          defaultDate={dateForAdd}
          onAddSucceeded={() => {
            closeModal();
            onAddSucceeded();
          }}
        />
      </FullScreenModal>
    </>
  );
};
