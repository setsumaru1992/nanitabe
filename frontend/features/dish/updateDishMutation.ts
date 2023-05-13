import { gql } from '@apollo/client';
import * as z from 'zod';
import _ from 'lodash';
import {
  updateDishSchema,
  putDishRelationSchema,
  DISH_SOURCE_RELATION_DETAIL_VALUE_TYPE,
  dishSourceRelationDetailOf,
} from './schema';
import {
  buildMutationExecutor,
  MutationCallbacks,
} from '../utils/mutationUtils';
import {
  UpdateDishWithExistingSourceMutation,
  UpdateDishWithNewSourceMutation,
  useUpdateDishWithExistingSourceMutation,
  useUpdateDishWithNewSourceMutation,
} from '../../lib/graphql/generated/graphql';
import {
  dishSourceIdSchema,
  dishSourceTypeOptionalSchema,
  newDishSourceSchema,
} from './source/schema';

export const UPDATE_DISH_WITH_EXISTING_SOURCE = gql`
  mutation updateDishWithExistingSource(
    $dish: DishForUpdate!
    $dishSourceRelation: DishSourceRelationForUpdate
  ) {
    updateDishWithExistingSource(
      input: { dish: $dish, dishSourceRelation: $dishSourceRelation }
    ) {
      dishId
    }
  }
`;

const UpdateDishWithExistingSourceSchema = z.object({
  dish: updateDishSchema,
  dishSource: z
    .object({
      id: dishSourceIdSchema.nullish(),
      type: dishSourceTypeOptionalSchema,
    })
    .optional(),
  dishSourceRelation: putDishRelationSchema,
});

export type UpdateDishWithExistingSource = z.infer<
  typeof UpdateDishWithExistingSourceSchema
>;

const convertFromUpdateDishWithExistingSourceInputToGraphqlInput = (
  input: UpdateDishWithExistingSource,
): UpdateDishWithExistingSource => {
  const normalizedInput = _.cloneDeep(input);
  const { dishSourceRelation, dish, dishSource } = input;

  const dishSourceRelationDetailType = dishSourceRelationDetailOf(
    dishSource.type,
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
    dishSourceId: dishSource.id,
    dishSourceType: dishSource.type,
    dishSourceRelationDetail:
      normalizedInput.dishSourceRelation.dishSourceRelationDetail,
  };

  delete normalizedInput.dishSource;
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

export type UpdateDishInput =
  | UpdateDishWithNewSource
  | UpdateDishWithExistingSource;
export type UpdateDishOutput =
  | UpdateDishWithNewSourceMutation
  | UpdateDishWithExistingSourceMutation;
export type UpdateDishFunc = (
  input: UpdateDishInput,
  mutationCallbacks: MutationCallbacks<UpdateDishOutput>,
) => void;

export const useUpdateDish = () => {
  const [
    updateDishWithExistingSource,
    updateDishWithExistingSourceLoading,
    updateDishWithExistingSourceError,
  ] = buildMutationExecutor<
    UpdateDishWithExistingSource,
    UpdateDishWithExistingSourceMutation
  >(useUpdateDishWithExistingSourceMutation);

  const [
    updateDishWithNewSource,
    updateDishWithNewSourceLoading,
    updateDishWithNewSourceError,
  ] = buildMutationExecutor<
    UpdateDishWithNewSource,
    UpdateDishWithNewSourceMutation
  >(useUpdateDishWithNewSourceMutation);

  return {
    updateDishWithExistingSource,
    UpdateDishWithExistingSourceSchema,

    updateDishWithNewSource,
    UpdateDishWithNewSourceSchema,

    updateDishLoading:
      updateDishWithExistingSourceLoading || updateDishWithNewSourceLoading,
    updateDishError:
      updateDishWithExistingSourceError || updateDishWithNewSourceError,
    convertFromUpdateDishWithExistingSourceInputToGraphqlInput,
  };
};
