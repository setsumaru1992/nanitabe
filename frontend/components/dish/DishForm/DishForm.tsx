import React from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { zodResolver } from '@hookform/resolvers/zod';
import FormFieldWrapperWithLabel from '../../common/form/FormFieldWrapperWithLabel';
import ErrorMessageIfExist from '../../common/form/ErrorMessageIfExist';
import {
  MEAL_POSITION,
  MEAL_POSITION_LABELS,
  MEAL_POSITIONS,
} from '../../../features/dish/const';
import { Dish } from '../../../lib/graphql/generated/graphql';
import {
  DISH_SOURCE_TYPE,
  DishSourceType,
} from '../../../features/dish/source/const';
import { DISH_SOURCE_RELATION_DETAIL_VALUE_TYPE } from '../../../features/dish/schema';

type DishFormContentProps = {
  registeredDish?: Dish;
};

export const DishFormContent = (props: DishFormContentProps) => {
  const { registeredDish } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      {registeredDish?.id && (
        <input
          type="hidden"
          value={registeredDish.id}
          {...register('dish.id', { valueAsNumber: true })}
        />
      )}
      <FormFieldWrapperWithLabel label="料理名" required>
        <Form.Control
          type="text"
          {...register('dish.name')}
          defaultValue={registeredDish?.name}
          data-testid="dishname"
        />
        <ErrorMessageIfExist errorMessage={errors.dish?.name?.message} />
      </FormFieldWrapperWithLabel>
      <FormFieldWrapperWithLabel label="位置づけ">
        <Form.Select
          defaultValue={registeredDish?.mealPosition || MEAL_POSITION.MAIN_DISH}
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

type DishSourceFormRelationContentProps = {
  dishSource: {
    id: number;
    type: DishSourceType;
  } | null;
};

export const DishSourceFormRelationContent = (
  props: DishSourceFormRelationContentProps,
) => {
  const { dishSource } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext();

  switch (dishSource?.type) {
    case DISH_SOURCE_TYPE.RECIPE_BOOK:
      return (
        <FormFieldWrapperWithLabel label="ページ数">
          <Form.Control
            type="number"
            {...register(
              'dishSourceRelation.dishSourceRelationDetail.recipeBookPage',
              { valueAsNumber: true },
            )}
          />
          <ErrorMessageIfExist
            errorMessage={
              errors.dishSourceRelation?.dishSourceRelationDetail
                ?.recipeBookPage
            }
          />
        </FormFieldWrapperWithLabel>
      );
    case DISH_SOURCE_TYPE.YOUTUBE:
    case DISH_SOURCE_TYPE.WEBSITE:
      return (
        <FormFieldWrapperWithLabel label="レシピURL">
          <Form.Control
            type="text"
            {...register(
              'dishSourceRelation.dishSourceRelationDetail.recipeWebsiteUrl',
            )}
          />
          <ErrorMessageIfExist
            errorMessage={
              errors.dishSourceRelation?.dishSourceRelationDetail
                ?.recipeWebsiteUrl
            }
          />
          <input
            type="hidden"
            value={DISH_SOURCE_RELATION_DETAIL_VALUE_TYPE.RECIPE_WEBSITE_URL}
            {...register(
              'dishSourceRelation.dishSourceRelationDetail.detailType',
            )}
          />
        </FormFieldWrapperWithLabel>
      );
    default:
      return (
        <FormFieldWrapperWithLabel label="メモ">
          <Form.Control
            type="text"
            {...register(
              'dishSourceRelation.dishSourceRelationDetail.recipeSourceMemo',
            )}
          />
          <ErrorMessageIfExist
            errorMessage={
              errors.dishSourceRelation?.dishSourceRelationDetail
                ?.recipeSourceMemo
            }
          />
        </FormFieldWrapperWithLabel>
      );
  }
};

type Props = {
  formSchema: any;
  onSubmit: any;
  children?: React.ReactNode;

  registeredDish?: Dish;

  onSchemaError?: any;
};

export default (props: Props) => {
  const { formSchema, onSubmit, registeredDish, onSchemaError, children } =
    props;

  const methods = useForm({ resolver: zodResolver(formSchema) });
  const { handleSubmit } = methods;

  const onError = (schemaErrors, _) => {
    if (onSchemaError) onSchemaError(schemaErrors);
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <DishFormContent registeredDish={registeredDish} />
        {children}
        <Form.Group>
          <Button type="submit" data-testid="submitDishButton">
            登録
          </Button>
        </Form.Group>
      </Form>
    </FormProvider>
  );
};
