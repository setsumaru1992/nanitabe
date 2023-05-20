import { gql } from '@apollo/client';
import * as z from 'zod';
import {
  AddMealMutation,
  AddMealWithNewDishAndNewSourceMutation,
  useAddMealMutation,
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

export const ADD_MEAL = gql`
  mutation addMeal($dishId: Int!, $meal: MealForCreate!) {
    addMeal(input: { dishId: $dishId, meal: $meal }) {
      mealId
    }
  }
`;

const AddMealSchema = z.object({
  dishId: dishIdSchema,
  meal: newMealSchema,
});
export type AddMeal = z.infer<typeof AddMealSchema>;

export type AddMealMutationInput = AddMealWithNewDishAndNewSource | AddMeal;

export type AddMealMutationOutput =
  | AddMealWithNewDishAndNewSourceMutation
  | AddMealMutation;

export const useAddMeal = () => {
  const [
    addMealWithNewDishAndNewSource,
    addMealWithNewDishAndNewSourceLoading,
    addMealWithNewDishAndNewSourceError,
  ] = buildMutationExecutor<
    AddMealWithNewDishAndNewSource,
    AddMealWithNewDishAndNewSourceMutation
  >(useAddMealWithNewDishAndNewSourceMutation);

  const [addMeal, addMealLoading, addMealError] = buildMutationExecutor<
    AddMeal,
    AddMealMutation
  >(useAddMealMutation);

  return {
    addMealWithNewDishAndNewSource,
    addMeal,

    addMealLoading: addMealWithNewDishAndNewSourceLoading || addMealLoading,
    addMealError: addMealWithNewDishAndNewSourceError || addMealError,

    AddMealWithNewDishAndNewSourceSchema,
    AddMealSchema,
  };
};
