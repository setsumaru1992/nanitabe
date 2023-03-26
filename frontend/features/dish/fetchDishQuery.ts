import { gql } from '@apollo/client';
import {
  useDishesLazyQuery,
  useDishesQuery,
} from '../../lib/graphql/generated/graphql';

export const DISH_FRAGMENT = gql`
  fragment Dish on Dish {
    id
    name
    mealPosition
    comment
  }
`;

export const DISHES = gql`
  query dishes($searchString: String) {
    dishes(searchString: $searchString) {
      ...Dish
    }
  }
`;

export const useFetchDishes = (
  searchString: string | null = null,
  requireFetchedData: boolean = true,
) => {
  const dishesQuery = (() => {
    const variables = { searchString };
    if (requireFetchedData) {
      return useDishesQuery({ variables });
    }
    return useDishesLazyQuery({ variables })[1];
  })();

  return {
    dishes: dishesQuery.data?.dishes,
    fetchLoading: dishesQuery.loading,
    fetchError: dishesQuery.error,
    refetch: dishesQuery.refetch,
  };
};
