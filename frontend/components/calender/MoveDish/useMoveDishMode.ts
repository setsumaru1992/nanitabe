import { useState } from 'react';
import * as z from 'zod';
import useMeal from '../../../features/meal/useMeal';
import { updateMealSchema } from '../../../features/meal/schema';
import { useBackToWeekOfModeStarted } from '../week/useCalenderMode';

export const MOVING_DISH_MODES = {
  MOVING_DISH_MODE: 'MOVING_DISH_MODE',
};
export type MovingDishMode =
  (typeof MOVING_DISH_MODES)[keyof typeof MOVING_DISH_MODES];

export default (args: {
  calenderMode: any;
  updateCalenderMode: any;
  changeCalenderModeToDisplayCalenderMode: any;
  onDataChanged?: any;
}) => {
  const {
    calenderMode,
    updateCalenderMode,
    changeCalenderModeToDisplayCalenderMode,
    onDataChanged,
  } = args;
  const { updateMeal } = useMeal();
  const [selectedMeal, setSelectedMeal] = useState(null);
  const { backToWeekOfModeStarted } = useBackToWeekOfModeStarted();

  const isMovingDishMode = calenderMode === MOVING_DISH_MODES.MOVING_DISH_MODE;
  const changeCalenderModeToMovingDishMode = () => {
    updateCalenderMode(MOVING_DISH_MODES.MOVING_DISH_MODE);
  };

  const startMovingDishMode = (meal) => {
    setSelectedMeal(meal);
    changeCalenderModeToMovingDishMode();
  };

  const backToWeekOfBeforeMoveMeal = () =>
    backToWeekOfModeStarted(new Date(selectedMeal.date));

  const onDateClickForMovingDish = (date: Date) => {
    const { id, mealType } = selectedMeal;
    // HACK: dishIdとかいらない情報渡しているように、オーバースペックだから、専用Mutation作る
    updateMeal(
      {
        dishId: selectedMeal.dish.id as number,
        meal: {
          id,
          mealType,
          date,
        } as z.infer<typeof updateMealSchema>,
      },
      {
        onCompleted: () => {
          if (onDataChanged) onDataChanged();
          backToWeekOfBeforeMoveMeal();
          changeCalenderModeToDisplayCalenderMode();
        },
      },
    );
  };

  return {
    selectedMeal,
    isMovingDishMode,
    startMovingDishMode,
    onDateClickForMovingDish,
    changeCalenderModeToDisplayCalenderMode,
    backToWeekOfBeforeMoveMeal,
  };
};
