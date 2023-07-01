import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import style from './AssignDish.module.scss';
import ExistingDishIconForSelect from '../../meal/ExistingDishIconForSelect';
import useDish from '../../../features/dish/useDish';
import SelectMealType from '../../meal/MealForm/MealForm/SelectMealType';
import { MEAL_TYPE } from '../../../features/meal/const';

type Props = {
  useAssignDishModeResult: any;
};

export default (props: Props) => {
  const { useAssignDishModeResult } = props;
  const {
    changeCalenderModeToDisplayCalenderMode,
    changeCalenderModeToAssigningSelectedDishMode,
    selectedDish,
    selectDish,
    selectedMealType,
    selectMealType,
    searchStringForSearchingExistingDish,
    updateSearchString,
  } = useAssignDishModeResult;

  const defaultMealType = MEAL_TYPE.DINNER;
  useEffect(() => {
    selectMealType(defaultMealType);
  }, []);

  const {
    existingDishesForRegisteringWithMeal: dishes,
    prefetchedExistingDishesForRegisteringWithMeal: fetchedDishes,
    fetchLoading,
  } = useDish({
    fetchDishesParams: {
      fetchExistingDishesForRegisteringWithMealParams: {
        requireFetchedData: true,
        searchString: searchStringForSearchingExistingDish,
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
      タイトル
      <div
        onClick={() => {
          changeCalenderModeToDisplayCalenderMode();
        }}
      >
        閉じる
      </div>
      <br />
      [時間帯]
      <SelectMealType
        selectedMealType={selectedMealType || defaultMealType}
        onClick={(mealType) => {
          selectMealType(mealType);
        }}
      />
      {/* TODO: 連続登録をできるようにするチェックボックス作成 */}
      [食事を選択してください]
      <Form.Control
        type="text"
        data-testid="existingDishSearchWord"
        onChange={(e) => {
          updateSearchString(e.target.value);
        }}
      />
      <div className={style['existing-dish-icon-container']}>
        {(dishes || fetchedDishes).map((dish) => (
          <ExistingDishIconForSelect
            key={dish.id}
            dish={dish}
            selected={dish.id === selectedDish?.id}
            onClick={() => {
              selectDish(dish);
              changeCalenderModeToAssigningSelectedDishMode();
            }}
          />
        ))}
      </div>
    </div>
  );
};
