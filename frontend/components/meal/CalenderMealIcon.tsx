import React from 'react';
import classNames from 'classnames';
import style from './CalenderMealIcon.module.scss';
import { MealForCalender } from '../../lib/graphql/generated/graphql';
import { MEAL_TYPE } from '../../features/meal/const';

type Props = {
  meal: MealForCalender;
};
export default (props: Props) => {
  const { meal } = props;
  const { dish } = meal;

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
      <i className="fa-solid fa-ellipsis-vertical" />
    </div>
  );
};
