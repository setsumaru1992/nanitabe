import { gql } from '@apollo/client';
import {
  useExistingDishesForRegisteringWithMealLazyQuery,
  useDishesPerSourceLazyQuery,
  useDishesPerSourceQuery,
  useExistingDishesForRegisteringWithMealQuery,
  useDishQuery,
  useDishLazyQuery,
} from '../../lib/graphql/generated/graphql';
import { useCodegenQuery } from '../utils/queryUtils';

// Dishを使うフラグメントが出てきたらコメントアウトを外して使用
//
// 本当はdishと同様のスキーマを持つところで使いまわしたいんだけど、
// zodのbrandのようにスキーマが同じでも命名が違うものはフラグメントとして使い回せるものではないらしい。
// というか、fragment xx on oo のooに当てはまるもの以外を置けない
//
// export const DISH_FRAGMENT = gql`
//   fragment Dish on Dish {
//     id
//     name
//     mealPosition
//     comment
//   }
// `;

export const EXISTING_DISHES_FOR_REGISTERING_WITH_MEAL = gql`
  query existingDishesForRegisteringWithMeal($searchString: String) {
    existingDishesForRegisteringWithMeal(searchString: $searchString) {
      id
      name
      mealPosition
      comment
      dishSourceName
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
    useExistingDishesForRegisteringWithMealQuery,
    useExistingDishesForRegisteringWithMealLazyQuery,
    requireFetchedData,
    {
      searchString,
    },
  );

  return {
    dishes: data?.existingDishesForRegisteringWithMeal,
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
      dishSourceRelation {
        dishSourceId
        recipeBookPage
        recipeWebsiteUrl
        recipeSourceMemo
      }
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
      dishSource {
        id
        name
        type
      }
      dishesPerMealPosition {
        mealPosition
        dishes {
          id
          name
          mealPosition
          comment
          meals {
            id
          }
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
