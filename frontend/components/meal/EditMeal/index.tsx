import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { parseISO } from 'date-fns';
import MealForm, { CHOOSING_DISH_TYPE, useChoosingDishType } from '../MealForm';
import { MealForCalender } from '../../../lib/graphql/generated/graphql';

type Props = {
  meal: MealForCalender;
  onEditSucceeded?: () => void;
  onSchemaError?: any;
};

export default (props: Props) => {
  const { meal, onEditSucceeded, onSchemaError } = props;

  const {
    choosingDishType,
    setChoosingDishType,
    choosingRegisterNewDish,
    choosingUseExistingDish,
  } = useChoosingDishType(CHOOSING_DISH_TYPE.CHOOSING_USE_EXISTING_DISH);

  const onSubmit: SubmitHandler<any> = async (input) => {};

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
