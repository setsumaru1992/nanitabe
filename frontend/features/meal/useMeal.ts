import { useAddMeal } from './addMealMutation';
import { useFetchMealsForCalender } from './fetchMealQuery';
import { useUpdateMeal } from './updateMealMutation';

export type { AddMealWithNewDishAndNewSource } from './addMealMutation';
export type { AddMealWithExistingDish } from './addMealMutation';
export type { UpdateMealWithNewDishAndNewSource } from './updateMealMutation';
export type { UpdateMealWithExistingDish } from './updateMealMutation';

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
    updateMealWithNewDishAndNewSource,
    UpdateMealWithNewDishAndNewSourceSchema,
    updateMealWithExistingDish,
    UpdateMealWithExistingDishSchema,
    updateMealLoading,
    updateMealError,
  } = useUpdateMeal();

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

    updateMealWithNewDishAndNewSource,
    UpdateMealWithNewDishAndNewSourceSchema,
    updateMealWithExistingDish,
    UpdateMealWithExistingDishSchema,
    updateMealLoading,
    updateMealError,
  };
};
