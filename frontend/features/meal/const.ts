export const MEAL_TYPE = {
  BREAKFAST: 1,
  LUNCH: 2,
  DINNER: 3,
} as const;

export type MealType = (typeof MEAL_TYPE)[keyof typeof MEAL_TYPE];
