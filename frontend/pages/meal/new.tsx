import React from 'react';
import AddMeal from '../../components/meal/AddMeal';
import style from '../../components/meal/MealForm/index.module.scss';

export default (props) => {
  return (
    <>
      <h1 className={style['form__title']}>食事登録</h1>
      <AddMeal />
    </>
  );
};
