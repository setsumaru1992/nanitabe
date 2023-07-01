import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import classNames from 'classnames';
import style from './AssignDish.module.scss';
import ExistingDishIconForSelect from '../../meal/ExistingDishIconForSelect';
import useDish from '../../../features/dish/useDish';
import SelectMealType from '../../meal/MealForm/MealForm/SelectMealType';
import { MEAL_TYPE } from '../../../features/meal/const';
import FormFieldWrapperWithLabel from '../../common/form/FormFieldWrapperWithLabel';

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
    <div className={style['chosen-dish-container']}>
      <div className={style['chosen-dish-header']}>
        <div className={style['chosen-dish-header-title__container']}>
          <div className={style['chosen-dish-header-title']}>食事登録</div>
        </div>
        <div className={style['chosen-dish-header-menu__container']}>
          <div
            className={classNames(
              'fa fa-xmark',
              style['chosen-dish-header-menu__close'],
            )}
            onClick={() => {
              changeCalenderModeToDisplayCalenderMode();
            }}
          />
        </div>
      </div>
      <div className={style['chosen-dish-form__label-and-input-container']}>
        <div className={style['chosen-dish-form__label']}>時間帯</div>
        <SelectMealType
          selectedMealType={selectedMealType || defaultMealType}
          onClick={(mealType) => {
            selectMealType(mealType);
          }}
        />
      </div>
      {/* TODO: 連続登録をできるようにするチェックボックス作成 */}
      <div className={style['chosen-dish-form__label-and-input-container']}>
        {/*
          NOTE:
          なぜかflexboxの影響でラベルの幅が縮まってしまっている（開発者ツールで紫の斜線出てるのが証拠）
          直し方わからないので一旦保留
        */}
        <div className={style['chosen-dish-form__label']}>料理</div>
        <div className={style['chosen-dish-form-select-dish__container']}>
          <Form.Control
            type="text"
            placeholder="料理を検索できます"
            data-testid="existingDishSearchWord"
            onChange={(e) => {
              updateSearchString(e.target.value);
            }}
          />
          <div>
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
        </div>
      </div>
    </div>
  );
};
