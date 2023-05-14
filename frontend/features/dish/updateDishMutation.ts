import { gql } from '@apollo/client';
import * as z from 'zod';
import _ from 'lodash';
import {
  updateDishSchema,
  putDishRelationSchema,
  DISH_SOURCE_RELATION_DETAIL_VALUE_TYPE,
  dishSourceRelationDetailOf,
  selectExistingDishSourceSchema,
} from './schema';
import {
  buildMutationExecutor,
  MutationCallbacks,
} from '../utils/mutationUtils';
import {
  UpdateDishMutation,
  UpdateDishWithNewSourceMutation,
  useUpdateDishMutation,
  useUpdateDishWithNewSourceMutation,
} from '../../lib/graphql/generated/graphql';
import {
  dishSourceIdSchema,
  dishSourceTypeOptionalSchema,
  newDishSourceSchema,
} from './source/schema';

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
  selectedDishSource: selectExistingDishSourceSchema,
  dishSourceRelation: putDishRelationSchema,
});

export type UpdateDish = z.infer<typeof UpdateDishSchema>;

const convertFromUpdateDishInputToGraphqlInput = (
  input: UpdateDish,
): UpdateDish => {
  const normalizedInput = _.cloneDeep(input);
  const { dishSourceRelation, dish, selectedDishSource } = input;

  const dishSourceRelationDetailType = dishSourceRelationDetailOf(
    selectedDishSource.type,
  );
  if (
    !dishSourceRelation ||
    !dishSourceRelation.dishSourceRelationDetail ||
    dishSourceRelationDetailType ===
      DISH_SOURCE_RELATION_DETAIL_VALUE_TYPE.NO_VALUE
  ) {
    normalizedInput.dishSourceRelation = null;
    return normalizedInput;
  }

  delete normalizedInput.dishSourceRelation.dishSourceRelationDetail.detailType;
  normalizedInput.dishSourceRelation = {
    dishId: dish.id,
    dishSourceId: selectedDishSource.id,
    dishSourceType: selectedDishSource.type,
    dishSourceRelationDetail:
      normalizedInput.dishSourceRelation.dishSourceRelationDetail,
  };

  return normalizedInput;
};

export const UPDATE_DISH_WITH_NEW_SOURCE = gql`
  mutation updateDishWithNewSource(
    $dish: DishForUpdate!
    $dishSource: SourceForCreate!
    $dishSourceRelationDetail: DishSourceRelationDetail
  ) {
    updateDishWithNewSource(
      input: {
        dish: $dish
        dishSource: $dishSource
        dishSourceRelationDetail: $dishSourceRelationDetail
      }
    ) {
      dishId
    }
  }
`;

const UpdateDishWithNewSourceSchema = z.object({
  dish: updateDishSchema,
  dishSource: newDishSourceSchema,
  dishSourceRelation: putDishRelationSchema,
});

export type UpdateDishWithNewSource = z.infer<
  typeof UpdateDishWithNewSourceSchema
>;

const convertFromUpdateDishWithNewSourceInputToGraphqlInput = (
  input: UpdateDishWithNewSource,
): UpdateDishWithNewSource => {
  const normalizedInput = _.cloneDeep(input);
  normalizedInput.dishSourceRelation = null;
  normalizedInput.dishSourceRelationDetail = null;
  const { dishSourceRelation, dishSource } = input;

  const dishSourceRelationDetailType = dishSourceRelationDetailOf(
    dishSource.type,
  );
  if (
    !dishSourceRelation ||
    !dishSourceRelation.dishSourceRelationDetail ||
    dishSourceRelationDetailType ===
      DISH_SOURCE_RELATION_DETAIL_VALUE_TYPE.NO_VALUE
  ) {
    return normalizedInput;
  }

  // ここの書き方含めて、何かとりあえずやりたいこと満たすための汚いコードにしか見えない
  normalizedInput.dishSourceRelationDetail =
    dishSourceRelation.dishSourceRelationDetail;
  delete normalizedInput.dishSourceRelationDetail.detailType;
  return normalizedInput;
};

export type UpdateDishInput = UpdateDishWithNewSource | UpdateDish;
export type UpdateDishOutput =
  | UpdateDishWithNewSourceMutation
  | UpdateDishMutation;
export type UpdateDishFunc = (
  input: UpdateDishInput,
  mutationCallbacks: MutationCallbacks<UpdateDishOutput>,
) => void;

export const useUpdateDish = () => {
  const [updateDish, updateDishLoading, updateDishError] =
    buildMutationExecutor<UpdateDish, UpdateDishMutation>(
      useUpdateDishMutation,
    );

  const [
    updateDishWithNewSource,
    updateDishWithNewSourceLoading,
    updateDishWithNewSourceError,
  ] = buildMutationExecutor<
    UpdateDishWithNewSource,
    UpdateDishWithNewSourceMutation
  >(useUpdateDishWithNewSourceMutation);

  return {
    updateDish,
    convertFromUpdateDishInputToGraphqlInput,
    UpdateDishSchema,

    updateDishWithNewSource,
    convertFromUpdateDishWithNewSourceInputToGraphqlInput,
    UpdateDishWithNewSourceSchema,

    updateDishLoading: updateDishLoading || updateDishWithNewSourceLoading,
    updateDishError: updateDishError || updateDishWithNewSourceError,
  };
};
