import { useFetchDishes } from './fetchDishQuery';
import { useAddDish } from './addDishMutation';
import { useUpdateDish } from './updateDishMutation';

export type { AddDish } from './addDishMutation';
export type { UpdateDish } from './updateDishMutation';

export default (
  searchString: string | null = null,
  requireFetchedData: boolean = true,
) => {
  const {
    dishes,
    dishesPerSource,
    fetchLoading,
    fetchError,
    refetch,
    refetchDishesPerSource,
  } = useFetchDishes(searchString, requireFetchedData);

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
