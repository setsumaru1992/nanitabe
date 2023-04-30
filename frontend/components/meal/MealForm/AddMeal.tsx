import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import useMeal from '../../../features/meal/useMeal';
import type {
  AddMealMutationInput,
  AddMealMutationOutput,
} from '../../../features/meal/useMeal';
import MealForm, { CHOOSING_DISH_TYPE, useChoosingDishType } from './MealForm';
import { ExecMutation } from '../../../features/utils/mutationUtils';

type Props = {
  defaultDate?: Date;
  onAddSucceeded?: () => void;
  onSchemaError?: any;
};

export default (props: Props) => {
  const { defaultDate: defaultDateArg, onAddSucceeded, onSchemaError } = props;
  const defaultDate: Date = defaultDateArg || new Date();

  const {
    addMealWithNewDishAndNewSource,
    AddMealWithNewDishAndNewSourceSchema,

    addMealWithExistingDish,
    AddMealWithExistingDishSchema,
  } = useMeal();

  const {
    choosingDishType,
    setChoosingDishType,
    choosingRegisterNewDish,
    choosingUseExistingDish,
  } = useChoosingDishType(CHOOSING_DISH_TYPE.CHOOSING_REGISTER_NEW_DISH);

  const {
    addMealFunc,
    AddMealSchema,
  }: {
    addMealFunc: ExecMutation<AddMealMutationInput, AddMealMutationOutput>;
    AddMealSchema: any;
  } = (() => {
    if (choosingRegisterNewDish) {
      return {
        addMealFunc: addMealWithNewDishAndNewSource,
        AddMealSchema: AddMealWithNewDishAndNewSourceSchema,
      };
    }
    if (choosingUseExistingDish) {
      return {
        addMealFunc: addMealWithExistingDish,
        AddMealSchema: AddMealWithExistingDishSchema,
      };
    }
    return {
      addMealFunc: null,
      AddMealSchema: null,
    };
  })();

  const onSubmit: SubmitHandler<AddMealMutationInput> = async (input) => {
    await addMealFunc(input, {
      onCompleted: (_) => {
        if (onAddSucceeded) onAddSucceeded();
        // コンポーネント内にあるから触れなくなっちゃったけど、必要になったらフォーム内のものを動かせるようにする
        // reset();
      },
      onError: (error) => {},
    });
  };

  return (
    <MealForm
      formSchema={AddMealSchema}
      onSubmit={onSubmit}
      defaultDate={defaultDate}
      useChoosingDishTypeResult={{
        choosingDishType,
        setChoosingDishType,
        choosingRegisterNewDish,
        choosingUseExistingDish,
      }}
      onSchemaError={onSchemaError}
    />
  );
};
