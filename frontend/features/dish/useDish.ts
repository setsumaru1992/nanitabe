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
    dishesPerSource,
    fetchLoading,
    fetchError,
    refetch,
    refetchDishesPerSource,
  } = useFetchDishes(fetchDishesParams || {});

  const { addDish, addDishLoading, addDishError, AddDishSchema } = useAddDish();
  const { updateDish, updateDishLoading, updateDishError, UpdateDishSchema } =
    useUpdateDish();

  return {
    dishes,
    dishesPerSource,
    fetchLoading,
    fetchError,
    refetch,
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
