import React from 'react';
import classnames from 'classnames';
import style from '../MoveDish/MoveDish.module.scss'; // TODO: 独自に作るか、共通化

type Props = {
  useSwapMealsModeResult: any;
};

export default (props: Props) => {
  const { useSwapMealsModeResult } = props;
  const {
    changeCalenderModeToDisplayCalenderMode,
    backToWeekOfBeforeMoveMeal,
  } = useSwapMealsModeResult;
  return (
    <div>
      <div className={style['move-dish-header']}>
        <div className={style['move-dish-header-title__container']}>
          交換したい先の日付を選んでください
        </div>

        <div className={style['move-dish-header-menu__container']}>
          <div className={style['mark__wrapper']}>
            <div
              className={classnames(
                'fa fa-xmark',
                style['mark'],
                style['mark-to-click'],
              )}
              onClick={() => {
                backToWeekOfBeforeMoveMeal();
                changeCalenderModeToDisplayCalenderMode();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
