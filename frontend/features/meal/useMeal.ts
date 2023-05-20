import { useAddMeal } from './addMealMutation';
import { useFetchMealsForCalender } from './fetchMealQuery';
import { useUpdateMeal } from './updateMealMutation';
import { useRemoveMeal } from './removeMealMutation';

export type {
  AddMealMutationInput,
  AddMealMutationOutput,
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
    addMealWithNewDishAndNewSource,
    AddMealWithNewDishAndNewSourceSchema,
    addMeal,
    AddMealSchema,
    addMealLoading,
    addMealError,
  } = useAddMeal();

  const {
    updateMealWithNewDishAndNewSource,
    UpdateMealWithNewDishAndNewSourceSchema,
    convertFromUpdateMealWithNewDishAndNewSourceInputToGraphqlInput,
    updateMealWithNewDish,
    UpdateMealWithNewDishSchema,
    convertFromUpdateMealWithNewDishInputToGraphqlInput,
    updateMeal,
    convertFromUpdateMealInputToGraphqlInput,
    UpdateMealSchema,
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

    addMealWithNewDishAndNewSource,
    AddMealWithNewDishAndNewSourceSchema,
    addMeal,
    AddMealSchema,
    addMealLoading,
    addMealError,

    updateMealWithNewDishAndNewSource,
    UpdateMealWithNewDishAndNewSourceSchema,
    convertFromUpdateMealWithNewDishAndNewSourceInputToGraphqlInput,
    updateMealWithNewDish,
    UpdateMealWithNewDishSchema,
    convertFromUpdateMealWithNewDishInputToGraphqlInput,
    updateMeal,
    convertFromUpdateMealInputToGraphqlInput,
    UpdateMealSchema,
    updateMealLoading,
    updateMealError,

    removeMeal,
    removeMealLoading,
    removeMealError,
  };
};
