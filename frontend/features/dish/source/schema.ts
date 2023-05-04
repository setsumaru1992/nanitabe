import * as z from 'zod';
import { DISH_SOURCE_TYPE } from './const';

const nameSchema = z.string().min(1, { message: '必須項目です。' });
const dishSourceTypeSchema = z.nativeEnum(DISH_SOURCE_TYPE, {
  required_error: '必須項目です。',
});

export const dishSourceIdSchema = z.number();

export const newDishSourceSchema = z.object({
  name: nameSchema,
  type: dishSourceTypeSchema,
});
