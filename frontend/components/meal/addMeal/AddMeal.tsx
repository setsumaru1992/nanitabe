import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import style from './AddMeal.module.scss';
import FormFieldWrapperWithLabel from '../../common/form/FormFieldWrapperWithLabel';
import useMeal from '../../../features/meal/useMeal';

enum ADD_MEAL_TYPE {
  ADD_MEAL_WITH_NEW_DISH,
  ADD_MEAL_WITH_EXIST_DISH,
}

export default (props) => {
  const [addMealType, setAddMealType] = React.useState(
    ADD_MEAL_TYPE.ADD_MEAL_WITH_NEW_DISH,
  );
  const { addMealWithNewDishAndNewSource } = useMeal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({});

  const addMealWithNewMeal =
    addMealType === ADD_MEAL_TYPE.ADD_MEAL_WITH_NEW_DISH;
  const addMealWithExistMeal =
    addMealType === ADD_MEAL_TYPE.ADD_MEAL_WITH_EXIST_DISH;

  const onSubmit: SubmitHandler<any> = async (input) => {
    const addMealFunc = (() => {
      return addMealWithNewDishAndNewSource;
    })();
    await addMealFunc(input, {
      onComplated: (data) => {
        reset();
      },
      onError: (error) => {},
    });
  };

  return (
    <div className={style['form']}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1 className={style['form__title']}>食事登録</h1>
        <FormFieldWrapperWithLabel label="日付" required>
          <Form.Control type="date" value="2023-02-20" onChange={(e) => {}} />
        </FormFieldWrapperWithLabel>

        <FormFieldWrapperWithLabel label="時間帯" required>
          <Form.Select>
            <option value="">朝食</option>
            <option value="">昼食</option>
            <option value="">夕食</option>
          </Form.Select>
        </FormFieldWrapperWithLabel>

        <div className={style['meal-form']}>
          <Form.Group>
            <Form.Check
              type="radio"
              inline
              name="add_meal_type"
              value={addMealType}
              onChange={() =>
                setAddMealType(ADD_MEAL_TYPE.ADD_MEAL_WITH_NEW_DISH)
              }
              checked={addMealWithNewMeal}
              label="新しく料理を登録"
            />
            <Form.Check
              type="radio"
              inline
              name="add_meal_type"
              value={addMealType}
              onChange={() =>
                setAddMealType(ADD_MEAL_TYPE.ADD_MEAL_WITH_EXIST_DISH)
              }
              checked={addMealWithExistMeal}
              label="登録済みの料理を選択"
            />
          </Form.Group>

          {addMealWithNewMeal && (
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

          {addMealWithExistMeal && <>addDishWithExistMeal</>}
        </div>

        <Form.Group>
          <Button type="submit">登録</Button>
        </Form.Group>
      </Form>
    </div>
  );
};
