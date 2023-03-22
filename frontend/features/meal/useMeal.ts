import { useAddMeal } from './addMealMutation';

export default () => {
  const { addMealWithNewDishAndNewSource, addMealloading, addMealerror } =
    useAddMeal();

  return {
    addMealWithNewDishAndNewSource,
    addMealloading,
    addMealerror,
  };
};
