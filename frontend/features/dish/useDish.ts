import { FetchDishesParams, useFetchDishes } from './fetchDishQuery';
import { useAddDish } from './addDishMutation';
import { useUpdateDish } from './updateDishMutation';
import { useRemoveDish } from './removeDishMutation';

export type { AddDish } from './addDishMutation';
export type { UpdateDishInput, UpdateDishOutput } from './updateDishMutation';

export type UseDishParams = {
  fetchDishesParams?: FetchDishesParams;
};

export default (params: UseDishParams = {}) => {
  const { fetchDishesParams } = params;

  const {
    dishes,
    dish,
    dishesPerSource,
    fetchLoading,
    fetchError,
    refetch,
    refetchDish,
    refetchDishesPerSource,
  } = useFetchDishes(fetchDishesParams || {});

  const { addDish, addDishLoading, addDishError, AddDishSchema } = useAddDish();
  const {
    updateDishWithExistingSource,
    updateDishLoading,
    updateDishError,
    convertFromUpdateDishWithExistingSourceInputToGraphqlInput,
    UpdateDishSchema,
  } = useUpdateDish();
  const { removeDish, removeDishLoading, removeDishError } = useRemoveDish();

  return {
    dishes,
    dish,
    dishesPerSource,
    fetchLoading,
    fetchError,
    refetch,
    refetchDish,
    refetchDishesPerSource,

    addDish,
    addDishLoading,
    addDishError,
    AddDishSchema,

    updateDishWithExistingSource,
    updateDishLoading,
    updateDishError,
    convertFromUpdateDishWithExistingSourceInputToGraphqlInput,
    UpdateDishSchema,

    removeDish,
    removeDishLoading,
    removeDishError,
  };
};
