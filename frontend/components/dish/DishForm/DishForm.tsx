import React, { useState, useEffect } from 'react';
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
import {
  Dish,
  DishSourceRelation,
} from '../../../lib/graphql/generated/graphql';
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
    </>
  );
};

type DishSourceFormRelationContentProps = {
  dishSourceType: DishSourceType | null;
  dishSourceRelation: DishSourceRelation | null;
};

export const DishSourceFormRelationContent = (
  props: DishSourceFormRelationContentProps,
) => {
  const { dishSourceType } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [dishSourceRelation, setDishSourceRelation] = useState({});
  const existingDishSourceRelation = props.dishSourceRelation || {
    recipeBookPage: undefined,
    recipeWebsiteUrl: '',
    recipeSourceMemo: '',
  };
  useEffect(() => {
    setDishSourceRelation((prevState) => ({
      ...prevState,
      ...existingDishSourceRelation,
    }));
  }, [
    existingDishSourceRelation.recipeBookPage,
    existingDishSourceRelation.recipeWebsiteUrl,
    existingDishSourceRelation.recipeSourceMemo,
  ]);
  const editDishSourceRelationDetail = (params: {
    recipeBookPage?: number;
    recipeWebsiteUrl?: string;
    recipeSourceMemo?: string;
  }) => {
    setDishSourceRelation({
      ...dishSourceRelation,
      ...params,
    });
  };

  return (
    <>
      {dishSourceType === DISH_SOURCE_TYPE.RECIPE_BOOK && (
        <FormFieldWrapperWithLabel label="ページ数">
          <Form.Control
            type="number"
            {...register(
              'dishSourceRelation.dishSourceRelationDetail.recipeBookPage',
              { valueAsNumber: true },
            )}
            value={dishSourceRelation.recipeBookPage || ''}
            onChange={(e) => {
              editDishSourceRelationDetail({
                recipeBookPage: e.target.value,
              });
            }}
            data-testid="dishSourceRelationDetailRecipeBookPage"
          />
          <ErrorMessageIfExist
            errorMessage={
              errors.dishSourceRelation?.dishSourceRelationDetail
                ?.recipeBookPage
            }
          />
          <input
            type="hidden"
            value={DISH_SOURCE_RELATION_DETAIL_VALUE_TYPE.RECIPE_BOOK_PAGE}
            {...register(
              'dishSourceRelation.dishSourceRelationDetail.detailType',
            )}
          />
        </FormFieldWrapperWithLabel>
      )}
      {(dishSourceType === DISH_SOURCE_TYPE.YOUTUBE ||
        dishSourceType === DISH_SOURCE_TYPE.WEBSITE) && (
        <FormFieldWrapperWithLabel label="レシピURL">
          <Form.Control
            type="text"
            {...register(
              'dishSourceRelation.dishSourceRelationDetail.recipeWebsiteUrl',
            )}
            value={dishSourceRelation.recipeWebsiteUrl || ''}
            onChange={(e) => {
              editDishSourceRelationDetail({
                recipeWebsiteUrl: e.target.value,
              });
            }}
            data-testid="dishSourceRelationDetailRecipeWebsiteUrl"
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
      )}
      {dishSourceType === DISH_SOURCE_TYPE.RESTAURANT && (
        <FormFieldWrapperWithLabel label="メモ">
          <Form.Control
            type="text"
            {...register(
              'dishSourceRelation.dishSourceRelationDetail.recipeSourceMemo',
            )}
            value={dishSourceRelation.recipeSourceMemo || ''}
            onChange={(e) => {
              editDishSourceRelationDetail({
                recipeSourceMemo: e.target.value,
              });
            }}
            data-testid="dishSourceRelationDetailRecipeSourceMemo"
          />
          <ErrorMessageIfExist
            errorMessage={
              errors.dishSourceRelation?.dishSourceRelationDetail
                ?.recipeSourceMemo
            }
          />
          <input
            type="hidden"
            value={DISH_SOURCE_RELATION_DETAIL_VALUE_TYPE.RECIPE_SOURCE_MEMO}
            {...register(
              'dishSourceRelation.dishSourceRelationDetail.detailType',
            )}
          />
        </FormFieldWrapperWithLabel>
      )}
    </>
  );
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
