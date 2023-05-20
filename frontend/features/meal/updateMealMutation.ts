import { gql } from '@apollo/client';
import * as z from 'zod';
import {
  buildMutationExecutor,
  MutationCallbacks,
} from '../utils/mutationUtils';
import {
  UpdateMealMutation,
  UpdateMealWithNewDishAndNewSourceMutation,
  UpdateMealWithNewDishMutation,
  useUpdateMealMutation,
  useUpdateMealWithNewDishAndNewSourceMutation,
  useUpdateMealWithNewDishMutation,
} from '../../lib/graphql/generated/graphql';
import { dishIdSchema, newDishSchema } from '../dish/schema';
import { updateMealSchema } from './schema';

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

const convertFromUpdateMealInputToGraphqlInput = (
  input: UpdateMeal,
): UpdateMeal => {
  return input;
};

export const UPDATE_MEAL_WITH_NEW_DISH = gql`
  mutation updateMealWithNewDish(
    $dish: DishForCreate!
    $dishSource: SourceForRead!
    $dishSourceRelationDetail: DishSourceRelationDetail
    $meal: MealForUpdate!
  ) {
    updateMealWithNewDish(
      input: {
        dish: $dish
        dishSource: $dishSource
        dishSourceRelationDetail: $dishSourceRelationDetail
        meal: $meal
      }
    ) {
      mealId
      dishId
    }
  }
`;

const UpdateMealWithNewDishSchema = z.object({
  dish: newDishSchema,
  meal: updateMealSchema,
});
export type UpdateMealWithNewDish = z.infer<typeof UpdateMealWithNewDishSchema>;

const convertFromUpdateMealWithNewDishInputToGraphqlInput = (
  input: UpdateMealWithNewDish,
): UpdateMealWithNewDish => {
  return input;
};

export const UPDATE_MEAL_WITH_NEW_DISH_AND_NEW_SOURCE = gql`
  mutation updateMealWithNewDishAndNewSource(
    $dish: DishForCreate!
    $dishSource: SourceForCreate!
    $dishSourceRelationDetail: DishSourceRelationDetail
    $meal: MealForUpdate!
  ) {
    updateMealWithNewDishAndNewSource(
      input: {
        dish: $dish
        dishSource: $dishSource
        dishSourceRelationDetail: $dishSourceRelationDetail
        meal: $meal
      }
    ) {
      mealId
      dishId
      dishSourceId
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

const convertFromUpdateMealWithNewDishAndNewSourceInputToGraphqlInput = (
  input: UpdateMealWithNewDishAndNewSource,
): UpdateMealWithNewDishAndNewSource => {
  return input;
};

export type UpdateMealInput =
  | UpdateMeal
  | UpdateMealWithNewDish
  | UpdateMealWithNewDishAndNewSource;
export type UpdateMealOutput =
  | UpdateMealMutation
  | UpdateMealWithNewDishMutation
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

  const [
    updateMealWithNewDish,
    updateMealWithNewDishLoading,
    updateMealWithNewDishError,
  ] = buildMutationExecutor<UpdateMealWithNewDish>(
    useUpdateMealWithNewDishMutation,
  );

  const [updateMeal, updateMealLoading, updateMealError] =
    buildMutationExecutor<UpdateMeal>(useUpdateMealMutation);

  return {
    updateMeal,
    UpdateMealSchema,
    convertFromUpdateMealInputToGraphqlInput,

    updateMealWithNewDish,
    UpdateMealWithNewDishSchema,
    convertFromUpdateMealWithNewDishInputToGraphqlInput,

    updateMealWithNewDishAndNewSource,
    UpdateMealWithNewDishAndNewSourceSchema,
    convertFromUpdateMealWithNewDishAndNewSourceInputToGraphqlInput,

    updateMealLoading:
      updateMealWithNewDishAndNewSourceLoading ||
      updateMealWithNewDishLoading ||
      updateMealLoading,
    updateMealError:
      updateMealWithNewDishAndNewSourceError ||
      updateMealWithNewDishError ||
      updateMealError,
  };
};
