import React from 'react';
import classnames from 'classnames';
import style from './AssignDish.module.scss';

type ExistingDishIconProps = {
  dish: any;
};

const ExistingDishIcon = (props: ExistingDishIconProps) => {
  const { dish } = props;
  return (
    <div
      className={classnames(
        style['icon'],
        style['assign-dish-for-date-dish-icon'],
      )}
      data-testid={`existingDish-${dish.id}`}
    >
      {dish.name}
    </div>
  );
};

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
      <div className={style['assign-dish-header']}>
        <div className={style['assign-dish-header-title__container']}>
          食事を登録したい日を選んでください
          <ExistingDishIcon dish={selectedDish} />
        </div>

        <div className={style['assign-dish-header-menu__container']}>
          <div className={style['mark__wrapper']}>
            <div
              className={classnames(
                'fa-solid fa-angle-up',
                style['mark'],
                style['mark-to-click'],
              )}
              onClick={() => {
                changeCalenderModeToChoosingDishMode();
              }}
            />
          </div>
          <div className={style['mark__wrapper']}>
            <div
              className={classnames(
                'fa fa-xmark',
                style['mark'],
                style['mark-to-click'],
              )}
              onClick={() => {
                changeCalenderModeToDisplayCalenderMode();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
