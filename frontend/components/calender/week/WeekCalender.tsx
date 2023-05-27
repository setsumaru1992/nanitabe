import React from 'react';
import { addDays, format, getDate, isSameDay } from 'date-fns';
import style from './WeekCalender.module.scss';
import CalenderMealIcon from './MealIcon';
import AddMealIcon from './MealIcon/AddMealIcon';
import useMeal from '../../../features/meal/useMeal';
import {
  START_FROM_SAT,
  START_FROM_SUN,
  useCalenderDayOfWeek,
  useFirstDisplayDate,
} from './useCalenderDate';

export { useDateFormatStringInUrl } from './useCalenderDate';

type Props = {
  date?: Date;
};

export default (props: Props) => {
  const { date: dateArg } = props;

  // TODO: 自分以外も使うようになったらユーザ設定で選べるようにする
  const { daysOfWeek, getWeekStartDateFrom } =
    useCalenderDayOfWeek(START_FROM_SAT);
  const {
    firstDisplayDate,
    updateFirstDateToPreviousWeekFirstDate,
    updateFirstDateToNextWeekFirstDate,
  } = useFirstDisplayDate(dateArg || new Date(), getWeekStartDateFrom);

  const { mealsForCalender, fetchMealsLoading, refetchMealsForCalender } =
    useMeal({
      fetchMealsParams: {
        fetchMealsForCalenderParams: {
          requireFetchedData: true,
          startDate: firstDisplayDate,
        },
      },
    });

  if (fetchMealsLoading) return <>Loading...</>;
  return (
    <>
      <div className={style['week-calender-header']}>
        {format(firstDisplayDate, 'yyyy年M月')} ▼
      </div>
      <div
        className={style['move-date-button']}
        onClick={() => {
          updateFirstDateToPreviousWeekFirstDate();
        }}
      >
        ▲
      </div>
      <table>
        <tbody>
          {daysOfWeek.map((day, dayIndex) => {
            const date = addDays(firstDisplayDate, Number(dayIndex));
            const dateNumber = getDate(date);
            const meals =
              mealsForCalender?.find((mealForCalender) => {
                return isSameDay(new Date(mealForCalender.date), date);
              })?.meals || [];

            return (
              <tr key={dateNumber}>
                <th>
                  <div className={style['date']}>
                    <span className={style['date__date-number']}>
                      {dateNumber}
                    </span>
                    <span className={style['date__day-of-week']}>
                      {day.label}
                    </span>
                  </div>
                </th>
                <td className={style['dish-container']}>
                  {meals?.map((meal) => (
                    <React.Fragment key={meal.id}>
                      <CalenderMealIcon
                        meal={meal}
                        onChanged={() => {
                          refetchMealsForCalender();
                        }}
                      />{' '}
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
      <div
        className={style['move-date-button']}
        onClick={() => {
          updateFirstDateToNextWeekFirstDate();
        }}
      >
        ▼
      </div>
    </>
  );
};
