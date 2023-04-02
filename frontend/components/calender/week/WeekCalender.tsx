import React from 'react';
import { addDays, getDate } from 'date-fns';
import style from './WeekCalender.module.scss';
import Icon from '../../meal/meal/Icon';
import AddMealIcon from '../../meal/addMeal/AddMealIcon';
import useMeal from '../../../features/meal/useMeal';

const DAYS_OF_WEEK = {
  0: { label: '月' },
  1: { label: '火' },
  2: { label: '水' },
  3: { label: '木' },
  4: { label: '金' },
  5: { label: '土' },
  6: { label: '日' },
};

export default (props) => {
  const firstDate = new Date(2023, 2, 20);
  const {
    mealsForCalender,
    fetchMealsForCalenderLoading,
    refetchMealsForCalender,
  } = useMeal({ startDateForFetchingMealsForCalender: firstDate });

  return (
    <>
      <div className={style['week-calender-header']}>2023年2月 ▼</div>
      <table>
        <tbody>
          <tr>
            <th>
              <div className={style['date']}>
                20
                <span className={style['date__day-of-week']}>mon</span>
              </div>
            </th>
            <td className={style['dish-container']}>
              <Icon />{' '}
              <AddMealIcon
                dateForAdd={new Date(2023, 2 - 1, 20)}
                onAddSucceeded={() => {
                  // TODO: カレンダーリフレッシュ
                }}
              />
            </td>
          </tr>
          {/* {[21, 22, 23, 24, 25, 26].map((date) => { */}
          {Object.keys(DAYS_OF_WEEK).map((dayNumStr) => {
            const date = addDays(firstDate, Number(dayNumStr));
            const dateNumber = getDate(date);
            const meals = [];

            return (
              <tr key={dateNumber}>
                <th>
                  <div className={style['date']}>
                    {dateNumber}
                    <span className={style['date__day-of-week']}>mon</span>
                  </div>
                </th>
                <td className={style['dish-container']}>
                  {meals.map((meal) => (
                    <>
                      <Icon />{' '}
                    </>
                  ))}
                  <AddMealIcon
                    dateForAdd={date}
                    onAddSucceeded={() => {
                      // TODO: カレンダーリフレッシュ
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
