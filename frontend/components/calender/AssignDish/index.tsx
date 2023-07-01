import React, { useState } from 'react';
import style from './AssignDish.module.scss';
import ChooseDish from './ChooseDish';
import AssignChoosenDishForDate from './AssignChoosenDishForDate';

type Props = {
  useAssignDishModeResult: any;
};

export default (props: Props) => {
  const { useAssignDishModeResult } = props;
  const { isChoosingDishMode, isAssigningSelectedDishMode } =
    useAssignDishModeResult;

  return (
    <div className={style.container}>
      {isChoosingDishMode && (
        <ChooseDish useAssignDishModeResult={useAssignDishModeResult} />
      )}

      {isAssigningSelectedDishMode && (
        <AssignChoosenDishForDate
          useAssignDishModeResult={useAssignDishModeResult}
        />
      )}
    </div>
  );
};
