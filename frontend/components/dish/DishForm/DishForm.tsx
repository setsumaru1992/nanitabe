import React from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import FormFieldWrapperWithLabel from '../../common/form/FormFieldWrapperWithLabel';
import ErrorMessageIfExist from '../../common/form/ErrorMessageIfExist';
import {
  MEAL_POSITION,
  MEAL_POSITION_LABELS,
  MEAL_POSITIONS,
} from '../../../features/dish/const';

type Props = {
  formSchema: any;
  onSubmit: any;

  registeredDish?: any;

  onSchemaError?: any;
};

export const DishFormContent = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <FormFieldWrapperWithLabel label="料理名" required>
        <Form.Control
          type="text"
          {...register('dish.name')}
          data-testid="dishname"
        />
        <ErrorMessageIfExist errorMessage={errors.dish?.name?.message} />
      </FormFieldWrapperWithLabel>
      <FormFieldWrapperWithLabel label="位置づけ">
        <Form.Select
          defaultValue={MEAL_POSITION.MAIN_DISH}
          {...register('dish.mealPosition', { valueAsNumber: true })}
          data-testid="mealPositionOptions"
        >
          {MEAL_POSITIONS.map((position) => (
            <option
              key={position}
              value={position}
              data-testid={`mealPositionOption-${position}`}
            >
              {MEAL_POSITION_LABELS[position]}
            </option>
          ))}
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
  );
};

export default (props: Props) => {
  const { formSchema, onSubmit, registeredDish, onSchemaError } = props;

  const methods = useForm();
  const { register, handleSubmit, formState } = methods;

  const onError = (schemaErrors, _) => {
    if (onSchemaError) onSchemaError(schemaErrors);
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <DishFormContent />
        <Form.Group>
          <Button type="submit" data-testid="submitDishButton">
            登録
          </Button>
        </Form.Group>
      </Form>
    </FormProvider>
  );
};
