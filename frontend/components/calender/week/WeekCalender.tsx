import React from 'react';
import { addDays, isSameDay, getDate } from 'date-fns';
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
  const firstDate = new Date(2023, 2 - 1, 20);
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
          {Object.keys(DAYS_OF_WEEK).map((dayNumStr) => {
            const date = addDays(firstDate, Number(dayNumStr));
            const dateNumber = getDate(date);
            const meals =
              mealsForCalender?.find((mealForCalender) => {
                return isSameDay(new Date(mealForCalender.date), date);
              })?.meals || [];

            return (
              <tr key={dateNumber}>
                <th>
                  <div className={style['date']}>
                    {dateNumber}
                    <span className={style['date__day-of-week']}>
                      {DAYS_OF_WEEK[dayNumStr]['label']}
                    </span>
                  </div>
                </th>
                <td className={style['dish-container']}>
                  {meals?.map((meal) => (
                    <React.Fragment key={meal.id}>
                      <Icon meal={meal} />{' '}
                    </React.Fragment>
                  ))}
                  <AddMealIcon
                    dateForAdd={date}
                    onAddSucceeded={() => {
                      refetchMealsForCalender();
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
