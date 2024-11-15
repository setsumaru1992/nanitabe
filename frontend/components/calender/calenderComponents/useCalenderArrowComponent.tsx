import React from 'react';
import style from './Calender/index.module.scss';

export default (props: {
  updateFirstDateToPreviousWeekFirstDate: any;
  updateFirstDateToNextWeekFirstDate: any;
}) => {
  const {
    updateFirstDateToPreviousWeekFirstDate,
    updateFirstDateToNextWeekFirstDate,
  } = props;

  const PreviousWeekDisplayButton = () => {
    return (
      <div
        className={style['move-date-button']}
        onClick={() => {
          updateFirstDateToPreviousWeekFirstDate();
        }}
      >
        ▲
      </div>
    );
  };

  const NextWeekDisplayButton = () => {
    return (
      <div
        className={style['move-date-button']}
        onClick={() => {
          updateFirstDateToNextWeekFirstDate();
        }}
      >
        ▼
      </div>
    );
  };

  return {
    PreviousWeekDisplayButton,
    NextWeekDisplayButton,
  };
};
