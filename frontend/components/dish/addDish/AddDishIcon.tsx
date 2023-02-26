import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import style from './AddDishIcon.module.scss';

export default (props) => {
  return (
    <div className={classNames(style['icon'], style['add-dish-icon'])}>
      <Link href="/dish/new" className={style['add-dish-icon__content']}>
        +
      </Link>
    </div>
  );
};
