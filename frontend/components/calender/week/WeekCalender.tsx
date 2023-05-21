import React from 'react';
import { addDays, format, getDate, isSameDay } from 'date-fns';
import style from './WeekCalender.module.scss';
import CalenderMealIcon from '../../meal/CalenderMealIcon';
import AddMealIcon from '../../meal/CalenderMealIcon/AddMealIcon';
import useMeal from '../../../features/meal/useMeal';
import { useFirstDisplayDate } from './useCalenderDate';

export { useDateFormatStringInUrl } from './useCalenderDate';

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

export default (props: Props) => {
  const { date: dateArg } = props;
  const {
    firstDisplayDate,
    updateFirstDateToPreviousWeekFirstDate,
    updateFirstDateToNextWeekFirstDate,
  } = useFirstDisplayDate(dateArg || new Date());

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
        onClick={() => {
          updateFirstDateToPreviousWeekFirstDate();
        }}
      >
        ▲
      </div>
      <table>
        <tbody>
          {Object.keys(DAYS_OF_WEEK).map((dayNumStr) => {
            const date = addDays(firstDisplayDate, Number(dayNumStr));
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
        onClick={() => {
          updateFirstDateToNextWeekFirstDate();
        }}
      >
        ▼
      </div>
    </>
  );
};
