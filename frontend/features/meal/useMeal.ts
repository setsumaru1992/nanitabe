import { useAddMeal } from './addMealMutation';

export type { AddMealWithNewDishAndNewSource } from './addMealMutation';

export default () => {
  const {
    addMealWithNewDishAndNewSource,
    AddMealWithNewDishAndNewSourceSchema,
    addMealWithExistingDishAndExistingSource,
    AddMealWithExistingDishAndExistingSourceSchema,
    addMealLoading,
    addMealError,
  } = useAddMeal();

  return {
    addMealWithNewDishAndNewSource,
    AddMealWithNewDishAndNewSourceSchema,
    addMealWithExistingDishAndExistingSource,
    AddMealWithExistingDishAndExistingSourceSchema,
    addMealLoading,
    addMealError,
  };
};
