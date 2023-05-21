import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dish } from '../../../../lib/graphql/generated/graphql';
import { DishFormOfOnlyDishFields } from './DishFormOfOnlyDishFields';
import { UseChoosingPutDishSourceTypeResult } from './useChoosingPutDishSourceType';
import { DishFormOfRelatedDishSource } from './DishFormOfRelatedDishSource';

type DishFormContentProps = {
  registeredDish?: Dish;
  useChoosingPutDishSourceTypeResult: UseChoosingPutDishSourceTypeResult;
};

export const DishFormContent = (props: DishFormContentProps) => {
  const { registeredDish, useChoosingPutDishSourceTypeResult } = props;

  return (
    <>
      <DishFormOfOnlyDishFields registeredDish={registeredDish} />
      <DishFormOfRelatedDishSource
        registeredDish={registeredDish}
        useChoosingPutDishSourceTypeResult={useChoosingPutDishSourceTypeResult}
      />
    </>
  );
};

type Props = {
  formSchema: any;
  onSubmit: any;
  children?: React.ReactNode;

  registeredDish?: Dish;

  useChoosingPutDishSourceTypeResult: UseChoosingPutDishSourceTypeResult;

  onSchemaError?: any;
};

export default (props: Props) => {
  const {
    formSchema,
    onSubmit,
    registeredDish,
    onSchemaError,
    children,
    useChoosingPutDishSourceTypeResult,
  } = props;

  const methods = useForm({ resolver: zodResolver(formSchema) });
  const { handleSubmit } = methods;

  const onError = (schemaErrors, _) => {
    if (onSchemaError) onSchemaError(schemaErrors);
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <DishFormContent
          registeredDish={registeredDish}
          useChoosingPutDishSourceTypeResult={
            useChoosingPutDishSourceTypeResult
          }
        />
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
