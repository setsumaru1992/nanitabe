import React from 'react';
import Link from 'next/link';
import style from './index.module.scss';
import Icon from '../Icon';
import AddDishIcon from '../Icon/AddDishIcon';
import useDish from '../../../features/dish/useDish';
import { MEAL_POSITION_LABELS } from '../../../features/dish/const';
import { DISHSOURCE_NEW_PAGE_URL } from '../../../pages/dishsources/new';

export default () => {
  const { dishesPerSource, refetchDishesPerSource } = useDish({
    fetchDishesParams: {
      fetchDishesPerSourceParams: { requireFetchedData: true },
    },
  });

  return (
    <div>
      {dishesPerSource &&
        dishesPerSource.map(
          (dishesPerSourceElement, dishesPerSourceElementIdx) => (
            <div
              className={style['dish-source__container']}
              key={dishesPerSourceElementIdx}
            >
              {/* 本当は未定義の場合は要素出現させたくないが、デバッグの都合上sourceIdがnullなので機能させていない */}
              {/* {dishesPerSourceElement.sourceId && ()} */}
              <div className={style['dish-source-header__container']}>
                {dishesPerSourceElement.dishSource?.name}
              </div>
              <div>
                {dishesPerSourceElement.dishesPerMealPosition.map(
                  (
                    dishesPerMealPositionElement,
                    dishesPerMealPositionElementIdx,
                  ) => (
                    <div
                      className={style['dish-source-meal-position__container']}
                      key={dishesPerMealPositionElementIdx}
                    >
                      <div
                        className={style['dish-source-meal-position__header']}
                      >
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
                          <Icon
                            dish={dish}
                            key={dish.id}
                            onChanged={() => {
                              refetchDishesPerSource();
                            }}
                          />
                        ))}
                        <AddDishIcon />
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          ),
        )}
      <Link href={DISHSOURCE_NEW_PAGE_URL}>レシピ元作成</Link>
    </div>
  );
};
