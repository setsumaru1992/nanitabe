import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import DishForm, {
  CHOOSING_PUT_DISH_SOURCE_TYPE,
  useChoosingPutDishSourceType,
} from './DishForm';
import useDish from '../../../features/dish/useDish';
import type { AddDish } from '../../../features/dish/useDish';

type Props = {
  onAddSucceeded?: () => void;
  onSchemaError?: any;
};

export default (props: Props) => {
  const { onAddSucceeded, onSchemaError } = props;

  const {
    addDish,
    convertFromAddDishInputToGraphqlInput,
    AddDishSchema,
    addDishWithNewSource,
    convertFromAddDishWithNewSourceInputToGraphqlInput,
    AddDishWithNewSourceSchema,
  } = useDish();

  const useChoosingPutDishSourceTypeResult = useChoosingPutDishSourceType(
    CHOOSING_PUT_DISH_SOURCE_TYPE.CHOOSING_USE_EXISTING_DISH_SOURCE,
  );
  const { choosingRegisterNewDishSource, choosingUseExistingDishSource } =
    useChoosingPutDishSourceTypeResult;

  const onSubmit: SubmitHandler<AddDish> = async (input) => {
    await addDish(convertFromAddDishInputToGraphqlInput(input), {
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
      useChoosingPutDishSourceTypeResult={useChoosingPutDishSourceTypeResult}
    />
  );
};
