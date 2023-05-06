import React from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { zodResolver } from '@hookform/resolvers/zod';
import FormFieldWrapperWithLabel from '../../../common/form/FormFieldWrapperWithLabel';
import ErrorMessageIfExist from '../../../common/form/ErrorMessageIfExist';
import {
  DISH_SOURCE_TYPE,
  DISH_SOURCE_TYPE_LABELS,
  DISH_SOURCE_TYPES,
} from '../../../../features/dish/source/const';
import { MEAL_POSITION } from '../../../../features/dish/const';

type Props = {
  formSchema: any;
  onSubmit: any;

  // registeredDishSource?: DishSourceHoge;

  onSchemaError?: any;
};

export const DishSourceFormContent = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      {/* <div className={style['reference-recipe']}> */}
      {/* <span className={style['reference-recipe__title']}> */}
      {/*  参考レシピ */}
      {/* </span> */}
      {/* {registeredDish?.id && ( */}
      {/*  <input */}
      {/*    type="hidden" */}
      {/*    value={registeredDish.id} */}
      {/*    {...register('dish.id', { valueAsNumber: true })} */}
      {/*  /> */}
      {/* )} */}
      <FormFieldWrapperWithLabel label="名前">
        <Form.Control
          type="text"
          {...register('dishSource.name')}
          defaultValue=""
          data-testid="dishSourceName"
        />
        <ErrorMessageIfExist errorMessage={errors.dishSource?.name?.message} />
      </FormFieldWrapperWithLabel>
      <FormFieldWrapperWithLabel label="タイプ">
        <Form.Select
          defaultValue={DISH_SOURCE_TYPE.RECIPE_BOOK}
          {...register('dishSource.type', { valueAsNumber: true })}
          data-testid="dishSourceTypeOption"
        >
          {DISH_SOURCE_TYPES.map((type) => (
            <option
              key={type}
              value={type}
              data-testid={`dishSourceTypeOption-${type}`}
            >
              {DISH_SOURCE_TYPE_LABELS[type]}
            </option>
          ))}
        </Form.Select>
        <ErrorMessageIfExist errorMessage={errors.dishSource?.type?.message} />
      </FormFieldWrapperWithLabel>
    </div>
  );
};

export default (props: Props) => {
  const { formSchema, onSubmit, onSchemaError } = props;

  const methods = useForm({ resolver: zodResolver(formSchema) });
  const { handleSubmit } = methods;

  const onError = (schemaErrors, _) => {
    if (onSchemaError) onSchemaError(schemaErrors);
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <DishSourceFormContent />
        <Form.Group>
          <Button type="submit" data-testid="submitDishSourceButton">
            登録
          </Button>
        </Form.Group>
      </Form>
    </FormProvider>
  );
};
