import { gql } from '@apollo/client';
import * as z from 'zod';
import { useAddMealWithNewDishAndNewSourceMutation } from '../../lib/graphql/generated/graphql';

export const ADD_MEAL_WITH_NEW_DISH_AND_NEW_SOURCE = gql`
  mutation addMealWithNewDishAndNewSource(
    $dish: DishForCreate!
    $meal: MealForCreate!
  ) {
    addMealWithNewDishAndNewSource(input: { dish: $dish, meal: $meal }) {
      mealId
    }
  }
`;

const useAddMealWithNewDishAndNewSource = () => {
  const [
    addMealWithNewDishAndNewSourceMutation,
    {
      loading: addMealWithNewDishAndNewSourceLoading,
      error: addMealWithNewDishAndNewSourceError,
    },
  ] = useAddMealWithNewDishAndNewSourceMutation();
  const addMealWithNewDishAndNewSource = async (
    input,
    { onComplated, onError },
  ) => {
    return addMealWithNewDishAndNewSourceMutation({
      variables: input,
      onCompleted: (data) => {
        onComplated();
      },
      onError: (error) => {
        onError();
      },
    });
  };

  return {
    addMealWithNewDishAndNewSource,
    addMealWithNewDishAndNewSourceLoading,
    addMealWithNewDishAndNewSourceError,
  };
};

export const useAddMeal = () => {
  const {
    addMealWithNewDishAndNewSource,
    addMealWithNewDishAndNewSourceLoading,
    addMealWithNewDishAndNewSourceError,
  } = useAddMealWithNewDishAndNewSource();
  return {
    addMealWithNewDishAndNewSource,
    addMealloading: addMealWithNewDishAndNewSourceLoading,
    addMealerror: addMealWithNewDishAndNewSourceError,
  };
};
