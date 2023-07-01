import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import style from './AssignDish.module.scss';
import ExistingDishIconForSelect from '../../meal/ExistingDishIconForSelect';
import useDish from '../../../features/dish/useDish';

type Props = {
  arrayOfUseStateResultOfSelectedDish: any;
};

export default (props: Props) => {
  const { arrayOfUseStateResultOfSelectedDish } = props;
  const [searchString, setSearchString] = useState('');
  const [selectedDish, setSelectedDish] = arrayOfUseStateResultOfSelectedDish;

  const {
    existingDishesForRegisteringWithMeal: dishes,
    prefetchedExistingDishesForRegisteringWithMeal: fetchedDishes,
    fetchLoading,
  } = useDish({
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
        dishIdRegisteredWithMeal: selectedDish?.id,
      },
    },
  });

  if (!fetchedDishes && fetchLoading) return <>Loading</>;
  return (
    <div>
      TODO: 食事時間選ばせるラジオボタン
      <br />
      食事を選択してください。
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
            selected={dish.id === selectedDish?.id}
            onClick={() => {
              setSelectedDish(dish);
            }}
          />
        ))}
      </div>
    </div>
  );
};
