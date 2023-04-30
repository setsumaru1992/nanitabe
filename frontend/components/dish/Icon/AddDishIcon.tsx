import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import style from './AddDishIcon.module.scss';

export default () => {
  return (
    <Link href="/dishes/new">
      <div className={classNames(style['icon'], style['add-meal-icon'])}>
        <div className={style['add-dish-icon__content']}>+</div>
      </div>
    </Link>
  );
};
