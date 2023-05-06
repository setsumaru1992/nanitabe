import { gql } from '@apollo/client';
import * as z from 'zod';
import _ from 'lodash';
import { updateDishSchema, putDishRelationSchema } from './schema';
import { buildMutationExecutor } from '../utils/mutationUtils';
import {
  UpdateDishMutation,
  useUpdateDishMutation,
} from '../../lib/graphql/generated/graphql';
import { DISH_SOURCE_TYPE } from './source/const';

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

const normalizeUpdateDishSourceRelationInput = (
  input: UpdateDish,
): UpdateDish => {
  const normalizedInput = _.cloneDeep(input);
  const { dishSourceRelation, dish } = input;

  if (dishSourceRelation == null) {
    return normalizedInput;
  }
  if (dishSourceRelation === undefined) {
    normalizedInput.dishSourceRelation = null;
    return normalizedInput;
  }

  // NOTE: 値が設定されていない時代にとりあえずエラーにならないための記述（多分不要）
  // if (!dishSourceRelation?.dishSourceId) {
  //   normalizedInput.dishSourceRelation = null;
  //   return normalizedInput;
  // }

  delete normalizedInput.dishSourceRelation.dishSourceRelationDetail.detailType;
  // NOTE: ベタ書き
  normalizedInput.dishSourceRelation = {
    dishId: dish.id,
    dishSourceId: 1,
    dishSourceType: DISH_SOURCE_TYPE.YOUTUBE,
    dishSourceRelationDetail:
      normalizedInput.dishSourceRelation.dishSourceRelationDetail,
  };

  return normalizedInput;
};

const normalizeUpdateDishInput = (input: UpdateDish): UpdateDish => {
  let normalizedInput = _.cloneDeep(input);

  normalizedInput = normalizeUpdateDishSourceRelationInput(normalizedInput);

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
