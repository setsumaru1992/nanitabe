import { useState } from 'react';
import useAssignDishMode, {
  AssigningDishMode,
} from '../AssignDish/useAssignDishMode';
import useMoveDishMode, {MovingDishMode} from '../MoveDish/useMoveDishMode';

export const DISPLAY_CALENDER_MODE = 'DISPLAY_CALENDER_MODE';

export type CalenderMode = typeof DISPLAY_CALENDER_MODE | AssigningDishMode | MovingDishMode;

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

  const useMoveDishModeResult = useMoveDishMode({
    calenderMode,
    updateCalenderMode,
    changeCalenderModeToDisplayCalenderMode,
    onDataChanged,
  });

  const calenderModeChangers = {
    startMovingDishMode: useMoveDishModeResult.startMovingDishMode,
  }

  return {
    isDisplayCalenderMode,
    isNotDisplayCalenderMode,
    calenderModeChangers,
    useAssignDishModeResult,
    useMoveDishModeResult,
  };
};
