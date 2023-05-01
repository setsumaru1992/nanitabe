import { useFetchDishes } from './fetchDishQuery';
import { useAddDish } from './addDishMutation';

export type { AddDish } from './addDishMutation';

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
  };
};
