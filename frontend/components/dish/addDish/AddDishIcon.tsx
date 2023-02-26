import React from 'react';
import classNames from 'classnames';
import style from './AddDishIcon.module.scss';

export default (props) => {
  return (
    <div className={classNames(style['icon'], style['add-dish-icon'])}>+</div>
  );
};
