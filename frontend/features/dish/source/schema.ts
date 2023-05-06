import * as z from 'zod';
import { DISH_SOURCE_TYPE } from './const';

export const dishSourceIdSchema = z.number();

export const dishSourceTypeRequiredSchema = z.nativeEnum(DISH_SOURCE_TYPE, {
  required_error: '必須項目です。',
});

export const dishSourceTypeOptionalSchema =
  z.nativeEnum(DISH_SOURCE_TYPE).optional;

const buildDishSourceSchema = () => {
  const nameSchema = z.string().min(1, { message: '必須項目です。' });

  const newDishSourceSchema = z.object({
    name: nameSchema,
    type: dishSourceTypeRequiredSchema,
  });

  return { newDishSourceSchema };
};

export const { newDishSourceSchema } = buildDishSourceSchema();
