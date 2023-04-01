import { gql } from '@apollo/client';

export const MEAL_FRAGMENT = gql`
  fragment Meal on MealForCalender {
    id
    date
    mealType
    comment
    dish {
      ...Dish
    }
  }
`;

export const MEALS_FOR_CALENDER = gql`
  query mealsForCalender($startDate: ISO8601Date!) {
    mealsForCalender(startDate: $startDate) {
      date
      meals {
        ...Meal
      }
    }
  }
`;
