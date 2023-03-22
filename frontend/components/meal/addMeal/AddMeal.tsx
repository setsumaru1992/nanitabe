import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import style from './AddMeal.module.scss';
import FormFieldWrapperWithLabel from '../../common/form/FormFieldWrapperWithLabel';
import useMeal from '../../../features/meal/useMeal';
import type { AddMealWithNewDishAndNewSource } from '../../../features/meal/useMeal';

enum CHOOSING_DISH_TYPE {
  CHOOSING_REGISTER_NEW_DISH,
  CHOOSING_USE_EXISTING_DISH,
}

export default (props) => {
  const [choosingDishType, setChoosingDishType] = React.useState(
    CHOOSING_DISH_TYPE.CHOOSING_REGISTER_NEW_DISH,
  );
  const {
    addMealWithNewDishAndNewSource,
    AddMealWithNewDishAndNewSourceSchema,
  } = useMeal();

  const choosingRegisterNewDish =
    choosingDishType === CHOOSING_DISH_TYPE.CHOOSING_REGISTER_NEW_DISH;
  const choosingUseExistingDish =
    choosingDishType === CHOOSING_DISH_TYPE.CHOOSING_USE_EXISTING_DISH;

  const [addMealFunc, AddMealSchema] = (() => {
    if (choosingRegisterNewDish) {
      return [
        addMealWithNewDishAndNewSource,
        AddMealWithNewDishAndNewSourceSchema,
      ];
    }
    return [null, null];
  })();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(AddMealSchema),
  });

  const onSubmit: SubmitHandler<AddMealWithNewDishAndNewSource | any> = async (
    input,
  ) => {
    console.log(input);
    // await addMealFunc(input, {
    //   onComplated: (data) => {
    //     reset();
    //   },
    //   onError: (error) => {},
    // });
  };

  return (
    <div className={style['form']}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1 className={style['form__title']}>食事登録</h1>
        <FormFieldWrapperWithLabel label="日付" required>
          <Form.Control type="date" value="2023-02-20" onChange={(e) => {}} />
        </FormFieldWrapperWithLabel>

        <FormFieldWrapperWithLabel label="時間帯" required>
          <Form.Select {...register('meal.mealType', { valueAsNumber: true })}>
            {/* 要定数化 */}
            <option value={1}>朝食</option>
            <option value={2}>昼食</option>
            <option value={3}>夕食</option>
          </Form.Select>
          {errors.meal?.mealType?.message && (
            <p>{errors.meal?.mealType?.message.toString()}</p>
          )}
        </FormFieldWrapperWithLabel>

        <div className={style['meal-form']}>
          <Form.Group>
            <Form.Check
              type="radio"
              inline
              name="add_meal_type"
              value={choosingDishType}
              onChange={() =>
                setChoosingDishType(
                  CHOOSING_DISH_TYPE.CHOOSING_REGISTER_NEW_DISH,
                )
              }
              checked={choosingRegisterNewDish}
              label="新しく料理を登録"
            />
            <Form.Check
              type="radio"
              inline
              name="add_meal_type"
              value={choosingDishType}
              onChange={() =>
                setChoosingDishType(
                  CHOOSING_DISH_TYPE.CHOOSING_USE_EXISTING_DISH,
                )
              }
              checked={choosingUseExistingDish}
              label="登録済みの料理を選択"
            />
          </Form.Group>

          {choosingRegisterNewDish && (
            <>
              <FormFieldWrapperWithLabel label="料理名" required>
                <Form.Control type="text" />
              </FormFieldWrapperWithLabel>
              <FormFieldWrapperWithLabel label="かな">
                <Form.Control type="text" />
              </FormFieldWrapperWithLabel>
              <FormFieldWrapperWithLabel label="位置づけ">
                <Form.Select>
                  <option value="">主食（炭水化物）</option>
                  <option value="">主菜（メインディッシュおかず）</option>
                  <option value="">副菜・前菜</option>
                  <option value="">汁物</option>
                  <option value="">デザート</option>
                </Form.Select>
              </FormFieldWrapperWithLabel>

              <div className={style['reference-recipe']}>
                <span className={style['reference-recipe__title']}>
                  参考レシピ
                </span>
                <FormFieldWrapperWithLabel label="名前">
                  <Form.Control type="text" />
                </FormFieldWrapperWithLabel>
                <FormFieldWrapperWithLabel label="タイプ">
                  <Form.Select>
                    <option value="">本</option>
                    <option value="">webサイト</option>
                    <option value="">テレビ</option>
                  </Form.Select>
                </FormFieldWrapperWithLabel>
                {true && (
                  <FormFieldWrapperWithLabel label="ページ数">
                    <Form.Control type="number" />
                  </FormFieldWrapperWithLabel>
                )}
                {true && (
                  <FormFieldWrapperWithLabel label="レシピURL">
                    <Form.Control type="text" />
                  </FormFieldWrapperWithLabel>
                )}
              </div>
            </>
          )}

          {choosingUseExistingDish && <>addDishWithExistMeal</>}
        </div>

        <Form.Group>
          <Button type="submit">登録</Button>
        </Form.Group>
      </Form>
    </div>
  );
};
