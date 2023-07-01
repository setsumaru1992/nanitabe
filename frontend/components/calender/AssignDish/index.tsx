import React, { useEffect, useState } from 'react';
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
  const arrayOfUseStateResultOfSelectedDish = useState(null);
  const arrayOfUseStateResultOfSelectedMealType = useState(null);

  return (
    <div className={style.container}>
      {isChoosingDishMode && (
        <ChooseDish
          useAssignDishModeResult={useAssignDishModeResult}
          arrayOfUseStateResultOfSelectedDish={
            arrayOfUseStateResultOfSelectedDish
          }
          arrayOfUseStateResultOfSelectedMealType={
            arrayOfUseStateResultOfSelectedMealType
          }
        />
      )}

      {isAssigningSelectedDishMode && <AssignChoosenDishForDate />}
    </div>
  );
};
