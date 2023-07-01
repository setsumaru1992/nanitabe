import { useState } from 'react';
import useAssignDishMode, {
  AssigningDishMode,
  ASSIGNING_DISH_MODES,
} from '../AssignDish/useAssignDishMode';

export const DISPLAY_CALENDER_MODE = 'DISPLAY_CALENDER_MODE';

export type CalenderMode = typeof DISPLAY_CALENDER_MODE | AssigningDishMode;

export default () => {
  // const [calenderMode, setCalenderMode] = useState(DISPLAY_CALENDER_MODE);
  // デバッグ中のみ
  const [calenderMode, setCalenderMode] = useState(
    ASSIGNING_DISH_MODES.CHOOSING_DISH_MODE,
  );
  const updateCalenderMode = (mode: CalenderMode) => {
    setCalenderMode(mode);
  };
  const changeCalenderModeToDisplayCalenderMode = () => {
    updateCalenderMode(DISPLAY_CALENDER_MODE);
  };

  const useAssignDishModeResult = useAssignDishMode({
    calenderMode,
    updateCalenderMode,
    changeCalenderModeToDisplayCalenderMode,
  });

  return {
    calenderMode,
    useAssignDishModeResult,
  };
};
