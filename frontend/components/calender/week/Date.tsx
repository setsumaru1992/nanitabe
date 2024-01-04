import React from 'react';
import classnames from 'classnames';
import style from './WeekCalender.module.scss'; // TODO: 独立した形で作る
import menuStyle from './MealIcon/Menu.module.scss';
import useFloatModal from '../../common/modal/useFloatModal'; // TODO: 独立した形で作る

type Props = {
  dateNumber: number;
  dayOfWeekLabel: string;
  canAnythingExceptDisplay: boolean;
};

export default (props: Props) => {
  const { dateNumber, dayOfWeekLabel, canAnythingExceptDisplay } = props;
  const { FloatModal, FloatModalOpener, closeModal } = useFloatModal();

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
                // startMovingDishMode(meal);
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
