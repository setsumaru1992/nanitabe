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
    }
  }
`;

export const useFetchDishes = (
  searchString: string | null = null,
  requireFetchedData: boolean = true,
) => {
  const {
    data: dishesData,
    fetchLoading: fetchDishesLoading,
    fetchError: fetchDishesError,
    refetch: refetchDishes,
  } = useCodegenQuery(useDishesQuery, useDishesLazyQuery, requireFetchedData, {
    searchString,
  });

  const {
    data: dishesPerSourceData,
    fetchLoading: fetchDishesPerSourceLoading,
    fetchError: fetchDishesPerSourceError,
    refetch: refetchDishesPerSource,
  } = useCodegenQuery(
    useDishesPerSourceQuery,
    useDishesPerSourceLazyQuery,
    requireFetchedData,
  );

  return {
    dishes: dishesData?.dishes,
    dishesPerSource: dishesPerSourceData?.dishesPerSource,

    fetchLoading: fetchDishesLoading || fetchDishesPerSourceLoading,
    fetchError: fetchDishesError || fetchDishesPerSourceError,

    refetch: refetchDishes,
    refetchDishesPerSource,
  };
};
