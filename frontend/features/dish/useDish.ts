import { useFetchDishes } from './fetchDishQuery';

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

  return {
    dishes,
    dishesPerSource,
    fetchLoading,
    fetchError,
    refetch,
    refetchDishesPerSource,
  };
};
