import { useFormContext } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import useDish from '../../../../features/dish/useDish';
import FormFieldWrapperWithLabel from '../../../common/form/FormFieldWrapperWithLabel';
import ErrorMessageIfExist from '../../../common/form/ErrorMessageIfExist';
import style from './ExistingDishesForRegisteringWithMeal.module.scss';
import ExistingDishIconForSelect from '../../../dish/ExistingDishIcon/ExistingDishIconForSelect';

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

  const [selectedDishId, setSelectedDishId] = useState(
    dishIdRegisteredWithMeal || null,
  );
  // NOTE: onClickでsetValueしたいが、初期値セットも込みで行うためにuseEffect利用
  useEffect(() => {
    setValue('dishId', selectedDishId);
  }, [selectedDishId]);

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
      <ErrorMessageIfExist errorMessage={errors.dishId?.message} />
    </FormFieldWrapperWithLabel>
  );
};
