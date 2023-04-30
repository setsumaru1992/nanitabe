import React from 'react';
import classnames from 'classnames';
import style from './Menu.module.scss';
import useFullScreenModal from '../../common/modal/useFullScreenModal';
import { MealForCalender } from '../../../lib/graphql/generated/graphql';
import EditMeal from '../EditMeal';

type Props = {
  meal: MealForCalender;
  closeSelf: () => void;
  onChanged?: () => void;
};

export default (props: Props) => {
  const { meal, onChanged, closeSelf } = props;
  const { FullScreenModal, FullScreenModalOpener, closeModal } =
    useFullScreenModal({
      onClose: () => {
        closeSelf();
      },
    });
  return (
    <ul className={classnames(style['menu'])}>
      <li className={classnames(style['menu__row'])}>
        <FullScreenModalOpener>
          <a className={classnames(style['menu__content'])}>修正</a>
        </FullScreenModalOpener>
        <FullScreenModal title="食事修正">
          <EditMeal
            meal={meal}
            onEditSucceeded={() => {
              closeModal();
              if (onChanged) onChanged();
            }}
          />
        </FullScreenModal>
      </li>
      <li className={classnames(style['menu__row'])}>
        <a className={classnames(style['menu__content'])}>削除</a>
      </li>
    </ul>
  );
};
