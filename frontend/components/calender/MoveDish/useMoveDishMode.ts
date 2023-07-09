import { useState } from 'react';
import * as z from 'zod';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import useMeal from '../../../features/meal/useMeal';
import { updateMealSchema } from '../../../features/meal/schema';
import { weekCalenderPageUrlOf } from '../../../pages/calender/week/[date]';

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
  const router = useRouter();
  const currentPath = usePathname();
  const { updateMeal } = useMeal();
  const [selectedMeal, setSelectedMeal] = useState(null);

  const isMovingDishMode = calenderMode === MOVING_DISH_MODES.MOVING_DISH_MODE;
  const changeCalenderModeToMovingDishMode = () => {
    updateCalenderMode(MOVING_DISH_MODES.MOVING_DISH_MODE);
  };

  const startMovingDishMode = (meal) => {
    setSelectedMeal(meal);
    changeCalenderModeToMovingDishMode();
  };

  const onDateClickForMovingDish = (date: Date) => {
    const { id, mealType, date: mealDateStringBeforeMove } = selectedMeal;
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
          const pathOfMealDateBeforeMove = weekCalenderPageUrlOf(
            new Date(mealDateStringBeforeMove),
          );
          if (pathOfMealDateBeforeMove !== currentPath) {
            router.push(pathOfMealDateBeforeMove);
          }
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
  };
};
