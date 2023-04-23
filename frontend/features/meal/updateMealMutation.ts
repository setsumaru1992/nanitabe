import { gql } from '@apollo/client';
import * as z from 'zod';
import { buildMutationExecutor } from '../utils/mutationUtils';
import {
  useAddMealWithExistingDishMutation,
  useUpdateMealWithExistingDishMutation,
  useUpdateMealWithNewDishAndNewSourceMutation,
} from '../../lib/graphql/generated/graphql';
import { AddMealWithExistingDish } from './addMealMutation';

export const UPDATE_MEAL_WITH_NEW_DISH_AND_NEW_SOURCE = gql`
  mutation updateMealWithNewDishAndNewSource(
    $dish: DishForCreate!
    $meal: MealForUpdate!
  ) {
    updateMealWithNewDishAndNewSource(input: { dish: $dish, meal: $meal }) {
      mealId
    }
  }
`;

export type UpdateMealWithNewDishAndNewSource = any;

export const UPDATE_MEAL_WITH_EXISTING_DISH = gql`
  mutation updateMealWithExistingDish($dishId: Int!, $meal: MealForUpdate!) {
    updateMealWithExistingDish(input: { dishId: $dishId, meal: $meal }) {
      mealId
    }
  }
`;

export type UpdateMealWithExistingDish = any;

export const useUpdateMeal = () => {
  const [
    updateMealWithNewDishAndNewSource,
    updateMealWithNewDishAndNewSourceLoading,
    updateMealWithNewDishAndNewSourceError,
  ] = buildMutationExecutor<UpdateMealWithNewDishAndNewSource>(
    useUpdateMealWithNewDishAndNewSourceMutation,
  );

  const [
    updateMealWithExistingDish,
    updateMealWithExistingDishLoading,
    updateMealWithExistingDishError,
  ] = buildMutationExecutor<UpdateMealWithExistingDish>(
    useUpdateMealWithExistingDishMutation,
  );

  return {
    updateMealWithNewDishAndNewSource,
    updateMealWithExistingDish,

    updateMealLoading:
      updateMealWithNewDishAndNewSourceLoading ||
      updateMealWithExistingDishLoading,
    updateMealError:
      updateMealWithNewDishAndNewSourceError || updateMealWithExistingDishError,

    // UpdateMealWithNewDishAndNewSourceSchema,
    // UpdateMealWithExistingDishSchema,
  };
};
