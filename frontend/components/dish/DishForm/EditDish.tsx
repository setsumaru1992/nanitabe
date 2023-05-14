import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import DishForm, {
  CHOOSING_PUT_DISH_SOURCE_TYPE,
  useChoosingPutDishSourceType,
} from './DishForm';
import { Dish } from '../../../lib/graphql/generated/graphql';
import useDish, {
  UpdateDishInput,
  UpdateDishFunc,
} from '../../../features/dish/useDish';

type Props = {
  dish: Dish;
  onEditSucceeded?: () => void;
  onSchemaError?: any;
};

export default (props: Props) => {
  const { dish, onEditSucceeded, onSchemaError } = props;

  const {
    updateDish,
    convertFromUpdateDishInputToGraphqlInput,
    UpdateDishSchema,
    updateDishWithNewSource,
    convertFromUpdateDishWithNewSourceInputToGraphqlInput,
    UpdateDishWithNewSourceSchema,
  } = useDish();

  const useChoosingPutDishSourceTypeResult = useChoosingPutDishSourceType(
    CHOOSING_PUT_DISH_SOURCE_TYPE.CHOOSING_USE_EXISTING_DISH_SOURCE,
  );

  const { choosingRegisterNewDishSource, choosingUseExistingDishSource } =
    useChoosingPutDishSourceTypeResult;

  const {
    updateDishFunc,
    updateDishSchema,
  }: { updateDishFunc: UpdateDishFunc; updateDishSchema: any } = (() => {
    const [updateDishFunc, convertToGraphqlInput, updateDishSchema] = (() => {
      if (choosingUseExistingDishSource) {
        return [
          updateDish,
          convertFromUpdateDishInputToGraphqlInput,
          UpdateDishSchema,
        ];
      }
      if (choosingRegisterNewDishSource) {
        return [
          updateDishWithNewSource,
          convertFromUpdateDishWithNewSourceInputToGraphqlInput,
          UpdateDishWithNewSourceSchema,
        ];
      }
      return [null, null, null];
    })();
    return {
      updateDishFunc: (input, mutationCallbacks) => {
        updateDishFunc(convertToGraphqlInput(input), mutationCallbacks);
      },
      updateDishSchema,
    };
  })();

  const onSubmit: SubmitHandler<UpdateDishInput> = async (input) => {
    await updateDishFunc(input, {
      onCompleted: (_) => {
        if (onEditSucceeded) onEditSucceeded();
      },
    });
  };

  return (
    <DishForm
      formSchema={updateDishSchema}
      onSubmit={onSubmit}
      onSchemaError={onSchemaError}
      registeredDish={dish}
      useChoosingPutDishSourceTypeResult={useChoosingPutDishSourceTypeResult}
    />
  );
};
