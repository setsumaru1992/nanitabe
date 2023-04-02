import { useFetchDishes } from './fetchDishQuery';

export default (
  searchString: string | null = null,
  requireFetchedData: boolean = true,
) => {
  const { dishes, fetchLoading, fetchError, refetch } = useFetchDishes(
    searchString,
    requireFetchedData,
  );

  return {
    dishes,
    fetchLoading,
    fetchError,
    refetch,
  };
};
