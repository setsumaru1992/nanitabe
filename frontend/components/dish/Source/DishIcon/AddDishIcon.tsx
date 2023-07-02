import React from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import style from './AddDishIcon.module.scss';

export default () => {
  return (
    <Link href="/dishes/new">
      <div className={classnames(style['icon'], style['add-meal-icon'])}>
        <div className={style['add-dish-icon__content']}>+</div>
      </div>
    </Link>
  );
};
