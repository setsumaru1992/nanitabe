import React from 'react';
import style from './AssignDish.module.scss';
import ExistingDishIconForSelect from '../../meal/ExistingDishIconForSelect';

type Props = {
  useAssignDishModeResult: any;
};

export default (props: Props) => {
  const { useAssignDishModeResult } = props;
  const {
    changeCalenderModeToDisplayCalenderMode,
    changeCalenderModeToChoosingDishMode,
    selectedDish,
  } = useAssignDishModeResult;

  return (
    <div>
      この食事を割り当てる日を選んでください:
      <ExistingDishIconForSelect dish={selectedDish} />
      <span
        onClick={() => {
          changeCalenderModeToChoosingDishMode();
        }}
      >
        ^
      </span>
      <span
        onClick={() => {
          changeCalenderModeToDisplayCalenderMode();
        }}
      >
        ✗
      </span>
    </div>
  );
};
