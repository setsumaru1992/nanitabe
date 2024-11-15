import classnames from 'classnames';
import Link from 'next/link';
import React from 'react';
import style from '../../WeekCalender/index.module.scss';
import useFloatModal from '../../../common/modal/useFloatModal';

export const Index = (props: { useAssignDishModeResult: any }) => {
  const { useAssignDishModeResult } = props;

  const { FloatModal, FloatModalOpener, closeModal } = useFloatModal({
    followRightEdge: true,
  });

  return (
    <>
      <FloatModalOpener>
        <div className={style['mark__wrapper']}>
          <div
            className={classnames(
              'fa-solid fa-bars',
              style['mark'],
              style['mark-to-click'],
            )}
            data-testid="calenderMenu"
          />
        </div>
      </FloatModalOpener>
      <FloatModal>
        <ul className={classnames(style['week-calender-header-float-menu'])}>
          <li
            className={classnames(
              style['week-calender-header-float-menu__row'],
            )}
          >
            <a
              className={classnames(
                style['week-calender-header-float-menu__content'],
              )}
              onClick={() => {
                closeModal();
                useAssignDishModeResult.startAssigningDishMode();
              }}
              data-testid="calenderMenu-assignDish"
            >
              食事割当て
            </a>
          </li>
          <li
            className={classnames(
              style['week-calender-header-float-menu__row'],
            )}
          >
            <Link
              href={{
                pathname: '/calender/week/thisweek',
              }}
              className={classnames(
                style['week-calender-header-float-menu__content'],
              )}
            >
              今週に移動
            </Link>
          </li>
        </ul>
      </FloatModal>
    </>
  );
};
