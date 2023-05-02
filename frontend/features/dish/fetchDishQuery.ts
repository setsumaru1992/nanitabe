import { gql } from '@apollo/client';
import {
  useDishesLazyQuery,
  useDishesPerSourceLazyQuery,
  useDishesPerSourceQuery,
  useDishesQuery,
} from '../../lib/graphql/generated/graphql';
import { useCodegenQuery } from '../utils/queryUtils';

// Dishを使うフラグメントが出てきたらコメントアウトを外して使用
// export const DISH_FRAGMENT = gql`
//   fragment Dish on Dish {
//     id
//     name
//     mealPosition
//     comment
//   }
// `;

// 本当は上記のように書きたいけど、エラーになるので一旦コメントアウト
export const DISHES = gql`
  query dishes($searchString: String) {
    dishes(searchString: $searchString) {
      id
      name
      mealPosition
      comment
    }
  }
`;

export const DISHES_PER_SOURCE = gql`
  query dishesPerSource {
    dishesPerSource {
      sourceId
      dishesPerMealPosition {
        mealPosition
        dishes {
          id
          name
          mealPosition
          comment
        }
      }
    }
  }
`;

type FetchDishesOnlyParams = {
  searchString?: string | null;
  requireFetchedData?: boolean;
};

const useFetchDishesOnly = (params: FetchDishesOnlyParams = {}) => {
  const { searchString = null, requireFetchedData = false } = params;
  const { data, fetchLoading, fetchError, refetch } = useCodegenQuery(
    useDishesQuery,
    useDishesLazyQuery,
    requireFetchedData,
    {
      searchString,
    },
  );

  return {
    dishes: data?.dishes,
    fetchDishesLoading: fetchLoading,
    fetchDishesError: fetchError,
    refetchDishes: refetch,
  };
};

type FetchDishesPerSourceParams = {
  requireFetchedData?: boolean;
};

const useFetchDishesPerSource = (params: FetchDishesPerSourceParams) => {
  const { requireFetchedData = false } = params;
  const { data, fetchLoading, fetchError, refetch } = useCodegenQuery(
    useDishesPerSourceQuery,
    useDishesPerSourceLazyQuery,
    requireFetchedData,
  );

  return {
    dishesPerSource: data?.dishesPerSource,
    fetchDishesPerSourceLoading: fetchLoading,
    fetchDishesPerSourceError: fetchError,
    refetchDishesPerSource: refetch,
  };
};

export type FetchDishesParams = {
  fetchDishesOnlyParams?: FetchDishesOnlyParams;
  fetchDishesPerSourceParams?: FetchDishesPerSourceParams;
};

export const useFetchDishes = (params: FetchDishesParams) => {
  const { fetchDishesOnlyParams, fetchDishesPerSourceParams } = params;
  const { dishes, fetchDishesLoading, fetchDishesError, refetchDishes } =
    useFetchDishesOnly(fetchDishesOnlyParams || {});

  const {
    dishesPerSource,
    fetchDishesPerSourceLoading,
    fetchDishesPerSourceError,
    refetchDishesPerSource,
  } = useFetchDishesPerSource(fetchDishesPerSourceParams || {});

  return {
    dishes,
    dishesPerSource,

    fetchLoading: fetchDishesLoading || fetchDishesPerSourceLoading,
    fetchError: fetchDishesError || fetchDishesPerSourceError,

    refetch: refetchDishes,
    refetchDishesPerSource,
  };
};
