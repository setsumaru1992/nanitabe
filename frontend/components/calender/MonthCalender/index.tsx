import React from 'react';
import {
  addDays,
  format,
  isSameDay,
  getDay,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  subDays,
} from 'date-fns';
import { useRouter } from 'next/router';
import Calender from '../calenderComponents/Calender';
import useMeal from '../../../features/meal/useMeal';
import style from '../calenderComponents/Calender/index.module.scss';
import CalenderMenu from '../WeekCalender/CalenderMenu';
import { monthCalenderPageUrlOf } from '../../../pages/calender/month/[date]';

export { useDateFormatStringInUrl } from '../WeekCalender/useWeekCalenderDate';

export type Props = {
  date?: Date;
};

export default (props: Props) => {
  const { date: dateArg } = props;

  const firstDayOfMonth = startOfMonth(dateArg);
  const lastDayOfMonth = endOfMonth(dateArg);

  const { mealsForCalender, fetchMealsLoading, refetchMealsForCalender } =
    useMeal({
      fetchMealsParams: {
        fetchMealsForCalenderParams: {
          requireFetchedData: true,
          startDate: firstDayOfMonth,
          lastDate: lastDayOfMonth,
        },
      },
    });
  const router = useRouter();
  const updateToPreviousMonth = () => {
    router.push(
      monthCalenderPageUrlOf(startOfMonth(subDays(firstDayOfMonth, 1))),
    );
  };
  const updateToNextMonth = () => {
    router.push(monthCalenderPageUrlOf(addDays(lastDayOfMonth, 1)));
  };

  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  const dateMealsList: { date: Date; dayLabel: string; meals: any[] }[] =
    (() => {
      return eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth,
      }).map((date) => {
        const meals =
          mealsForCalender?.find((mealForCalender) => {
            return isSameDay(new Date(mealForCalender.date), date);
          })?.meals || [];

        return {
          date,
          dayLabel: weekdays[getDay(date)],
          meals,
        };
      });
    })();

  return (
    <Calender
      dateMealsList={dateMealsList}
      fetchMealsLoading={fetchMealsLoading}
      refetchMealsForCalender={refetchMealsForCalender}
      refreshToPrev={updateToPreviousMonth}
      refreshToNext={updateToNextMonth}
    >
      {({ isDisplayCalenderMode, useAssignDishModeResult }) => (
        <>
          <div className={style['calender-header-title']}>
            {format(firstDayOfMonth, 'yyyy年M月')}
          </div>
          {/* &nbsp; */}
          {/* 今週(枠で括う) */}
          <div className={style['calender-header-menu']}>
            {isDisplayCalenderMode && (
              <CalenderMenu useAssignDishModeResult={useAssignDishModeResult} />
            )}
          </div>
        </>
      )}
    </Calender>
  );
};
