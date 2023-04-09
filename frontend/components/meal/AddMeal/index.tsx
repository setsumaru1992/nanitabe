import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import useMeal from '../../../features/meal/useMeal';
import type {
  AddMealWithNewDishAndNewSource,
  AddMealWithExistingDishAndExistingSource,
} from '../../../features/meal/useMeal';
import MealForm, { CHOOSING_DISH_TYPE } from '../MealForm';

type Props = {
  defaultDate?: Date;
  onAddSucceeded?: () => void;
  displayInModal?: boolean;
  onSubmitErrorOfSchema?: any;
};

export default (props: Props) => {
  const {
    defaultDate: defaultDateArg,
    onAddSucceeded,
    displayInModal,
    onSubmitErrorOfSchema,
  } = props;
  const defaultDate: Date = defaultDateArg || new Date();

  const [choosingDishType, setChoosingDishType] = React.useState(
    CHOOSING_DISH_TYPE.CHOOSING_REGISTER_NEW_DISH,
  );
  const {
    addMealWithNewDishAndNewSource,
    AddMealWithNewDishAndNewSourceSchema,

    addMealWithExistingDishAndExistingSource,
    AddMealWithExistingDishAndExistingSourceSchema,
  } = useMeal();

  const choosingRegisterNewDish =
    choosingDishType === CHOOSING_DISH_TYPE.CHOOSING_REGISTER_NEW_DISH;
  const choosingUseExistingDish =
    choosingDishType === CHOOSING_DISH_TYPE.CHOOSING_USE_EXISTING_DISH;

  const [addMealFunc, AddMealSchema] = (() => {
    if (choosingRegisterNewDish) {
      return [
        addMealWithNewDishAndNewSource,
        AddMealWithNewDishAndNewSourceSchema,
      ];
    }
    if (choosingUseExistingDish) {
      return [
        addMealWithExistingDishAndExistingSource,
        AddMealWithExistingDishAndExistingSourceSchema,
      ];
    }
    return [null, null];
  })();

  const onSubmit: SubmitHandler<
    AddMealWithNewDishAndNewSource | AddMealWithExistingDishAndExistingSource
  > = async (input) => {
    await addMealFunc(input, {
      onComplated: (data) => {
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
      choosingDishType={choosingDishType}
      setChoosingDishType={setChoosingDishType}
      displayInModal={displayInModal}
      onSubmitErrorOfSchema={onSubmitErrorOfSchema}
    />
  );
};
