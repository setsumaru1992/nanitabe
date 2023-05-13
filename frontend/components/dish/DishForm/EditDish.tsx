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
    updateDishWithExistingSource,
    convertFromUpdateDishWithExistingSourceInputToGraphqlInput,
    UpdateDishWithExistingSourceSchema,
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
    updateDish,
    updateDishSchema,
  }: { updateDish: UpdateDishFunc; updateDishSchema: any } = (() => {
    const [updateDishFunc, convertToGraphqlInputFunc, updateDishSchema] =
      (() => {
        if (choosingUseExistingDishSource) {
          return [
            updateDishWithExistingSource,
            (input: UpdateDishInput) => {
              return convertFromUpdateDishWithExistingSourceInputToGraphqlInput(
                input,
              );
            },
            UpdateDishWithExistingSourceSchema,
          ];
        }
        if (choosingRegisterNewDishSource) {
          return [
            updateDishWithNewSource,
            (input: UpdateDishInput) => {
              return convertFromUpdateDishWithNewSourceInputToGraphqlInput(
                input,
              );
            },
            UpdateDishWithNewSourceSchema,
          ];
        }
        return [null, null, null];
      })();
    return {
      updateDish: (input, mutationCallbacks) => {
        updateDishFunc(convertToGraphqlInputFunc(input), mutationCallbacks);
      },
      updateDishSchema,
    };
  })();

  const onSubmit: SubmitHandler<UpdateDishInput> = async (input) => {
    await updateDish(input, {
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
