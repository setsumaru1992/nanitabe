import { gql } from '@apollo/client';
import {
  useDishesLazyQuery,
  useDishesPerSourceLazyQuery,
  useDishesPerSourceQuery,
  useDishesQuery,
  useDishQuery,
  useDishLazyQuery,
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

export const DISH = gql`
  query dish($id: Int!) {
    dish(id: $id) {
      id
      name
      mealPosition
      comment
    }
  }
`;

type FetchDishParams = {
  requireFetchedData?: boolean;
  condition?: {
    id: number;
  };
};

const useFetchDish = (params: FetchDishParams = {}) => {
  const { condition, requireFetchedData = false } = params;
  const { data, fetchLoading, fetchError, refetch } = useCodegenQuery(
    useDishQuery,
    useDishLazyQuery,
    requireFetchedData,
    condition,
  );

  return {
    dish: data?.dish,
    fetchDishLoading: fetchLoading,
    fetchDishError: fetchError,
    refetchDish: refetch,
  };
};

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
  fetchDishParams?: FetchDishParams;
  fetchDishesPerSourceParams?: FetchDishesPerSourceParams;
};

export const useFetchDishes = (params: FetchDishesParams) => {
  const { fetchDishesOnlyParams, fetchDishParams, fetchDishesPerSourceParams } =
    params;
  const { dishes, fetchDishesLoading, fetchDishesError, refetchDishes } =
    useFetchDishesOnly(fetchDishesOnlyParams || {});

  const {
    dishesPerSource,
    fetchDishesPerSourceLoading,
    fetchDishesPerSourceError,
    refetchDishesPerSource,
  } = useFetchDishesPerSource(fetchDishesPerSourceParams || {});

  const { dish, fetchDishLoading, fetchDishError, refetchDish } = useFetchDish(
    fetchDishParams || {},
  );

  return {
    dishes,
    dish,
    dishesPerSource,

    fetchLoading:
      fetchDishesLoading || fetchDishesPerSourceLoading || fetchDishLoading,
    fetchError: fetchDishesError || fetchDishesPerSourceError || fetchDishError,

    refetch: refetchDishes,
    refetchDish,
    refetchDishesPerSource,
  };
};
