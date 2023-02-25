import React from 'react';
import style from './WeekCalender.module.scss';

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
            <td className={style['dish-container']}>ハンバーグ</td>
          </tr>
          {[21, 22, 23, 24, 25, 26].map((date) => (
            <tr key={date}>
              <th>
                <div className={style['date']}>
                  {date}
                  <span className={style['date__day-of-week']}>mon</span>
                </div>
              </th>
              <td className={style['dish-container']} />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
