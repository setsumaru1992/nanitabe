import React from 'react';
import classnames from 'classnames';
import { getDate } from 'date-fns';
import style from '../WeekCalender/index.module.scss'; // TODO: 独立した形で作る
import menuStyle from './MealIcon/Menu.module.scss'; // TODO: 独立した形で作る
import useFloatModal from '../../common/modal/useFloatModal';

type Props = {
  date: Date;
  dayOfWeekLabel: string;
  canAnythingExceptDisplay: boolean;
  startSwappingMealsMode: any;
};

export default (props: Props) => {
  const {
    date,
    dayOfWeekLabel,
    canAnythingExceptDisplay,
    startSwappingMealsMode,
  } = props;
  const { FloatModal, FloatModalOpener, closeModal } = useFloatModal();

  const dateNumber = getDate(date);

  const DateDisplay = () => (
    <div className={style['date']}>
      <span className={style['date__date-number']}>{dateNumber}</span>
      <span className={style['date__day-of-week']}>{dayOfWeekLabel}</span>
    </div>
  );
  return (
    <>
      {canAnythingExceptDisplay ? (
        <FloatModalOpener>
          <DateDisplay />
        </FloatModalOpener>
      ) : (
        <DateDisplay />
      )}
      <FloatModal>
        <ul className={classnames(menuStyle['menu'])}>
          <li className={classnames(menuStyle['menu__row'])}>
            <a
              className={classnames(menuStyle['menu__content'])}
              onClick={() => {
                closeModal();
                startSwappingMealsMode(date);
              }}
              data-testid="mealMoveButton"
            >
              他の日と食事交換
            </a>
          </li>
        </ul>
      </FloatModal>
    </>
  );
};
