import { gql } from '@apollo/client';
import * as z from 'zod';
import {
  AddMealWithExistingDishMutation,
  AddMealWithNewDishAndNewSourceMutation,
  useAddMealWithExistingDishMutation,
  useAddMealWithNewDishAndNewSourceMutation,
} from '../../lib/graphql/generated/graphql';
import { buildMutationExecutor } from '../utils/mutationUtils';
import { newMealSchema } from './schema';
import { dishIdSchema, newDishSchema } from '../dish/schema';

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

const AddMealWithNewDishAndNewSourceSchema = z.object({
  dish: newDishSchema,
  meal: newMealSchema,
});
export type AddMealWithNewDishAndNewSource = z.infer<
  typeof AddMealWithNewDishAndNewSourceSchema
>;

export const ADD_MEAL_WITH_EXISTING_DISH = gql`
  mutation addMealWithExistingDish($dishId: Int!, $meal: MealForCreate!) {
    addMealWithExistingDish(input: { dishId: $dishId, meal: $meal }) {
      mealId
    }
  }
`;

const AddMealWithExistingDishSchema = z.object({
  dishId: dishIdSchema,
  meal: newMealSchema,
});
export type AddMealWithExistingDish = z.infer<
  typeof AddMealWithExistingDishSchema
>;

export type AddMealMutationInput =
  | AddMealWithNewDishAndNewSource
  | AddMealWithExistingDish;

export type AddMealMutationOutput =
  | AddMealWithNewDishAndNewSourceMutation
  | AddMealWithExistingDishMutation;

export const useAddMeal = () => {
  const [
    addMealWithNewDishAndNewSource,
    addMealWithNewDishAndNewSourceLoading,
    addMealWithNewDishAndNewSourceError,
  ] = buildMutationExecutor<
    AddMealWithNewDishAndNewSource,
    AddMealWithNewDishAndNewSourceMutation
  >(useAddMealWithNewDishAndNewSourceMutation);

  const [
    addMealWithExistingDish,
    addMealWithExistingDishLoading,
    addMealWithExistingDishError,
  ] = buildMutationExecutor<
    AddMealWithExistingDish,
    AddMealWithExistingDishMutation
  >(useAddMealWithExistingDishMutation);

  return {
    addMealWithNewDishAndNewSource,
    addMealWithExistingDish,

    addMealLoading:
      addMealWithNewDishAndNewSourceLoading || addMealWithExistingDishLoading,
    addMealError:
      addMealWithNewDishAndNewSourceError || addMealWithExistingDishError,

    AddMealWithNewDishAndNewSourceSchema,
    AddMealWithExistingDishSchema,
  };
};
