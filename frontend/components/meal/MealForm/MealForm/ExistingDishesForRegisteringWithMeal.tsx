import { useFormContext } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import useDish from '../../../../features/dish/useDish';
import FormFieldWrapperWithLabel from '../../../common/form/FormFieldWrapperWithLabel';
import ErrorMessageIfExist from '../../../common/form/ErrorMessageIfExist';
import style from './ExistingDishesForRegisteringWithMeal.module.scss';

type ExistingDishIconProps = {
  dish: any;
  useStateResultArrayOfSelectedDishId: any[];
  setValue: any;
};

const ExistingDishIcon = (props: ExistingDishIconProps) => {
  const { dish, useStateResultArrayOfSelectedDishId, setValue } = props;
  const [selectedDishId, setSelectedDishId] =
    useStateResultArrayOfSelectedDishId;

  const updateSelectedDishId = (clickedDishId) => {
    setSelectedDishId(clickedDishId);
  };

  useEffect(() => {
    setValue('dishId', selectedDishId);
  }, [selectedDishId]);

  const shortDishSourceName = (() => {
    if (!dish.dishSourceName) return null;
    if (dish.dishSourceName.length <= 10) {
      return dish.dishSourceName;
    }
    return `${dish.dishSourceName.slice(0, 10)}...`;
  })();

  return (
    <div
      className={classNames({
        [style['icon']]: true,
        [style['dish-icon']]: true,
        [style['dish-icon--selected']]: dish.id === selectedDishId,
      })}
      onClick={() => updateSelectedDishId(dish.id)}
      data-testid={`existingDish-${dish.id}`}
    >
      {dish.name}
      {shortDishSourceName && (
        <div className={style['dish-icon__source-caption']}>
          {shortDishSourceName}
        </div>
      )}
    </div>
  );
};

type ExistingDishesForRegisteringWithMealProps = {
  dishIdRegisteredWithMeal?: number;
};
export const ExistingDishesForRegisteringWithMeal = (
  props: ExistingDishesForRegisteringWithMealProps,
) => {
  const { dishIdRegisteredWithMeal } = props;
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const [searchString, setSearchString] = useState('');

  const { existingDishesForRegisteringWithMeal: dishes, fetchLoading } =
    useDish({
      fetchDishesParams: {
        fetchExistingDishesForRegisteringWithMealParams: {
          requireFetchedData: true,
          searchString,
          dishIdRegisteredWithMeal,
        },
      },
    });

  const [fetchedDishes, setFetchedDishes] = useState(null);
  useEffect(() => {
    if (dishes) {
      setFetchedDishes(dishes);
    }
  }, [dishes]);

  const useStateResultArrayOfSelectedDishId = useState(
    dishIdRegisteredWithMeal || null,
  );

  if (!fetchedDishes && fetchLoading) return <>Loading</>;

  return (
    <FormFieldWrapperWithLabel label="料理">
      <div className={style['select-dishes-container']}>
        <Form.Control
          type="text"
          data-testid="existingDishSearchWord"
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
        />
        <div className={style['dish-icon-container']}>
          {(dishes || fetchedDishes).map((dish) => (
            <ExistingDishIcon
              key={dish.id}
              dish={dish}
              useStateResultArrayOfSelectedDishId={
                useStateResultArrayOfSelectedDishId
              }
              setValue={setValue}
            />
          ))}
        </div>
      </div>
      <ErrorMessageIfExist errorMessage={errors.dishId?.message} />
    </FormFieldWrapperWithLabel>
  );
};
