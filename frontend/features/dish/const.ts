export const MEAL_POSITION = {
  STAPLE_FOOD: 1,
  MAIN_DISH: 2,
  SIDE_DISH: 3,
  SOUP: 4,
  DESSERT: 5,
} as const;

export type MealPosition = (typeof MEAL_POSITION)[keyof typeof MEAL_POSITION];
