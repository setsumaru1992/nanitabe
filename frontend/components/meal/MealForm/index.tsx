import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import style from './index.module.scss';
import FormFieldWrapperWithLabel from '../../common/form/FormFieldWrapperWithLabel';
import { buildISODateString } from '../../../features/utils/dateUtils';
import ErrorMessageIfExist from '../../common/form/ErrorMessageIfExist';
import { MEAL_TYPE } from '../../../features/meal/const';
import { MEAL_POSITION } from '../../../features/dish/const';
import useDish from '../../../features/dish/useDish';

export enum CHOOSING_DISH_TYPE {
  CHOOSING_REGISTER_NEW_DISH,
  CHOOSING_USE_EXISTING_DISH,
}

type Props = {
  formSchema: any;
  onSubmit: any;

  defaultDate: Date;
  registeredMealType?: number;
  registeredDishId?: number;

  choosingDishType: CHOOSING_DISH_TYPE;
  setChoosingDishType: any;

  displayInModal?: boolean;
  onSubmitErrorOfSchema?: any;
};

export default (props: Props) => {
  const {
    formSchema,
    onSubmit,
    defaultDate,
    registeredMealType,
    registeredDishId,
    displayInModal,
    choosingDishType,
    setChoosingDishType,
    onSubmitErrorOfSchema,
  } = props;

  const { dishes } = useDish();

  const choosingRegisterNewDish =
    choosingDishType === CHOOSING_DISH_TYPE.CHOOSING_REGISTER_NEW_DISH;
  const choosingUseExistingDish =
    choosingDishType === CHOOSING_DISH_TYPE.CHOOSING_USE_EXISTING_DISH;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // 使わないことに不都合があったらonDisplayとかを定義してuseEffect内で使用
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onError = (schemaErrors, _) => {
    if (onSubmitErrorOfSchema) onSubmitErrorOfSchema(schemaErrors);
  };

  return (
    <div className={style['form']}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        {!displayInModal && <h1 className={style['form__title']}>食事登録</h1>}
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
            defaultValue={registeredMealType || MEAL_TYPE.DINNER}
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

          {choosingRegisterNewDish && (
            <>
              <FormFieldWrapperWithLabel label="料理名" required>
                <Form.Control
                  type="text"
                  {...register('dish.name')}
                  data-testid="dishname"
                />
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

          {choosingUseExistingDish && (
            <FormFieldWrapperWithLabel label="料理">
              <Form.Select
                defaultValue={registeredDishId || null}
                {...register('dishId', { valueAsNumber: true })}
                data-testid="existingDishes"
              >
                {dishes.map((dish) => (
                  <option
                    key={dish.id}
                    value={dish.id}
                    data-testid={`existingDish-${dish.id}`}
                  >
                    {dish.name}
                  </option>
                ))}
              </Form.Select>
              <ErrorMessageIfExist errorMessage={errors.dishId?.message} />
            </FormFieldWrapperWithLabel>
          )}
        </div>

        <Form.Group>
          <Button type="submit" data-testid="addMealButton">
            登録
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};
