import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import style from './AddDish.module.scss';
import FormFieldWrapperWithLabel from '../../common/form/FormFieldWrapperWithLabel';

enum ADD_DISH_TYPE {
  ADD_DISH_WITH_NEW_MEAL,
  ADD_DISH_WITH_EXIST_MEAL,
}
const formUrlPerAddDishType = {
  [ADD_DISH_TYPE.ADD_DISH_WITH_NEW_MEAL]: '',
  [ADD_DISH_TYPE.ADD_DISH_WITH_EXIST_MEAL]: '',
};

export default (props) => {
  const [addDishType, setAddDishType] = React.useState(
    ADD_DISH_TYPE.ADD_DISH_WITH_NEW_MEAL,
  );
  const addDishWithNewMeal =
    addDishType === ADD_DISH_TYPE.ADD_DISH_WITH_NEW_MEAL;
  const addDishWithExistMeal =
    addDishType === ADD_DISH_TYPE.ADD_DISH_WITH_EXIST_MEAL;
  return (
    <div className={style['form']}>
      <Form action={formUrlPerAddDishType[addDishType]}>
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

        <div className={style['dish-form']}>
          <Form.Group>
            <Form.Check
              type="radio"
              inline
              name="add_dish_type"
              value={addDishType}
              onChange={() =>
                setAddDishType(ADD_DISH_TYPE.ADD_DISH_WITH_NEW_MEAL)
              }
              checked={addDishWithNewMeal}
              label="新しく料理を登録"
            />
            <Form.Check
              type="radio"
              inline
              name="add_dish_type"
              value={addDishType}
              onChange={() =>
                setAddDishType(ADD_DISH_TYPE.ADD_DISH_WITH_EXIST_MEAL)
              }
              checked={addDishWithExistMeal}
              label="登録済みの料理を選択"
            />
          </Form.Group>

          {addDishWithNewMeal && (
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

          {addDishWithExistMeal && <>addDishWithExistMeal</>}
        </div>

        <Form.Group>
          <Button type="submit">登録</Button>
        </Form.Group>
      </Form>
    </div>
  );
};
