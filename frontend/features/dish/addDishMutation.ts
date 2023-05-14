import { gql } from '@apollo/client';
import * as z from 'zod';
import _ from 'lodash';
import {
  DISH_SOURCE_RELATION_DETAIL_VALUE_TYPE,
  dishSourceRelationDetailOf,
  newDishSchema,
  putDishRelationSchema,
  selectExistingDishSourceSchema,
} from './schema';
import {
  buildMutationExecutor,
  MutationCallbacks,
} from '../utils/mutationUtils';
import {
  AddDishMutation,
  useAddDishMutation,
  AddDishWithNewSourceMutation,
  useAddDishWithNewSourceMutation,
} from '../../lib/graphql/generated/graphql';
import {
  dishSourceIdSchema,
  dishSourceTypeOptionalSchema,
} from './source/schema';

export const ADD_DISH = gql`
  mutation addDish(
    $dish: DishForCreate!
    $dishSource: SourceForRead
    $dishSourceRelationDetail: DishSourceRelationDetail
  ) {
    addDish(
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

const AddDishSchema = z.object({
  dish: newDishSchema,
  selectedDishSource: selectExistingDishSourceSchema,
  dishSourceRelation: putDishRelationSchema,
});

export type AddDish = z.infer<typeof AddDishSchema>;

const convertFromAddDishInputToGraphqlInput = (input: AddDish): AddDish => {
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
  normalizedInput.dishSourceRelationDetail =
    normalizedInput.dishSourceRelation.dishSourceRelationDetail;
  normalizedInput.dishSource = {
    id: selectedDishSource.id,
    type: selectedDishSource.type,
  };

  return normalizedInput;
};

export const ADD_DISH_WITH_NEW_SOURCE = gql`
  mutation addDishWithNewSource(
    $dish: DishForCreate!
    $dishSource: SourceForCreate!
    $dishSourceRelationDetail: DishSourceRelationDetail
  ) {
    addDishWithNewSource(
      input: {
        dish: $dish
        dishSource: $dishSource
        dishSourceRelationDetail: $dishSourceRelationDetail
      }
    ) {
      dishId
      dishSourceId
    }
  }
`;

const AddDishWithNewSourceSchema = z.object({
  dish: newDishSchema,
});

export type AddDishWithNewSource = z.infer<typeof AddDishWithNewSourceSchema>;

const convertFromAddDishWithNewSourceInputToGraphqlInput = (
  input: AddDishWithNewSource,
): AddDishWithNewSource => {
  return input;
};

export type AddDishInput = AddDish | AddDishWithNewSource;
export type AddDishOutput = AddDishMutation | AddDishWithNewSourceMutation;
export type AddDishFunc = (
  input: AddDishInput,
  mutationCallbacks: MutationCallbacks<AddDishOutput>,
) => void;

export const useAddDish = () => {
  const [addDish, addDishLoading, addDishError] = buildMutationExecutor<
    AddDish,
    AddDishMutation
  >(useAddDishMutation);

  const [
    addDishWithNewSource,
    addDishWithNewSourceLoading,
    addDishWithNewSourceError,
  ] = buildMutationExecutor<AddDishWithNewSource, AddDishWithNewSourceMutation>(
    useAddDishWithNewSourceMutation,
  );

  return {
    addDish,
    convertFromAddDishInputToGraphqlInput,
    AddDishSchema,

    addDishWithNewSource,
    convertFromAddDishWithNewSourceInputToGraphqlInput,
    AddDishWithNewSourceSchema,

    addDishLoading: addDishLoading || addDishWithNewSourceLoading,
    addDishError: addDishError || addDishWithNewSourceError,
  };
};
