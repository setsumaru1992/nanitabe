import { gql } from '@apollo/client';
import * as z from 'zod';
import {
  buildMutationExecutor,
  MutationCallbacks,
} from '../utils/mutationUtils';
import {
  UpdateMealMutation,
  UpdateMealWithNewDishAndNewSourceMutation,
  useUpdateMealMutation,
  useUpdateMealWithNewDishAndNewSourceMutation,
} from '../../lib/graphql/generated/graphql';
import { dishIdSchema, newDishSchema } from '../dish/schema';
import { updateMealSchema } from './schema';

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

const UpdateMealWithNewDishAndNewSourceSchema = z.object({
  dish: newDishSchema,
  meal: updateMealSchema,
});
export type UpdateMealWithNewDishAndNewSource = z.infer<
  typeof UpdateMealWithNewDishAndNewSourceSchema
>;

export const UPDATE_MEAL = gql`
  mutation updateMeal($dishId: Int!, $meal: MealForUpdate!) {
    updateMeal(input: { dishId: $dishId, meal: $meal }) {
      mealId
    }
  }
`;

const UpdateMealSchema = z.object({
  dishId: dishIdSchema,
  meal: updateMealSchema,
});
export type UpdateMeal = z.infer<typeof UpdateMealSchema>;

export type UpdateMealInput = UpdateMeal | UpdateMealWithNewDishAndNewSource;
export type UpdateMealOutput =
  | UpdateMealMutation
  | UpdateMealWithNewDishAndNewSourceMutation;
export type UpdateMealFunc = (
  input: UpdateMealInput,
  mutationCallbacks: MutationCallbacks<UpdateMealOutput>,
) => void;

export const useUpdateMeal = () => {
  const [
    updateMealWithNewDishAndNewSource,
    updateMealWithNewDishAndNewSourceLoading,
    updateMealWithNewDishAndNewSourceError,
  ] = buildMutationExecutor<UpdateMealWithNewDishAndNewSource>(
    useUpdateMealWithNewDishAndNewSourceMutation,
  );

  const [updateMeal, updateMealLoading, updateMealError] =
    buildMutationExecutor<UpdateMeal>(useUpdateMealMutation);

  return {
    updateMealWithNewDishAndNewSource,
    updateMeal,

    updateMealLoading:
      updateMealWithNewDishAndNewSourceLoading || updateMealLoading,
    updateMealError: updateMealWithNewDishAndNewSourceError || updateMealError,

    UpdateMealWithNewDishAndNewSourceSchema,
    UpdateMealSchema,
  };
};
