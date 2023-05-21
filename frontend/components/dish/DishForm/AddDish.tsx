import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import DishForm from './DishForm';
import useDish, { AddDishFunc } from '../../../features/dish/useDish';
import type { AddDish } from '../../../features/dish/useDish';
import {
  CHOOSING_PUT_DISH_SOURCE_TYPE,
  useChoosingPutDishSourceType,
} from './DishForm/useChoosingPutDishSourceType';

type Props = {
  onAddSucceeded?: () => void;
  onSchemaError?: any;
};

export default (props: Props) => {
  const { onAddSucceeded, onSchemaError } = props;

  const {
    addDish,
    AddDishSchema,
    addDishWithNewSource,
    AddDishWithNewSourceSchema,
  } = useDish();

  const useChoosingPutDishSourceTypeResult = useChoosingPutDishSourceType(
    CHOOSING_PUT_DISH_SOURCE_TYPE.CHOOSING_USE_EXISTING_DISH_SOURCE,
  );
  const { choosingRegisterNewDishSource, choosingUseExistingDishSource } =
    useChoosingPutDishSourceTypeResult;

  const {
    addDishFunc,
    addDishSchema,
  }: { addDishFunc: AddDishFunc; addDishSchema: any } = (() => {
    if (choosingRegisterNewDishSource) {
      return {
        addDishFunc: addDishWithNewSource,
        addDishSchema: AddDishWithNewSourceSchema,
      };
    }
    if (choosingUseExistingDishSource) {
      return {
        addDishFunc: addDish,
        addDishSchema: AddDishSchema,
      };
    }
  })();

  const onSubmit: SubmitHandler<AddDish> = async (input) => {
    await addDishFunc(input, {
      onCompleted: (_) => {
        if (onAddSucceeded) onAddSucceeded();
      },
    });
  };

  return (
    <DishForm
      formSchema={addDishSchema}
      onSubmit={onSubmit}
      onSchemaError={onSchemaError}
      useChoosingPutDishSourceTypeResult={useChoosingPutDishSourceTypeResult}
    />
  );
};
