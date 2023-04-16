import React from 'react';
import classnames from 'classnames';
import style from './Menu.module.scss';

export default () => {
  return (
    <ul className={classnames(style['menu'])}>
      <li className={classnames(style['menu__row'])}>
        <a className={classnames(style['menu__content'])}>修正</a>
      </li>
      <li className={classnames(style['menu__row'])}>
        <a className={classnames(style['menu__content'])}>削除</a>
      </li>
    </ul>
  );
};
