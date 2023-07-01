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
}) => {
  const {
    calenderMode,
    updateCalenderMode,
    changeCalenderModeToDisplayCalenderMode,
  } = args;
  const inAssigningDishMode = Object.keys(ASSIGNING_DISH_MODES).some(
    (assigningDishMode) => calenderMode === assigningDishMode,
  );

  const isChoosingDishMode =
    calenderMode === ASSIGNING_DISH_MODES.CHOOSING_DISH_MODE;
  const changeCalenderModeToChoosingDishMode = () => {
    updateCalenderMode(ASSIGNING_DISH_MODES.CHOOSING_DISH_MODE);
  };
  const startAssigningDishModeGenerator = (initializeAssignDishValues) => {
    return () => {
      initializeAssignDishValues();
      updateCalenderMode(ASSIGNING_DISH_MODES.CHOOSING_DISH_MODE);
    };
  };

  const isAssigningSelectedDishMode =
    calenderMode === ASSIGNING_DISH_MODES.ASSIGNING_SELECTED_DISH_MODE;
  const changeCalenderModeToAssigningSelectedDishMode = () => {
    updateCalenderMode(ASSIGNING_DISH_MODES.ASSIGNING_SELECTED_DISH_MODE);
  };

  return {
    inAssigningDishMode,

    startAssigningDishModeGenerator,
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

  const onDateClickForAssigningDishGenerator = ({ onCompleted }) => {
    return (date: Date) => {
      addMeal(
        {
          dishId: selectedDish!.id,
          meal: {
            date,
            mealType: selectedMealType,
          },
        },
        {
          onCompleted: () => {
            onCompleted();
          },
          onError: (error) => {},
        },
      );
    };
  };

  return {
    onDateClickForAssigningDishGenerator,
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
  onDataChanged: any;
}) => {
  const { onDataChanged } = args;
  const useOnlyAssigningDishModeResult = useOnlyAssigningDishMode(args);
  const useValuesAndFuncsForAddMealResult = useValuesAndFuncsForAddMeal();
  const [searchStringForSearchingExistingDish, updateSearchString] =
    useState('');

  const {
    startAssigningDishModeGenerator,
    changeCalenderModeToDisplayCalenderMode,
  } = useOnlyAssigningDishModeResult;
  const { onDateClickForAssigningDishGenerator, selectDish, selectMealType } =
    useValuesAndFuncsForAddMealResult;

  const initializeAssignDishValues = () => {
    selectDish(null);
    selectMealType(null);
    updateSearchString('');
  };
  const startAssigningDishMode = startAssigningDishModeGenerator(
    initializeAssignDishValues,
  );

  const onDateClickForAssigningDish = onDateClickForAssigningDishGenerator({
    onCompleted: () => {
      onDataChanged();
      changeCalenderModeToDisplayCalenderMode();
    },
  });

  return {
    ...useOnlyAssigningDishModeResult,
    ...useValuesAndFuncsForAddMealResult,

    startAssigningDishMode,
    onDateClickForAssigningDish,

    searchStringForSearchingExistingDish,
    updateSearchString,
  };
};
