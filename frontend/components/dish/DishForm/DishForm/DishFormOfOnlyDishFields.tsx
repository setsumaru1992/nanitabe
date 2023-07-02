import { useFormContext } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import React from 'react';
import { Dish } from '../../../../lib/graphql/generated/graphql';
import FormFieldWrapperWithLabel from '../../../common/form/FormFieldWrapperWithLabel';
import ErrorMessageIfExist from '../../../common/form/ErrorMessageIfExist';
import {
  MEAL_POSITION,
  MEAL_POSITION_LABELS,
  MEAL_POSITIONS,
} from '../../../../features/dish/const';

type DishFormOfOnlyDishFieldsProps = {
  preFilledDish?: Dish;
};
export const DishFormOfOnlyDishFields = (
  props: DishFormOfOnlyDishFieldsProps,
) => {
  const { preFilledDish } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {preFilledDish?.id && (
        <input
          type="hidden"
          value={preFilledDish.id}
          {...register('dish.id', { valueAsNumber: true })}
        />
      )}
      <FormFieldWrapperWithLabel label="料理名" required>
        <Form.Control
          type="text"
          {...register('dish.name')}
          defaultValue={preFilledDish?.name}
          data-testid="dishname"
        />
        <ErrorMessageIfExist errorMessage={errors.dish?.name?.message} />
      </FormFieldWrapperWithLabel>
      <FormFieldWrapperWithLabel label="位置づけ">
        <Form.Select
          defaultValue={preFilledDish?.mealPosition || MEAL_POSITION.MAIN_DISH}
          {...register('dish.mealPosition', { valueAsNumber: true })}
          data-testid="mealPositionOptions"
        >
          {MEAL_POSITIONS.map((position) => (
            <option
              key={position}
              value={position}
              data-testid={`mealPositionOption-${position}`}
            >
              {MEAL_POSITION_LABELS[position]}
            </option>
          ))}
        </Form.Select>
        <ErrorMessageIfExist
          errorMessage={errors.dish?.mealPosition?.message}
        />
      </FormFieldWrapperWithLabel>
    </>
  );
};
