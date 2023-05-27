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
      {dish.name}({dish.dishSourceName}
      ...)
    </div>
  );
};

type ExistingDishesForRegisteringWithMealProps = {
  dishIdOfRegisteredWithMeal?: number;
};
export const ExistingDishesForRegisteringWithMeal = (
  props: ExistingDishesForRegisteringWithMealProps,
) => {
  const { dishIdOfRegisteredWithMeal } = props;
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { dishes, fetchLoading } = useDish({
    fetchDishesParams: {
      fetchDishesOnlyParams: { requireFetchedData: true },
    },
  });

  const useStateResultArrayOfSelectedDishId = useState(
    dishIdOfRegisteredWithMeal || null,
  );

  if (fetchLoading) return <>Loading</>;

  return (
    <FormFieldWrapperWithLabel label="料理">
      <ErrorMessageIfExist errorMessage={errors.dishId?.message} />
      <div className={style['select-dishes-container']}>
        <Form.Control type="text" data-testid="existingDishSearchWord" />
        <div className={style['dish-icon-container']}>
          {dishes.map((dish) => (
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
    </FormFieldWrapperWithLabel>
  );
};
