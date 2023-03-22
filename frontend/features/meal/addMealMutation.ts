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

const AddMealWithNewDishAndNewSourceSchema = z.object({
  dish: z.object({
    name: z.string().min(1, { message: '必須項目です。' }),
    mealPosition: z.number({
      required_error: '必須項目です。',
    }),
    comment: z.string().optional(),
  }),

  // 多分既存Dish使うときにはこのあとの値はNewMealSchemaとか再利用可能な変数にする
  meal: z.object({
    date: z.date({
      required_error: '必須項目です。',
    }),
    mealType: z.number({
      required_error: '必須項目です。',
    }),
    comment: z.string().optional(),
  }),
});
export type AddMealWithNewDishAndNewSource = z.infer<
  typeof AddMealWithNewDishAndNewSourceSchema
>;

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
    AddMealWithNewDishAndNewSourceSchema,
  };
};
