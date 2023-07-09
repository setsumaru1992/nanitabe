import React from 'react';
import classnames from 'classnames';
import style from './index.module.scss';
import { MealForCalender } from '../../../../lib/graphql/generated/graphql';
import { MEAL_TYPE } from '../../../../features/meal/const';
import useFloatModal from '../../../common/modal/useFloatModal';
import Menu from './Menu';
import { MEAL_POSITION } from '../../../../features/dish/const';
import { DISH_SOURCE_TYPE } from '../../../../features/dish/source/const';

type Props = {
  meal: MealForCalender;
  onChanged?: () => void;
  canAnythingExeptDisplayDishName: boolean;
  calenderModeChangers: any;
};
export default (props: Props) => {
  const {
    meal,
    onChanged,
    canAnythingExeptDisplayDishName,
    calenderModeChangers,
  } = props;
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

  const mealPositionMark = (() => {
    const iconCssClass = (() => {
      if (dish?.dishSourceRelation?.type === DISH_SOURCE_TYPE.RESTAURANT) {
        return 'fa-solid fa-store';
      }

      switch (dish.mealPosition) {
        case MEAL_POSITION.STAPLE_FOOD:
          return 'fa-solid fa-bowl-rice';
        case MEAL_POSITION.MAIN_DISH:
          return 'fa-solid fa-utensils';
        case MEAL_POSITION.SIDE_DISH:
          return 'fa-solid fa-carrot';
        case MEAL_POSITION.SOUP:
          return 'fa-solid fa-mug-saucer';
        case MEAL_POSITION.DESSERT:
          return 'fa-solid fa-cookie-bite';
        default:
          return null;
      }
    })();
    if (!iconCssClass) return null;
    return <i className={iconCssClass} />;
  })();

  return (
    <div className={classnames(style['icon'], style[iconCssClassOfMealType])}>
      {mealPositionMark && <>{mealPositionMark} &nbsp;</>}
      {dish.name} &nbsp;
      {canAnythingExeptDisplayDishName && (
        <FloatModalOpener>
          <i
            className={classnames(
              'fa-solid',
              'fa-ellipsis-vertical',
              style['meal-icon__menu-button'],
            )}
            data-testid={`mealMenuOpener-${meal.id}`}
          />
        </FloatModalOpener>
      )}
      <FloatModal>
        <Menu
          meal={meal}
          closeSelf={closeModal}
          onChanged={onChanged}
          calenderModeChangers={calenderModeChangers}
        />
      </FloatModal>
    </div>
  );
};
