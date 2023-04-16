import { useAddMeal } from './addMealMutation';
import { useFetchMealsForCalender } from './fetchMealQuery';

export type { AddMealWithNewDishAndNewSource } from './addMealMutation';
export type { AddMealWithExistingDish } from './addMealMutation';

type UseMealArg = {
  startDateForFetchingMealsForCalender: Date | null;
};

export default (
  arg: UseMealArg = { startDateForFetchingMealsForCalender: null },
) => {
  const { startDateForFetchingMealsForCalender } = arg;

  const {
    addMealWithNewDishAndNewSource,
    AddMealWithNewDishAndNewSourceSchema,
    addMealWithExistingDish,
    AddMealWithExistingDishSchema,
    addMealLoading,
    addMealError,
  } = useAddMeal();

  const {
    mealsForCalender,
    fetchMealsForCalenderLoading,
    fetchMealsForCalenderError,
    refetchMealsForCalender,
  } = useFetchMealsForCalender(
    startDateForFetchingMealsForCalender,
    startDateForFetchingMealsForCalender !== null,
  );

  return {
    mealsForCalender,
    fetchMealsForCalenderLoading,
    fetchMealsForCalenderError,
    refetchMealsForCalender,

    addMealWithNewDishAndNewSource,
    AddMealWithNewDishAndNewSourceSchema,
    addMealWithExistingDish,
    AddMealWithExistingDishSchema,
    addMealLoading,
    addMealError,
  };
};
