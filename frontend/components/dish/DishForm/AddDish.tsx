import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import DishForm from './DishForm';
import useDish from '../../../features/dish/useDish';
import type { AddDish } from '../../../features/dish/useDish';

type Props = {
  onAddSucceeded?: () => void;
  onSchemaError?: any;
};

export default (props: Props) => {
  const { onAddSucceeded, onSchemaError } = props;

  const { addDish, AddDishSchema } = useDish();
  const onSubmit: SubmitHandler<AddDish> = async (input) => {
    await addDish(input, {
      onCompleted: (_) => {
        if (onAddSucceeded) onAddSucceeded();
      },
    });
  };

  return (
    <DishForm
      formSchema={AddDishSchema}
      onSubmit={onSubmit}
      onSchemaError={onSchemaError}
    />
  );
};
