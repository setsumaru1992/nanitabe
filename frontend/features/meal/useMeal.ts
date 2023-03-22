import { useAddMeal } from './createMealMutation';

export default () => {
  const { addMealWithNewDishAndNewSource, addMealloading, addMealerror } =
    useAddMeal();

  return {
    addMealWithNewDishAndNewSource,
    addMealloading,
    addMealerror,
  };
};
