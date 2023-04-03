import { gql } from '@apollo/client';
import {
  useDishesLazyQuery,
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

export const useFetchDishes = (
  searchString: string | null = null,
  requireFetchedData: boolean = true,
) => {
  const { data, fetchLoading, fetchError, refetch } = useCodegenQuery(
    useDishesQuery,
    useDishesLazyQuery,
    requireFetchedData,
    { searchString },
  );
  return {
    dishes: data?.dishes,
    fetchLoading,
    fetchError,
    refetch,
  };
};
