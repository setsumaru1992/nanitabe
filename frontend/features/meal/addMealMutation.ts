import { gql } from '@apollo/client';
import * as z from 'zod';
import { useAddMealWithNewDishAndNewSourceMutation } from '../../lib/graphql/generated/graphql';
import { MEAL_TYPE } from './const';
import { MEAL_POSITION } from '../dish/const';
import { buildMutationExecutor } from '../utils/mutationUtils';

// TODO: dish,mealなど横断的にスキーマを参照するようになったら、各モジュールでスキーマを定義して参照する形へ
const newMealSchema = z.object({
  date: z.date({
    required_error: '必須項目です。',
  }),
  mealType: z.nativeEnum(MEAL_TYPE, {
    required_error: '必須項目です。',
  }),
  comment: z.string().optional(),
});

const newDishSchema = z.object({
  name: z.string().min(1, { message: '必須項目です。' }),
  mealPosition: z.nativeEnum(MEAL_POSITION, {
    required_error: '必須項目です。',
  }),
  comment: z.string().optional(),
});

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

export const useAddMeal = () => {
  const [
    addMealWithNewDishAndNewSource,
    addMealWithNewDishAndNewSourceLoading,
    addMealWithNewDishAndNewSourceError,
  ] = buildMutationExecutor<AddMealWithNewDishAndNewSource>(
    useAddMealWithNewDishAndNewSourceMutation,
  );
  return {
    addMealWithNewDishAndNewSource,
    addMealloading: addMealWithNewDishAndNewSourceLoading,
    addMealerror: addMealWithNewDishAndNewSourceError,
    AddMealWithNewDishAndNewSourceSchema,
  };
};
