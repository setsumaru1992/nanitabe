import { gql } from '@apollo/client';
import * as z from 'zod';
import { updateDishSchema } from './schema';
import { buildMutationExecutor } from '../utils/mutationUtils';
import {
  UpdateDishMutation,
  useUpdateDishMutation,
} from '../../lib/graphql/generated/graphql';

export const UPDATE_DISH = gql`
  mutation updateDish($dish: DishForUpdate!) {
    updateDish(input: { dish: $dish }) {
      dishId
    }
  }
`;

const UpdateDishSchema = z.object({
  dish: updateDishSchema,
});

export type UpdateDish = z.infer<typeof UpdateDishSchema>;

export const useUpdateDish = () => {
  const [updateDish, updateDishLoading, updateDishError] =
    buildMutationExecutor<UpdateDish, UpdateDishMutation>(
      useUpdateDishMutation,
    );

  return {
    updateDish,
    updateDishLoading,
    updateDishError,
    UpdateDishSchema,
  };
};
