import { useAddMeal } from './addMealMutation';
import { useFetchMealsForCalender } from './fetchMealQuery';
import { useUpdateMeal } from './updateMealMutation';
import { useRemoveMeal } from './removeMealMutation';

export type {
  AddMealMutationInput,
  AddMealMutationOutput,
  AddMealFunc,
} from './addMealMutation';
export type {
  UpdateMealWithNewDishAndNewSource,
  UpdateMeal,
  UpdateMealInput,
  UpdateMealOutput,
  UpdateMealFunc,
} from './updateMealMutation';

type UseMealArg = {
  startDateForFetchingMealsForCalender: Date | null;
};

export default (
  arg: UseMealArg = { startDateForFetchingMealsForCalender: null },
) => {
  const { startDateForFetchingMealsForCalender } = arg;

  const {
    addMeal,
    AddMealSchema,
    addMealWithNewDishAndNewSource,
    AddMealWithNewDishAndNewSourceSchema,
    addMealWithNewDish,
    AddMealWithNewDishSchema,
    addMealLoading,
    addMealError,
  } = useAddMeal();

  const {
    updateMeal,
    UpdateMealSchema,
    updateMealWithNewDish,
    UpdateMealWithNewDishSchema,
    updateMealWithNewDishAndNewSource,
    UpdateMealWithNewDishAndNewSourceSchema,
    updateMealLoading,
    updateMealError,
  } = useUpdateMeal();

  const { removeMeal, removeMealLoading, removeMealError } = useRemoveMeal();

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

    addMeal,
    AddMealSchema,
    addMealWithNewDish,
    AddMealWithNewDishSchema,
    addMealWithNewDishAndNewSource,
    AddMealWithNewDishAndNewSourceSchema,
    addMealLoading,
    addMealError,

    updateMeal,
    UpdateMealSchema,
    updateMealWithNewDish,
    UpdateMealWithNewDishSchema,
    updateMealWithNewDishAndNewSource,
    UpdateMealWithNewDishAndNewSourceSchema,
    updateMealLoading,
    updateMealError,

    removeMeal,
    removeMealLoading,
    removeMealError,
  };
};
