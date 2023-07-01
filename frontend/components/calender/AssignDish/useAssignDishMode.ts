import { useState } from 'react';
import useMeal from '../../../features/meal/useMeal';

export const ASSIGNING_DISH_MODES = {
  CHOOSING_DISH_MODE: 'CHOOSING_DISH_MODE',
  ASSIGNING_SELECTED_DISH_MODE: 'ASSIGNING_SELECTED_DISH_MODE',
};
export type AssigningDishMode =
  (typeof ASSIGNING_DISH_MODES)[keyof typeof ASSIGNING_DISH_MODES];

const useOnlyAssigningDishMode = (args: {
  calenderMode: any;
  updateCalenderMode: any;
  changeCalenderModeToDisplayCalenderMode: any;
  initializeAssignDishValues: any;
}) => {
  const {
    calenderMode,
    updateCalenderMode,
    changeCalenderModeToDisplayCalenderMode,
    initializeAssignDishValues,
  } = args;
  const inAssigningDishMode = Object.keys(ASSIGNING_DISH_MODES).some(
    (assigningDishMode) => calenderMode === assigningDishMode,
  );

  const isChoosingDishMode =
    calenderMode === ASSIGNING_DISH_MODES.CHOOSING_DISH_MODE;
  const changeCalenderModeToChoosingDishMode = () => {
    updateCalenderMode(ASSIGNING_DISH_MODES.CHOOSING_DISH_MODE);
  };
  const startAssigningDishMode = () => {
    initializeAssignDishValues();
    updateCalenderMode(ASSIGNING_DISH_MODES.CHOOSING_DISH_MODE);
  };

  const isAssigningSelectedDishMode =
    calenderMode === ASSIGNING_DISH_MODES.ASSIGNING_SELECTED_DISH_MODE;
  const changeCalenderModeToAssigningSelectedDishMode = () => {
    updateCalenderMode(ASSIGNING_DISH_MODES.ASSIGNING_SELECTED_DISH_MODE);
  };

  return {
    inAssigningDishMode,

    startAssigningDishMode,
    isChoosingDishMode,
    changeCalenderModeToChoosingDishMode,

    isAssigningSelectedDishMode,
    changeCalenderModeToAssigningSelectedDishMode,

    changeCalenderModeToDisplayCalenderMode,
  };
};

const useValuesAndFuncsForAddMeal = () => {
  const { addMeal } = useMeal();

  const [selectedDish, setSelectedDish] = useState(null);
  const [selectedMealType, setSelectedMealType] = useState(null);

  const onDateClickForAssigningDish = (date: Date) => {
    addMeal({
      dishId: selectedDish!.id,
      meal: {
        date,
        mealType: selectedMealType,
      },
    });
  };

  return {
    onDateClickForAssigningDish,
    selectedDish,
    selectDish: setSelectedDish,
    selectedMealType,
    selectMealType: setSelectedMealType,
  };
};

export default (args: {
  calenderMode: any;
  updateCalenderMode: any;
  changeCalenderModeToDisplayCalenderMode: any;
}) => {
  const useValuesAndFuncsForAddMealResult = useValuesAndFuncsForAddMeal();
  const [searchStringForSearchingExistingDish, updateSearchString] =
    useState('');

  const initializeAssignDishValues = () => {
    const { selectDish, selectMealType } = useValuesAndFuncsForAddMealResult;
    selectDish(null);
    selectMealType(null);
    updateSearchString('');
  };

  const useOnlyAssigningDishModeResult = useOnlyAssigningDishMode({
    ...args,
    initializeAssignDishValues,
  });

  return {
    ...useOnlyAssigningDishModeResult,
    ...useValuesAndFuncsForAddMealResult,
    searchStringForSearchingExistingDish,
    updateSearchString,
  };
};
