import * as z from 'zod';
import { MEAL_POSITION } from './const';

const nameSchema = z.string().min(1, { message: '必須項目です。' });

const mealPositionSchema = z.nativeEnum(MEAL_POSITION, {
  required_error: '必須項目です。',
});

const commentSchema = z.string().optional();

export const dishIdSchema = z.number();

export const newDishSchema = z.object({
  name: nameSchema,
  mealPosition: mealPositionSchema,
  comment: commentSchema,
});

export const updateDishSchema = z.object({
  id: dishIdSchema,
  name: nameSchema,
  mealPosition: mealPositionSchema,
  comment: commentSchema,
});
