import React from 'react';
import style from './WeekCalender.module.scss';
import Icon from '../../meal/meal/Icon';
import AddMealIcon from '../../meal/addMeal/AddMealIcon';

export default (props) => {
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
              <Icon /> <AddMealIcon />
            </td>
          </tr>
          {[21, 22, 23, 24, 25, 26].map((date) => (
            <tr key={date}>
              <th>
                <div className={style['date']}>
                  {date}
                  <span className={style['date__day-of-week']}>mon</span>
                </div>
              </th>
              <td className={style['dish-container']}>
                <AddMealIcon />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
