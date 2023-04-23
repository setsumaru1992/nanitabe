import { gql } from '@apollo/client';
import * as z from 'zod';
import { buildMutationExecutor } from '../utils/mutationUtils';
import {
  useUpdateMealWithExistingDishMutation,
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

export const UPDATE_MEAL_WITH_EXISTING_DISH = gql`
  mutation updateMealWithExistingDish($dishId: Int!, $meal: MealForUpdate!) {
    updateMealWithExistingDish(input: { dishId: $dishId, meal: $meal }) {
      mealId
    }
  }
`;

const UpdateMealWithExistingDishSchema = z.object({
  dishId: dishIdSchema,
  meal: updateMealSchema,
});
export type UpdateMealWithExistingDish = z.infer<
  typeof UpdateMealWithExistingDishSchema
>;

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

    UpdateMealWithNewDishAndNewSourceSchema,
    UpdateMealWithExistingDishSchema,
  };
};
