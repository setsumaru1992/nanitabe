import { gql } from '@apollo/client';
import * as z from 'zod';
import _ from 'lodash';
import {
  updateDishSchema,
  putDishRelationSchema,
  DISH_SOURCE_RELATION_DETAIL_VALUE_TYPE,
} from './schema';
import { buildMutationExecutor } from '../utils/mutationUtils';
import {
  UpdateDishMutation,
  useUpdateDishMutation,
} from '../../lib/graphql/generated/graphql';
import { DISH_SOURCE_TYPE, DishSourceType } from './source/const';

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

const convertFromUpdateDishWithExistingSourceInputToGraphqlInput = (
  input: UpdateDish,
  dishSourceId: number,
  dishSourceType: DishSourceType,
): UpdateDish => {
  const normalizedInput = _.cloneDeep(input);
  const { dishSourceRelation, dish } = input;

  if (!dishSourceRelation || !dishSourceRelation.dishSourceRelationDetail) {
    normalizedInput.dishSourceRelation = null;
    return normalizedInput;
  }

  delete normalizedInput.dishSourceRelation.dishSourceRelationDetail.detailType;
  normalizedInput.dishSourceRelation = {
    dishId: dish.id,
    dishSourceId,
    dishSourceType,
    dishSourceRelationDetail:
      normalizedInput.dishSourceRelation.dishSourceRelationDetail,
  };

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
    convertFromUpdateDishWithExistingSourceInputToGraphqlInput,
    UpdateDishSchema,
  };
};
