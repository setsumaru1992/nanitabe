import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import style from './AssignDish.module.scss';
import useDish from '../../../features/dish/useDish';
import ExistingDishIconForSelect from '../../meal/ExistingDishIconForSelect';

export default () => {
  const [searchString, setSearchString] = useState('');
  const [selectedDishId, setSelectedDishId] = useState(null);

  const { existingDishesForRegisteringWithMeal: dishes, fetchLoading } =
    useDish({
      fetchDishesParams: {
        fetchExistingDishesForRegisteringWithMealParams: {
          requireFetchedData: true,
          searchString,
          /*
            TODO:
            このデータ取得固有のクエリを作る
            （現在食事作成のものを流用しているからdishIdRegisteredWithMealという変数名に金属疲労が起きている）
            今のところ選んだやつが一番前に移動してしまうくらいしか不都合が無いが、他の不都合が出たらクエリ作成
           */
          dishIdRegisteredWithMeal: selectedDishId,
        },
      },
    });

  const [fetchedDishes, setFetchedDishes] = useState(null);
  useEffect(() => {
    if (dishes) {
      setFetchedDishes(dishes);
    }
  }, [dishes]);

  if (!fetchedDishes && fetchLoading) return <>Loading</>;

  return (
    <div className={style.container}>
      <Form.Control
        type="text"
        data-testid="existingDishSearchWord"
        onChange={(e) => {
          setSearchString(e.target.value);
        }}
      />
      <div className={style['existing-dish-icon-container']}>
        {(dishes || fetchedDishes).map((dish) => (
          <ExistingDishIconForSelect
            key={dish.id}
            dish={dish}
            selected={dish.id === selectedDishId}
            onClick={() => {
              setSelectedDishId(dish.id);
            }}
          />
        ))}
      </div>
    </div>
  );
};
