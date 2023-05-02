import { FetchDishesParams, useFetchDishes } from './fetchDishQuery';
import { useAddDish } from './addDishMutation';
import { useUpdateDish } from './updateDishMutation';

export type { AddDish } from './addDishMutation';
export type { UpdateDish } from './updateDishMutation';

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
  const { updateDish, updateDishLoading, updateDishError, UpdateDishSchema } =
    useUpdateDish();

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

    updateDish,
    updateDishLoading,
    updateDishError,
    UpdateDishSchema,
  };
};
