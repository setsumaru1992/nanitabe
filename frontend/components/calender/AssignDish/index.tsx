import React, { useEffect, useState } from 'react';
import style from './AssignDish.module.scss';
import ChooseDish from './ChooseDish';

export default () => {
  const arrayOfUseStateResultOfSelectedDish = useState(null);
  const arrayOfUseStateResultOfSelectedMealType = useState(null);

  return (
    <div className={style.container}>
      <ChooseDish
        arrayOfUseStateResultOfSelectedDish={
          arrayOfUseStateResultOfSelectedDish
        }
        arrayOfUseStateResultOfSelectedMealType={
          arrayOfUseStateResultOfSelectedMealType
        }
      />
    </div>
  );
};
