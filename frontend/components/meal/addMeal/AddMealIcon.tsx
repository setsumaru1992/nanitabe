import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import style from './AddMealIcon.module.scss';

export default (props) => {
  return (
    <div className={classNames(style['icon'], style['add-meal-icon'])}>
      <Link href="/meal/new" className={style['add-meal-icon__content']}>
        +
      </Link>
    </div>
  );
};
