import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import classnames from 'classnames';
import style from './AssignDish.module.scss';
import ExistingDishIconForSelect from '../../dish/ExistingDishIcon/ExistingDishIconForSelect';
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
    doContinuousRegistration,
    toggleDoContinuousRegistration,
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
    <div className={style['choose-dish-container']}>
      <div className={style['assign-dish-header']}>
        <div className={style['assign-dish-header-title__container']}>
          <div className={style['assign-dish-header-title']}>食事登録</div>
        </div>
        <div className={style['assign-dish-header-menu__container']}>
          {selectedDish && (
            <div className={style['mark__wrapper']}>
              <div
                className={classnames(
                  'fa-solid fa-angle-down',
                  style['mark'],
                  style['mark-to-click'],
                )}
                onClick={() => {
                  changeCalenderModeToAssigningSelectedDishMode();
                }}
              />
            </div>
          )}
          <div className={style['mark__wrapper']}>
            <div
              className={classnames(
                'fa fa-xmark',
                style['mark'],
                style['mark-to-click'],
              )}
              onClick={() => {
                changeCalenderModeToDisplayCalenderMode();
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <input
          type="checkbox"
          id="continuousRegistrationCheck"
          data-testid="continuousRegistrationCheck"
          checked={doContinuousRegistration}
          onChange={() => toggleDoContinuousRegistration()}
        />
        <label htmlFor="continuousRegistrationCheck">連続登録する</label>
      </div>
      <div className={style['choose-dish-form__label-and-input-container']}>
        <div className={style['choose-dish-form__label']}>時間帯</div>
        <SelectMealType
          selectedMealType={selectedMealType || defaultMealType}
          onClick={(mealType) => {
            selectMealType(mealType);
          }}
        />
      </div>
      <div className={style['choose-dish-main']}>
        <div className={style['choose-dish-main-border__wrapper']}>
          <div className={style['choose-dish-main-border']} />
        </div>
        <div className={style['choose-dish-main-header']}>料理</div>

        <div className={style['choose-dish-form-select-dish__container']}>
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
