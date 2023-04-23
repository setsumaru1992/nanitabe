import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { parseISO } from 'date-fns';
import MealForm, { CHOOSING_DISH_TYPE, useChoosingDishType } from '../MealForm';
import { MealForCalender } from '../../../lib/graphql/generated/graphql';
import useMeal from '../../../features/meal/useMeal';

type Props = {
  meal: MealForCalender;
  onEditSucceeded?: () => void;
  onSchemaError?: any;
};

export default (props: Props) => {
  const { meal, onEditSucceeded, onSchemaError } = props;

  const {
    updateMealWithNewDishAndNewSource,
    // AddMealWithNewDishAndNewSourceSchema,

    updateMealWithExistingDish,
    // AddMealWithExistingDishSchema,
  } = useMeal();

  const {
    choosingDishType,
    setChoosingDishType,
    choosingRegisterNewDish,
    choosingUseExistingDish,
  } = useChoosingDishType(CHOOSING_DISH_TYPE.CHOOSING_USE_EXISTING_DISH);

  const [updateMealFunc, UpdateMealSchema] = (() => {
    if (choosingRegisterNewDish) {
      return [
        updateMealWithNewDishAndNewSource,
        null, // UpdateMealWithNewDishAndNewSourceSchema,
      ];
    }
    if (choosingUseExistingDish) {
      return [updateMealWithExistingDish, null]; // UpdateMealWithExistingDishSchema];
    }
    return [null, null];
  })();

  const onSubmit: SubmitHandler<any> = async (input) => {
    await updateMealFunc(input, {
      onComplated: (data) => {
        if (onEditSucceeded) onEditSucceeded();
      },
    });
  };

  return (
    <MealForm
      formSchema={null}
      onSubmit={onSubmit}
      defaultDate={parseISO(meal.date)}
      registeredMealType={meal.mealType}
      registeredDishId={meal.dish.id}
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
