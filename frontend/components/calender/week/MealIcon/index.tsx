import React from 'react';
import classNames from 'classnames';
import style from './index.module.scss';
import { MealForCalender } from '../../../../lib/graphql/generated/graphql';
import { MEAL_TYPE } from '../../../../features/meal/const';
import useFloatModal from '../../../common/modal/useFloatModal';
import Menu from './Menu';

type Props = {
  meal: MealForCalender;
  onChanged?: () => void;
  canAnythingExeptDisplayDishName: boolean;
};
export default (props: Props) => {
  const { meal, onChanged, canAnythingExeptDisplayDishName } = props;
  const { dish } = meal;
  const { FloatModal, FloatModalOpener, closeModal } = useFloatModal();

  const iconCssClassOfMealType = (() => {
    const suffix = (() => {
      switch (meal.mealType) {
        case MEAL_TYPE.BREAKFAST:
          return 'breakfast';
        case MEAL_TYPE.LUNCH:
          return 'lunch';
        case MEAL_TYPE.DINNER:
          return 'dinner';
        default:
          return '';
      }
    })();
    return `meal-icon--${suffix}`;
  })();
  return (
    <div className={classNames(style['icon'], style[iconCssClassOfMealType])}>
      {dish.name} &nbsp;
      {canAnythingExeptDisplayDishName && (
        <FloatModalOpener>
          <i
            className={classNames(
              'fa-solid',
              'fa-ellipsis-vertical',
              style['meal-icon__menu-button'],
            )}
          />
        </FloatModalOpener>
      )}
      <FloatModal>
        <Menu meal={meal} closeSelf={closeModal} onChanged={onChanged} />
      </FloatModal>
    </div>
  );
};
