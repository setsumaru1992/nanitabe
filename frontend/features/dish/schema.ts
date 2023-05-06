import * as z from 'zod';
import { MEAL_POSITION } from './const';
import { dishSourceIdSchema } from './source/schema';

export const dishIdSchema = z.number();

const buildDishSchema = () => {
  const nameSchema = z.string().min(1, { message: '必須項目です。' });

  const mealPositionSchema = z.nativeEnum(MEAL_POSITION, {
    required_error: '必須項目です。',
  });

  const commentSchema = z.string().optional();

  const newDishSchema = z.object({
    name: nameSchema,
    mealPosition: mealPositionSchema,
    comment: commentSchema,
  });

  const updateDishSchema = z.object({
    id: dishIdSchema,
    name: nameSchema,
    mealPosition: mealPositionSchema,
    comment: commentSchema,
  });

  return { newDishSchema, updateDishSchema };
};

export const DISH_SOURCE_RELATION_DETAIL_VALUE_TYPE = {
  RECIPE_BOOK_PAGE: 'recipeBookPage',
  RECIPE_WEBSITE_URL: 'recipeWebsiteUrl',
  RECIPE_SOURCE_MEMO: 'recipeSourceMemo',
} as const;

export const { newDishSchema, updateDishSchema } = buildDishSchema();

const buildDishSourceRelationSchema = () => {
  const recipeBookPageSchema = z.number();
  const recipeWebsiteUrlSchema = z.string();
  const recipeSourceMemoSchema = z.string();

  const dishSourceRelationDetailSchema = z.discriminatedUnion('detailType', [
    z.object({
      detailType: z.literal(
        DISH_SOURCE_RELATION_DETAIL_VALUE_TYPE.RECIPE_BOOK_PAGE,
      ),
      recipeBookPage: recipeBookPageSchema,
    }),
    z.object({
      detailType: z.literal(
        DISH_SOURCE_RELATION_DETAIL_VALUE_TYPE.RECIPE_WEBSITE_URL,
      ),
      recipeWebsiteUrl: recipeWebsiteUrlSchema,
    }),
    z.object({
      detailType: z.literal(
        DISH_SOURCE_RELATION_DETAIL_VALUE_TYPE.RECIPE_SOURCE_MEMO,
      ),
      recipeSourceMemo: recipeSourceMemoSchema,
    }),
  ]);

  // NOTE: putと銘打っているのはaddもupdateも区別したくないと思っているからだが、多分これはupdateフレンドリーでaddでは別の値必要になりそう
  const putDishRelationSchema = z.object({
    // dishId: dishIdSchema,
    // dishSourceId: dishSourceIdSchema,
    dishSourceRelationDetail: dishSourceRelationDetailSchema,
  });

  return { putDishRelationSchema };
};

export const { putDishRelationSchema } = buildDishSourceRelationSchema();
