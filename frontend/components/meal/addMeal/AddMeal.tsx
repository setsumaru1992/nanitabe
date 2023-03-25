import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import style from './AddMeal.module.scss';
import FormFieldWrapperWithLabel from '../../common/form/FormFieldWrapperWithLabel';
import useMeal from '../../../features/meal/useMeal';
import type { AddMealWithNewDishAndNewSource } from '../../../features/meal/useMeal';
import ErrorMessageIfExist from '../../common/form/ErrorMessageIfExist';
import { MEAL_TYPE } from '../../../features/meal/const';
import { buildISODateString } from '../../../features/utils/dateUtils';
import { MEAL_POSITION } from '../../../features/dish/const';

enum CHOOSING_DISH_TYPE {
  CHOOSING_REGISTER_NEW_DISH,
  CHOOSING_USE_EXISTING_DISH,
}

type Props = {
  defaultDate?: Date;
};

export default (props: Props) => {
  const { defaultDate: defaultDateArg } = props;
  const defaultDate: Date = defaultDateArg || new Date(Date());

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

  const onSubmit: SubmitHandler<
    AddMealWithNewDishAndNewSource | AddMealWithNewDishAndNewSource
  > = async (input) => {
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
          <Form.Control
            type="date"
            defaultValue={buildISODateString(defaultDate)}
            {...register('meal.date', { valueAsDate: true })}
          />
          <ErrorMessageIfExist errorMessage={errors.meal?.date?.message} />
        </FormFieldWrapperWithLabel>

        <FormFieldWrapperWithLabel label="時間帯" required>
          <Form.Select
            defaultValue={MEAL_TYPE.DINNER}
            {...register('meal.mealType', { valueAsNumber: true })}
          >
            <option value={MEAL_TYPE.BREAKFAST}>朝食</option>
            <option value={MEAL_TYPE.LUNCH}>昼食</option>
            <option value={MEAL_TYPE.DINNER}>夕食</option>
          </Form.Select>
          <ErrorMessageIfExist errorMessage={errors.meal?.mealType?.message} />
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
                <Form.Control type="text" {...register('dish.name')} />
                <ErrorMessageIfExist
                  errorMessage={errors.dish?.name?.message}
                />
              </FormFieldWrapperWithLabel>
              <FormFieldWrapperWithLabel label="位置づけ">
                <Form.Select
                  defaultValue={MEAL_POSITION.MAIN_DISH}
                  {...register('dish.mealPosition', { valueAsNumber: true })}
                >
                  <option value={MEAL_POSITION.STAPLE_FOOD}>
                    主食（炭水化物）
                  </option>
                  <option value={MEAL_POSITION.MAIN_DISH}>
                    主菜（メインディッシュおかず）
                  </option>
                  <option value={MEAL_POSITION.SIDE_DISH}>副菜・前菜</option>
                  <option value={MEAL_POSITION.SOUP}>汁物</option>
                  <option value={MEAL_POSITION.DESSERT}>デザート</option>
                </Form.Select>
                <ErrorMessageIfExist
                  errorMessage={errors.dish?.mealPosition?.message}
                />
              </FormFieldWrapperWithLabel>

              {/* <div className={style['reference-recipe']}> */}
              {/*  <span className={style['reference-recipe__title']}> */}
              {/*    参考レシピ */}
              {/*  </span> */}
              {/*  <FormFieldWrapperWithLabel label="名前"> */}
              {/*    <Form.Control type="text" /> */}
              {/*  </FormFieldWrapperWithLabel> */}
              {/*  <FormFieldWrapperWithLabel label="タイプ"> */}
              {/*    <Form.Select> */}
              {/*      <option value="">本</option> */}
              {/*      <option value="">webサイト</option> */}
              {/*      <option value="">テレビ</option> */}
              {/*    </Form.Select> */}
              {/*  </FormFieldWrapperWithLabel> */}
              {/*  {true && ( */}
              {/*    <FormFieldWrapperWithLabel label="ページ数"> */}
              {/*      <Form.Control type="number" /> */}
              {/*    </FormFieldWrapperWithLabel> */}
              {/*  )} */}
              {/*  {true && ( */}
              {/*    <FormFieldWrapperWithLabel label="レシピURL"> */}
              {/*      <Form.Control type="text" /> */}
              {/*    </FormFieldWrapperWithLabel> */}
              {/*  )} */}
              {/* </div> */}
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
