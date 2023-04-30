import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import style from './index.module.scss';

type Props = {
  children: React.ReactNode;
};

export default (props: Props) => {
  const { children } = props;
  return (
    <div className={classNames(style['dish-icon__container'], style['icon'])}>
      <div className={style['dish-icon__content']}>
        {/* 使用元からはdishの情報をもらうからchildrenもらわなくていいけどデザインモックのため */}
        <Link href="/dishes/1/edit">{children}</Link>
        &nbsp;
        <a>×</a>
      </div>
    </div>
  );
};
