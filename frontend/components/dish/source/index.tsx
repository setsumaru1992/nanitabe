import React from 'react';
import style from './index.module.scss';
import Icon from '../Icon';
import AddDishIcon from '../Icon/AddDishIcon';

export default () => {
  return (
    <div>
      <div className={style['dish-source__container']}>
        <div className={style['dish-source-header__container']}>りゅうじ</div>
        <div>
          <div className={style['dish-source-meal-position__container']}>
            <div className={style['dish-source-meal-position__header']}>
              主食
            </div>
            <div
              className={style['dish-source-meal-position__content-container']}
            >
              <Icon>カレー</Icon>
              <AddDishIcon />
            </div>
          </div>
          <div className={style['dish-source-meal-position__container']}>
            <div className={style['dish-source-meal-position__header']}>
              {/* 未定義(その場合ヘッダタイトルを表示しない) */}
            </div>
            <div
              className={style['dish-source-meal-position__content-container']}
            >
              <Icon>親子丼</Icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
