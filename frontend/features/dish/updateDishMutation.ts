import { gql } from '@apollo/client';
import * as z from 'zod';
import _ from 'lodash';
import { updateDishSchema, putDishRelationSchema } from './schema';
import { buildMutationExecutor } from '../utils/mutationUtils';
import {
  UpdateDishMutation,
  useUpdateDishMutation,
} from '../../lib/graphql/generated/graphql';

export const UPDATE_DISH = gql`
  mutation updateDish(
    $dish: DishForUpdate!
    $dishSourceRelation: DishSourceRelationForUpdate
  ) {
    updateDish(
      input: { dish: $dish, dishSourceRelation: $dishSourceRelation }
    ) {
      dishId
    }
  }
`;

const UpdateDishSchema = z.object({
  dish: updateDishSchema,
  dishSourceRelation: putDishRelationSchema.optional(),
});

export type UpdateDish = z.infer<typeof UpdateDishSchema>;

const normalizeUpdateDishInput = (input: UpdateDish): UpdateDish => {
  const normalizedInput = _.cloneDeep(input);
  const { dishSourceRelation } = input;
  if (dishSourceRelation === undefined) {
    normalizedInput.dishSourceRelation = null;
  } else if (!dishSourceRelation?.dishSourceId) {
    normalizedInput.dishSourceRelation = null;
  }
  return normalizedInput;
};

export const useUpdateDish = () => {
  const [updateDish, updateDishLoading, updateDishError] =
    buildMutationExecutor<UpdateDish, UpdateDishMutation>(
      useUpdateDishMutation,
    );

  return {
    updateDish,
    updateDishLoading,
    updateDishError,
    normalizeUpdateDishInput,
    UpdateDishSchema,
  };
};
