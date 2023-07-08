import { useState } from 'react';
import useMeal from '../../../features/meal/useMeal';

export const MOVING_DISH_MODES = {
  MOVING_DISH_MODE: 'MOVING_DISH_MODE',
};
export type MovingDishMode =
  (typeof MOVING_DISH_MODES)[keyof typeof MOVING_DISH_MODES];

export default (args: {
  calenderMode: any;
  updateCalenderMode: any;
  changeCalenderModeToDisplayCalenderMode: any;
  onDataChanged?: any;
}) => {
  const {
    calenderMode,
    updateCalenderMode,
    changeCalenderModeToDisplayCalenderMode,
    onDataChanged,
  } = args;
};
