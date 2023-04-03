import { gql } from '@apollo/client';
import { useCodegenQuery } from '../utils/queryUtils';
import {
  useMealsForCalenderLazyQuery,
  useMealsForCalenderQuery,
} from '../../lib/graphql/generated/graphql';

// export const MEAL_FRAGMENT = gql`
//   fragment Meal on Meal {
//     id
//     date
//     mealType
//     comment
//     dish {
//       ...Dish
//     }
//   }
// `;

// dish同様上記のように書きたいけどやりかたわからないからコメントアウト
export const MEALS_FOR_CALENDER = gql`
  query mealsForCalender($startDate: ISO8601Date!) {
    mealsForCalender(startDate: $startDate) {
      date
      meals {
        id
        date
        mealType
        comment
        dish {
          id
          name
          mealPosition
          comment
        }
      }
    }
  }
`;

export const useFetchMealsForCalender = (
  startDateArg = null,
  requireFetchedData: boolean = true,
) => {
  const startDate = startDateArg || new Date();
  const { data, fetchLoading, fetchError, refetch } = useCodegenQuery(
    useMealsForCalenderQuery,
    useMealsForCalenderLazyQuery,
    requireFetchedData,
    { startDate },
  );
  return {
    mealsForCalender: data?.mealsForCalender,
    fetchMealsForCalenderLoading: fetchLoading,
    fetchMealsForCalenderError: fetchError,
    refetchMealsForCalender: refetch,
  };
};
