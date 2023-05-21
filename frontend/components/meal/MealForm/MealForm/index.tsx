import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import style from '../MealForm.module.scss';
import FormFieldWrapperWithLabel from '../../../common/form/FormFieldWrapperWithLabel';
import { buildISODateString } from '../../../../features/utils/dateUtils';
import ErrorMessageIfExist from '../../../common/form/ErrorMessageIfExist';
import { MEAL_TYPE } from '../../../../features/meal/const';
import { DishFormContent } from '../../../dish/DishForm/DishForm';
import { UseChoosingPutDishSourceTypeResult } from '../../../dish/DishForm/DishForm/useChoosingPutDishSourceType';
import {
  CHOOSING_DISH_TYPE,
  UseChoosingDishTypeResult,
} from './useChoosingDishType';
import { ExistingDishesForRegisteringWithMeal } from './ExistingDishesForRegisteringWithMeal';

type Props = {
  formSchema: any;
  onSubmit: any;

  defaultDate: Date;
  registeredMealId?: number;
  registeredMealType?: number;
  registeredDishId?: number;

  useChoosingDishTypeResult: UseChoosingDishTypeResult;
  useChoosingPutDishSourceTypeResult: UseChoosingPutDishSourceTypeResult;

  onSchemaError?: any;
};

export default (props: Props) => {
  const {
    formSchema,
    onSubmit,
    defaultDate,
    registeredMealId,
    registeredMealType,
    registeredDishId,
    useChoosingDishTypeResult: {
      setChoosingDishType,
      choosingRegisterNewDish,
      choosingUseExistingDish,
    },
    useChoosingPutDishSourceTypeResult,
    onSchemaError,
  } = props;

  const methods = useForm({
    resolver: zodResolver(formSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // 使わないことに不都合があったらonDisplayとかを定義してuseEffect内で使用
  } = methods;

  const onError = (schemaErrors, _) => {
    if (onSchemaError) onSchemaError(schemaErrors);
  };

  return (
    <div className={style['form']}>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          {registeredMealId && (
            <input
              type="hidden"
              value={registeredMealId}
              {...register('meal.id', { valueAsNumber: true })}
            />
          )}
          <FormFieldWrapperWithLabel label="日付" required>
            <Form.Control
              type="date"
              defaultValue={buildISODateString(defaultDate)}
              {...register('meal.date', { valueAsDate: true })}
              data-testid="mealDate"
            />
            <ErrorMessageIfExist errorMessage={errors.meal?.date?.message} />
          </FormFieldWrapperWithLabel>

          <FormFieldWrapperWithLabel label="時間帯" required>
            <Form.Select
              defaultValue={registeredMealType || MEAL_TYPE.DINNER}
              {...register('meal.mealType', { valueAsNumber: true })}
              data-testid="mealTypeOptions"
            >
              <option
                value={MEAL_TYPE.BREAKFAST}
                data-testid={`mealTypeOption-${MEAL_TYPE.BREAKFAST}`}
              >
                朝食
              </option>
              <option
                value={MEAL_TYPE.LUNCH}
                data-testid={`mealTypeOption-${MEAL_TYPE.LUNCH}`}
              >
                昼食
              </option>
              <option
                value={MEAL_TYPE.DINNER}
                data-testid={`mealTypeOption-${MEAL_TYPE.DINNER}`}
              >
                夕食
              </option>
            </Form.Select>
            <ErrorMessageIfExist
              errorMessage={errors.meal?.mealType?.message}
            />
          </FormFieldWrapperWithLabel>

          <div className={style['meal-form']}>
            <Form.Group>
              <Form.Check
                type="radio"
                inline
                name="add_meal_type"
                value={CHOOSING_DISH_TYPE.CHOOSING_REGISTER_NEW_DISH}
                onChange={() =>
                  setChoosingDishType(
                    CHOOSING_DISH_TYPE.CHOOSING_REGISTER_NEW_DISH,
                  )
                }
                checked={choosingRegisterNewDish}
                label="新しく料理を登録"
                data-testid="optionOfRegisteringNewDish"
              />
              <Form.Check
                type="radio"
                inline
                name="add_meal_type"
                value={CHOOSING_DISH_TYPE.CHOOSING_USE_EXISTING_DISH}
                onChange={() =>
                  setChoosingDishType(
                    CHOOSING_DISH_TYPE.CHOOSING_USE_EXISTING_DISH,
                  )
                }
                checked={choosingUseExistingDish}
                label="登録済みの料理を選択"
                data-testid="optionOfUsingExistingDish"
              />
            </Form.Group>

            {/*
              現在新規dish作成コンポーネントが使い回せるから使いまわしているが、
              デザインの都合・submitするフィールドの都合でmealフォーム都合の修正が必要になったら、
              それに合わせたコンポーネントを作る
             */}
            {choosingRegisterNewDish && (
              <DishFormContent
                useChoosingPutDishSourceTypeResult={
                  useChoosingPutDishSourceTypeResult
                }
              />
            )}

            {choosingUseExistingDish && (
              <ExistingDishesForRegisteringWithMeal
                dishIdOfRegisteredWithMeal={registeredDishId}
              />
            )}
          </div>

          <Form.Group>
            <Button type="submit" data-testid="submitMealButton">
              登録
            </Button>
          </Form.Group>
        </Form>
      </FormProvider>
    </div>
  );
};
