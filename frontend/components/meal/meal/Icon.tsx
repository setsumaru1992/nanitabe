import React from 'react';
import classNames from 'classnames';
import style from './Icon.module.scss';

export default (props) => {
  return (
    <div className={classNames(style['icon'], style['meal-icon--dinner'])}>
      ハンバーグ &nbsp; <i className="fa-solid fa-ellipsis-vertical" />
    </div>
  );
};
