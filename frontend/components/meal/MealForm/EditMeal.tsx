import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { parseISO } from 'date-fns';
import MealForm, { CHOOSING_DISH_TYPE, useChoosingDishType } from './MealForm';
import { MealForCalender } from '../../../lib/graphql/generated/graphql';
import useMeal, { UpdateMealInput } from '../../../features/meal/useMeal';
import {
  CHOOSING_PUT_DISH_SOURCE_TYPE,
  useChoosingPutDishSourceType,
} from '../../dish/DishForm/DishForm';

type Props = {
  meal: MealForCalender;
  onEditSucceeded?: () => void;
  onSchemaError?: any;
};

export default (props: Props) => {
  const { meal, onEditSucceeded, onSchemaError } = props;

  const {
    updateMealWithNewDishAndNewSource,
    UpdateMealWithNewDishAndNewSourceSchema,
    convertFromUpdateMealWithNewDishInputToGraphqlInput,

    updateMeal,
    UpdateMealSchema,
  } = useMeal();

  const {
    choosingDishType,
    setChoosingDishType,
    choosingRegisterNewDish,
    choosingUseExistingDish,
  } = useChoosingDishType(CHOOSING_DISH_TYPE.CHOOSING_USE_EXISTING_DISH);

  const useChoosingPutDishSourceTypeResult = useChoosingPutDishSourceType(
    CHOOSING_PUT_DISH_SOURCE_TYPE.CHOOSING_USE_EXISTING_DISH_SOURCE,
  );
  const { choosingRegisterNewDishSource, choosingUseExistingDishSource } =
    useChoosingPutDishSourceTypeResult;

  const [updateMealFunc, updateMealSchema] = (() => {
    if (choosingRegisterNewDish) {
      return [
        updateMealWithNewDishAndNewSource,
        UpdateMealWithNewDishAndNewSourceSchema,
      ];
    }
    if (choosingUseExistingDish) {
      return [updateMeal, UpdateMealSchema];
    }
    return [null, null];
  })();

  const onSubmit: SubmitHandler<UpdateMealInput> = async (input) => {
    await updateMealFunc(input, {
      onCompleted: (data) => {
        if (onEditSucceeded) onEditSucceeded();
      },
    });
  };

  return (
    <MealForm
      formSchema={updateMealSchema}
      onSubmit={onSubmit}
      defaultDate={parseISO(meal.date)}
      registeredMealId={meal.id}
      registeredMealType={meal.mealType}
      registeredDishId={meal.dish.id}
      useChoosingDishTypeResult={{
        choosingDishType,
        setChoosingDishType,
        choosingRegisterNewDish,
        choosingUseExistingDish,
      }}
      useChoosingPutDishSourceTypeResult={useChoosingPutDishSourceTypeResult}
      onSchemaError={onSchemaError}
    />
  );
};
