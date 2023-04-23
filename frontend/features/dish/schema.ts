import * as z from 'zod';
import { MEAL_POSITION } from './const';

export const dishIdSchema = z.number();

export const newDishSchema = z.object({
  name: z.string().min(1, { message: '必須項目です。' }),
  mealPosition: z.nativeEnum(MEAL_POSITION, {
    required_error: '必須項目です。',
  }),
  comment: z.string().optional(),
});
