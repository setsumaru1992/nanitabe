import { useState } from 'react';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import useAssignDishMode, {
  AssigningDishMode,
} from '../AssignDish/useAssignDishMode';
import useMoveDishMode, { MovingDishMode } from '../MoveDish/useMoveDishMode';
import { weekCalenderPageUrlOf } from '../../../pages/calender/week/[date]';

export const DISPLAY_CALENDER_MODE = 'DISPLAY_CALENDER_MODE';

export type CalenderMode =
  | typeof DISPLAY_CALENDER_MODE
  | AssigningDishMode
  | MovingDishMode;

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
  };

  const requireDisplayingBottomBar =
    useAssignDishModeResult.inAssigningDishMode ||
    useMoveDishModeResult.isMovingDishMode;

  return {
    isDisplayCalenderMode,
    isNotDisplayCalenderMode,
    calenderModeChangers,
    useAssignDishModeResult,
    useMoveDishModeResult,
    requireDisplayingBottomBar,
  };
};

// 以下、カレンダーモードで流用されるものを定義

export const useBackToWeekOfModeStarted = () => {
  const router = useRouter();
  const currentPath = usePathname();

  const backToWeekOfModeStarted = (dateOfStartMode: date) => {
    const pathOfWeekOfModeStarted = weekCalenderPageUrlOf(dateOfStartMode);
    if (pathOfWeekOfModeStarted !== currentPath) {
      router.push(pathOfWeekOfModeStarted);
    }
  };

  return { backToWeekOfModeStarted };
};
