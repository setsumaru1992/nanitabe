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

export const { newDishSchema, updateDishSchema } = buildDishSchema();

const buildDishSourceRelationSchema = () => {
  const putDishRelationSchema = z.object({
    dishSourceId: dishSourceIdSchema,
  });

  return { putDishRelationSchema };
};

export const { putDishRelationSchema } = buildDishSourceRelationSchema();
