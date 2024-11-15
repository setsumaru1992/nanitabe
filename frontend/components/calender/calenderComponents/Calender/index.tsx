import { addDays, format, isSameDay } from 'date-fns';
import React from 'react';
import {
  START_FROM_SAT,
  useCalenderDayOfWeek,
  useFirstDisplayDate,
} from '../../WeekCalender/useWeekCalenderDate';
import useCalenderArrowComponent from '../useCalenderArrowComponent';
import useMeal from '../../../../features/meal/useMeal';
import useRefreshCalenderData from '../../useRefreshCalenderData';
import useCalenderMode from '../useCalenderMode';
import useMeasureHeight from '../../../common/useMeasureHeight';
import style from '../../WeekCalender/index.module.scss';
import { Index } from '../CalenderMenu';
import DateComponent from '../Date';
import CalenderMealIcon from '../MealIcon';
import AddMealIcon from '../MealIcon/AddMealIcon';
import AssignDish from '../operationComponents/AssignDish';
import MoveDish from '../operationComponents/MoveMeal';
import SwapMeals from '../operationComponents/SwapMeals';

export type Props = {
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

  const { PreviousWeekDisplayButton, NextWeekDisplayButton } =
    useCalenderArrowComponent({
      updateFirstDateToPreviousWeekFirstDate,
      updateFirstDateToNextWeekFirstDate,
    });

  const { mealsForCalender, fetchMealsLoading, refetchMealsForCalender } =
    useMeal({
      fetchMealsParams: {
        fetchMealsForCalenderParams: {
          requireFetchedData: true,
          startDate: firstDisplayDate,
        },
      },
    });

  const { refreshData } = useRefreshCalenderData({ refetchMealsForCalender });

  const {
    isDisplayCalenderMode,
    useAssignDishModeResult,
    calenderModeChangers,
    useMoveMealModeResult,
    useSwapMealsModeResult,
    requireDisplayingBottomBar,
    onDateClick,
  } = useCalenderMode({
    onDataChanged: () => {
      refreshData();
    },
  });

  const [fixedComponentHeight, fixedComponentRef] = useMeasureHeight(
    requireDisplayingBottomBar,
  );

  if (fetchMealsLoading) return <>Loading...</>;
  return (
    <div className={style['week-calender-container']}>
      <div className={style['week-calender-header']}>
        <div className={style['week-calender-header-title']}>
          {format(firstDisplayDate, 'yyyy年M月')} ▼
        </div>
        {/* &nbsp; */}
        {/* 今週(枠で括う) */}
        <div className={style['week-calender-header-menu']}>
          {isDisplayCalenderMode && (
            <Index useAssignDishModeResult={useAssignDishModeResult} />
          )}
        </div>
      </div>
      <PreviousWeekDisplayButton />
      <table>
        <tbody>
          {daysOfWeek.map((day, dayIndex) => {
            const date = addDays(firstDisplayDate, Number(dayIndex));
            const meals =
              mealsForCalender?.find((mealForCalender) => {
                return isSameDay(new Date(mealForCalender.date), date);
              })?.meals || [];

            return (
              <tr
                key={`key_${dayIndex}`}
                onClick={() => onDateClick(date)}
                data-testid={`weekCalendarDateOf${date.toISOString()}`}
              >
                <th>
                  <DateComponent
                    date={date}
                    dayOfWeekLabel={day.label}
                    canAnythingExceptDisplay={isDisplayCalenderMode}
                    startSwappingMealsMode={
                      useSwapMealsModeResult.startSwappingMealsMode
                    }
                  />
                </th>
                <td className={style['dish-container__wrapper']}>
                  <div className={style['dish-container']}>
                    {meals?.map((meal) => (
                      <React.Fragment key={meal.id}>
                        <CalenderMealIcon
                          meal={meal}
                          onChanged={async () => {
                            await refreshData();
                          }}
                          canAnythingExeptDisplayDishName={
                            isDisplayCalenderMode
                          }
                          calenderModeChangers={calenderModeChangers}
                        />{' '}
                      </React.Fragment>
                    ))}
                    {isDisplayCalenderMode && (
                      <AddMealIcon
                        dateForAdd={date}
                        onAddSucceeded={async () => {
                          await refreshData();
                        }}
                      />
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {!requireDisplayingBottomBar && <NextWeekDisplayButton />}

      {/* 食事割当以外にも下からせり出るバーを使うようになったら条件変える */}
      {requireDisplayingBottomBar && (
        <>
          <div
            ref={fixedComponentRef}
            className={style['fixed-bar-from-bottom']}
          >
            <NextWeekDisplayButton />
            <div className={style['bottom-bar']}>
              {useAssignDishModeResult.inAssigningDishMode && (
                <AssignDish useAssignDishModeResult={useAssignDishModeResult} />
              )}
              {useMoveMealModeResult.isMovingMealMode && (
                <MoveDish useMoveDishModeResult={useMoveMealModeResult} />
              )}
              {useSwapMealsModeResult.isSwappingMealMode && (
                <SwapMeals useSwapMealsModeResult={useSwapMealsModeResult} />
              )}
            </div>
          </div>
          <div style={{ height: `${fixedComponentHeight}px` }} />
        </>
      )}
    </div>
  );
};
