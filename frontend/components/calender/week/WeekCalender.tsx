import React from 'react';
import { addDays, isSameDay, getDate, previousSunday, format } from 'date-fns';
import style from './WeekCalender.module.scss';
import CalenderMealIcon from '../../meal/CalenderMealIcon';
import AddMealIcon from '../../meal/CalenderMealIcon/AddMealIcon';
import useMeal from '../../../features/meal/useMeal';

// TODO: ユーザ設定で土曜始まり・日曜始まり・月曜始まりを選べるようにして、それに合わせた体系を使用。とりあえず月曜始まりベースで作成
const DAYS_OF_WEEK = {
  0: { label: '日' },
  1: { label: '月' },
  2: { label: '火' },
  3: { label: '水' },
  4: { label: '木' },
  5: { label: '金' },
  6: { label: '土' },
};

type Props = {
  date?: Date;
};

const getWeekStartDateFrom = (date: Date) => {
  const dayOfWeekNum = date.getDay();
  if (dayOfWeekNum === 0) return date;
  return previousSunday(date);
};

export default (props: Props) => {
  const { date: dateArg } = props;
  const specifiedDate = dateArg || new Date();
  const firstDate = getWeekStartDateFrom(specifiedDate);

  const {
    mealsForCalender,
    fetchMealsForCalenderLoading,
    refetchMealsForCalender,
  } = useMeal({ startDateForFetchingMealsForCalender: firstDate });

  if (fetchMealsForCalenderLoading) return <>Loading...</>;
  return (
    <>
      <div className={style['week-calender-header']}>
        {format(firstDate, 'yyyy年M月')} ▼
      </div>
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
                    <span className={style['date__date-number']}>
                      {dateNumber}
                    </span>
                    <span className={style['date__day-of-week']}>
                      {DAYS_OF_WEEK[String(date.getDay())]['label']}
                    </span>
                  </div>
                </th>
                <td className={style['dish-container']}>
                  {meals?.map((meal) => (
                    <React.Fragment key={meal.id}>
                      <CalenderMealIcon
                        meal={meal}
                        onUpdateSucceeded={() => {
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
    </>
  );
};
