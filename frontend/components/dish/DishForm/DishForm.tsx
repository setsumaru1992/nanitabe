import React from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { zodResolver } from '@hookform/resolvers/zod';
import FormFieldWrapperWithLabel from '../../common/form/FormFieldWrapperWithLabel';
import ErrorMessageIfExist from '../../common/form/ErrorMessageIfExist';
import {
  MEAL_POSITION,
  MEAL_POSITION_LABELS,
  MEAL_POSITIONS,
} from '../../../features/dish/const';
import { Dish } from '../../../lib/graphql/generated/graphql';

type DishFormContentProps = {
  registeredDish?: Dish;
};

export const DishFormContent = (props: DishFormContentProps) => {
  const { registeredDish } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {registeredDish?.id && (
        <input
          type="hidden"
          value={registeredDish.id}
          {...register('dish.id', { valueAsNumber: true })}
        />
      )}
      <FormFieldWrapperWithLabel label="料理名" required>
        <Form.Control
          type="text"
          {...register('dish.name')}
          defaultValue={registeredDish?.name}
          data-testid="dishname"
        />
        <ErrorMessageIfExist errorMessage={errors.dish?.name?.message} />
      </FormFieldWrapperWithLabel>
      <FormFieldWrapperWithLabel label="位置づけ">
        <Form.Select
          defaultValue={registeredDish?.mealPosition || MEAL_POSITION.MAIN_DISH}
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

type Props = {
  formSchema: any;
  onSubmit: any;
  children?: React.ReactNode;

  registeredDish?: Dish;

  onSchemaError?: any;
};

export default (props: Props) => {
  const { formSchema, onSubmit, registeredDish, onSchemaError, children } =
    props;

  const methods = useForm({ resolver: zodResolver(formSchema) });
  const { handleSubmit } = methods;

  const onError = (schemaErrors, _) => {
    if (onSchemaError) onSchemaError(schemaErrors);
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <DishFormContent registeredDish={registeredDish} />
        {children}
        <Form.Group>
          <Button type="submit" data-testid="submitDishButton">
            登録
          </Button>
        </Form.Group>
      </Form>
    </FormProvider>
  );
};
