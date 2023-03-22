import { useAddMeal } from './addMealMutation';

export type { AddMealWithNewDishAndNewSource } from './addMealMutation';

export default () => {
  const {
    addMealWithNewDishAndNewSource,
    addMealloading,
    addMealerror,
    AddMealWithNewDishAndNewSourceSchema,
  } = useAddMeal();

  return {
    addMealWithNewDishAndNewSource,
    addMealloading,
    addMealerror,
    AddMealWithNewDishAndNewSourceSchema,
  };
};
