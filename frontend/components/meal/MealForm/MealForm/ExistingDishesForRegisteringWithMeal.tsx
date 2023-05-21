import { useFormContext } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import React from 'react';
import useDish from '../../../../features/dish/useDish';
import FormFieldWrapperWithLabel from '../../../common/form/FormFieldWrapperWithLabel';
import ErrorMessageIfExist from '../../../common/form/ErrorMessageIfExist';

type ExistingDishesForRegisteringWithMealProps = {
  dishIdOfRegisteredWithMeal?: number;
};
export const ExistingDishesForRegisteringWithMeal = (
  props: ExistingDishesForRegisteringWithMealProps,
) => {
  const { dishIdOfRegisteredWithMeal } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { dishes, fetchLoading } = useDish({
    fetchDishesParams: {
      fetchDishesOnlyParams: { requireFetchedData: true },
    },
  });

  if (fetchLoading) return <>Loading</>;

  return (
    <FormFieldWrapperWithLabel label="料理">
      <Form.Select
        defaultValue={dishIdOfRegisteredWithMeal || null}
        {...register('dishId', { valueAsNumber: true })}
        data-testid="existingDishes"
      >
        <option value={null}>--</option>
        {dishes.map((dish) => (
          <option
            key={dish.id}
            value={dish.id}
            data-testid={`existingDish-${dish.id}`}
          >
            {dish.name}
          </option>
        ))}
      </Form.Select>
      <ErrorMessageIfExist errorMessage={errors.dishId?.message} />
    </FormFieldWrapperWithLabel>
  );
};
