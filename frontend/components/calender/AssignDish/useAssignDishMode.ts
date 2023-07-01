export const ASSIGNING_DISH_MODES = {
  CHOOSING_DISH_MODE: 'CHOOSING_DISH_MODE',
  ASSIGNING_SELECTED_DISH_MODE: 'ASSIGNING_SELECTED_DISH_MODE',
};
export type AssigningDishMode =
  (typeof ASSIGNING_DISH_MODES)[keyof typeof ASSIGNING_DISH_MODES];

export default (args: {
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

  const isAssigningSelectedDishMode =
    calenderMode === ASSIGNING_DISH_MODES.ASSIGNING_SELECTED_DISH_MODE;
  const changeCalenderModeToAssigningSelectedDishMode = () => {
    updateCalenderMode(ASSIGNING_DISH_MODES.ASSIGNING_SELECTED_DISH_MODE);
  };

  const isChoosingDishMode =
    calenderMode === ASSIGNING_DISH_MODES.CHOOSING_DISH_MODE;
  const changeCalenderModeToChoosingDishMode = () => {
    updateCalenderMode(ASSIGNING_DISH_MODES.CHOOSING_DISH_MODE);
  };

  return {
    inAssigningDishMode,

    isChoosingDishMode,
    changeCalenderModeToChoosingDishMode,

    isAssigningSelectedDishMode,
    changeCalenderModeToAssigningSelectedDishMode,

    changeCalenderModeToDisplayCalenderMode,
  };
};
