import React from 'react';
import style from './index.module.scss';
import Icon from '../Icon';
import AddDishIcon from '../Icon/AddDishIcon';
import useDish from '../../../features/dish/useDish';
import { MEAL_POSITION_LABELS } from '../../../features/dish/const';

export default () => {
  const { dishesPerSource } = useDish();
  return (
    <div>
      {dishesPerSource &&
        dishesPerSource.map((dishesPerSourceElement) => (
          <div className={style['dish-source__container']}>
            {/* 本当は未定義の場合は要素出現させたくないが、デバッグの都合上sourceIdがnullなので機能させていない */}
            {/* {dishesPerSourceElement.sourceId && ()} */}
            <div className={style['dish-source-header__container']}>
              りゅうじ（ダミーSource名）
              {dishesPerSourceElement.sourceId}
            </div>
            <div>
              {dishesPerSourceElement.dishesPerMealPosition.map(
                (dishesPerMealPositionElement) => (
                  <div
                    className={style['dish-source-meal-position__container']}
                  >
                    <div className={style['dish-source-meal-position__header']}>
                      {
                        MEAL_POSITION_LABELS[
                          dishesPerMealPositionElement.mealPosition
                        ]
                      }
                    </div>
                    <div
                      className={
                        style['dish-source-meal-position__content-container']
                      }
                    >
                      {dishesPerMealPositionElement.dishes.map((dish) => (
                        <Icon>{dish.name}</Icon>
                      ))}
                      <AddDishIcon />
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        ))}
    </div>
  );
};
