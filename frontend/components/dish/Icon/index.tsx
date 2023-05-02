import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import style from './index.module.scss';
import { Dish } from '../../../lib/graphql/generated/graphql';

type Props = {
  dish: Dish;
};

export default (props: Props) => {
  const { dish } = props;
  return (
    <div className={classNames(style['dish-icon__container'], style['icon'])}>
      <div className={style['dish-icon__content']}>
        <Link href={`/dishes/${dish.id}/edit`}>{dish.name}</Link>
        &nbsp;
        <a>×</a>
      </div>
    </div>
  );
};
