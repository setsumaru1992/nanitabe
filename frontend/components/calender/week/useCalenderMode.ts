import { useState } from 'react';
import useAssignDishMode, {
  AssigningDishMode,
  ASSIGNING_DISH_MODES,
} from '../AssignDish/useAssignDishMode';

export const DISPLAY_CALENDER_MODE = 'DISPLAY_CALENDER_MODE';

export type CalenderMode = typeof DISPLAY_CALENDER_MODE | AssigningDishMode;

export default ({ onDataChanged }) => {
  const [calenderMode, setCalenderMode] = useState(DISPLAY_CALENDER_MODE);
  const updateCalenderMode = (mode: CalenderMode) => {
    setCalenderMode(mode);
  };

  const isDisplayCalenderMode = calenderMode === DISPLAY_CALENDER_MODE;
  const isNotDisplayCalenderMode = calenderMode !== DISPLAY_CALENDER_MODE;
  const changeCalenderModeToDisplayCalenderMode = () => {
    updateCalenderMode(DISPLAY_CALENDER_MODE);
  };

  const useAssignDishModeResult = useAssignDishMode({
    calenderMode,
    updateCalenderMode,
    changeCalenderModeToDisplayCalenderMode,
    onDataChanged,
  });

  return {
    isDisplayCalenderMode,
    isNotDisplayCalenderMode,
    useAssignDishModeResult,
  };
};
