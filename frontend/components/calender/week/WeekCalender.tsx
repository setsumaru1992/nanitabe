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
import AssignDish from '../AssignDish';
import { useApolloClient } from '../../../lib/graphql/buildApolloClient';
import useCalenderMode from './useCalenderMode';

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

  const { apolloClient } = useApolloClient();

  const refreshData = async () => {
    /*
      これはオーバーキルな対応で、本来こうはしたくない。

      本来したいこと: 追加・更新が起きた後にデータを取得する際はネットワーク経由で情報を再度取得する
      該当ケース: addMealWithNewDishでdish追加後、addMealで使う既存dish一覧が更新されていてほしい
      なぜ難しいか: 古いデータのグローバルデータであるキャッシュのうまい消し方を知らない

      個別の方法
      - データ追加・更新時に当該データのキャッシュを消す
        - 多分これが本筋で、キャッシュの消し方を知ったらこれを行う
      - apollo経由のデータを使うコンポーネントの初回描画時にキャッシュ経由のデータ取得なら当該データの再取得
        - キャッシュ経由データ取得だったか判断できない
     */
    await apolloClient.clearStore();
    refetchMealsForCalender();
  };

  const {
    isDisplayCalenderMode,
    isNotDisplayCalenderMode,
    useAssignDishModeResult,
  } = useCalenderMode({
    onDataChanged: () => {
      refreshData();
    },
  });

  const onDateClick = (date: Date) => {
    if (useAssignDishModeResult.isAssigningSelectedDishMode) {
      useAssignDishModeResult.onDateClickForAssigningDish(date);
    }
  };

  if (fetchMealsLoading) return <>Loading...</>;
  return (
    <div className={style['week-calender-container']}>
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
              <tr
                key={dateNumber}
                onClick={() => onDateClick(date)}
                data-testid={`weekCalendarDateOf${date.toISOString()}`}
              >
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
                <td className={style['dish-container__wrapper']}>
                  <div className={style['dish-container']}>
                    {meals?.map((meal) => (
                      <React.Fragment key={meal.id}>
                        <CalenderMealIcon
                          meal={meal}
                          onChanged={async () => {
                            await refreshData();
                          }}
                        />{' '}
                      </React.Fragment>
                    ))}
                  </div>
                  {isDisplayCalenderMode && (
                    <AddMealIcon
                      dateForAdd={date}
                      onAddSucceeded={async () => {
                        await refreshData();
                      }}
                    />
                  )}
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
      {useAssignDishModeResult.inAssigningDishMode && (
        <AssignDish useAssignDishModeResult={useAssignDishModeResult} />
      )}
    </div>
  );
};
