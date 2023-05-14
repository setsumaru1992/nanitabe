import { FetchDishesParams, useFetchDishes } from './fetchDishQuery';
import { useAddDish } from './addDishMutation';
import { useUpdateDish } from './updateDishMutation';
import { useRemoveDish } from './removeDishMutation';

export type { AddDish } from './addDishMutation';
export type {
  UpdateDishInput,
  UpdateDishOutput,
  UpdateDishFunc,
} from './updateDishMutation';

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
    updateDish,
    convertFromUpdateDishInputToGraphqlInput,
    UpdateDishSchema,
    updateDishWithNewSource,
    convertFromUpdateDishWithNewSourceInputToGraphqlInput,
    UpdateDishWithNewSourceSchema,
    updateDishLoading,
    updateDishError,
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

    updateDish,
    convertFromUpdateDishInputToGraphqlInput,
    UpdateDishSchema,
    updateDishWithNewSource,
    convertFromUpdateDishWithNewSourceInputToGraphqlInput,
    UpdateDishWithNewSourceSchema,
    updateDishLoading,
    updateDishError,

    removeDish,
    removeDishLoading,
    removeDishError,
  };
};
