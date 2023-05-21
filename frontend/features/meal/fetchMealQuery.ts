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

const truncateTimeFrom = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

type FetchMealsForCalenderParams = {
  requireFetchedData?: boolean;
  startDateArg?: Date;
};

const useFetchMealsForCalender = (params: FetchMealsForCalenderParams) => {
  const { requireFetchedData = false, startDateArg = null } = params;
  // ISO8601Dateに時間を渡すと型不正と扱われて、無限リクエストが発生するため、時間を切り捨てる
  const startDate = truncateTimeFrom(startDateArg || new Date());
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

export type FetchMealsParams = {
  fetchMealsForCalenderParams?: FetchMealsForCalenderParams;
};

export const useFetchMeals = (params: FetchMealsParams = {}) => {
  const { fetchMealsForCalenderParams } = params;

  const {
    mealsForCalender,
    fetchMealsForCalenderLoading,
    fetchMealsForCalenderError,
    refetchMealsForCalender,
  } = useFetchMealsForCalender(fetchMealsForCalenderParams || {});

  return {
    mealsForCalender,
    refetchMealsForCalender,
    fetchMealsLoading: fetchMealsForCalenderLoading,
    fetchMealsError: fetchMealsForCalenderError,
  };
};
