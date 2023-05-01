import { gql } from '@apollo/client';
import * as z from 'zod';
import { newDishSchema } from './schema';
import { buildMutationExecutor } from '../utils/mutationUtils';
import {
  AddDishMutation,
  useAddDishMutation,
} from '../../lib/graphql/generated/graphql';

export const ADD_DISH = gql`
  mutation addDish($dish: DishForCreate!) {
    addDish(input: { dish: $dish }) {
      dishId
    }
  }
`;

const AddDishSchema = newDishSchema;

export type AddDish = z.infer<typeof AddDishSchema>;

export const useAddDish = () => {
  const [addDish, addDishLoading, addDishError] = buildMutationExecutor<
    AddDish,
    AddDishMutation
  >(useAddDishMutation);

  return {
    addDish,
    addDishLoading,
    addDishError,

    AddDishSchema,
  };
};
