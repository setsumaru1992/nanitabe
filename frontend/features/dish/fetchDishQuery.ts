import { gql } from '@apollo/client';
import {
  useDishesLazyQuery,
  useDishesQuery,
} from '../../lib/graphql/generated/graphql';
import { useCodegenQuery } from '../utils/queryUtils';

// export const DISH_FRAGMENT = gql`
//   fragment DishFields on DishFields {
//     id
//     name
//     mealPosition
//     comment
//   }
// `;

// (共通項としてのフラグメントとして機能させたいのに、
// Dishインタフェースの具象型であるDishRegisteredWithMeal型として返ってきたときにはDishとして扱ってもらえない)
//
// export const DISHES = gql`
//   query dishes($searchString: String) {
//     dishes(searchString: $searchString) {
//       ...DishFields
//     }
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
