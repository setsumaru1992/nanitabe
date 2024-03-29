import { useFormContext } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import {
  DISH_SOURCE_TYPE,
  DISH_SOURCE_TYPES,
  DishSourceType,
} from '../../../../features/dish/source/const';
import FormFieldWrapperWithLabel from '../../../common/form/FormFieldWrapperWithLabel';
import ErrorMessageIfExist from '../../../common/form/ErrorMessageIfExist';
import {
  DISH_SOURCE_RELATION_DETAIL_VALUE_TYPE,
  dishSourceRelationDetailOf,
} from '../../../../features/dish/schema';
import { DishSourceRelation } from '../../../../lib/graphql/generated/graphql';

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
    recipeBookPage: null,
    recipeWebsiteUrl: '',
    recipeSourceMemo: '',
  };
  useEffect(() => {
    setDishSourceRelation((prevState) => ({
      ...prevState,
      ...existingDishSourceRelation,
    }));
  }, [
    dishSourceType,
    existingDishSourceRelation.recipeBookPage,
    existingDishSourceRelation.recipeWebsiteUrl,
    existingDishSourceRelation.recipeSourceMemo,
  ]);
  const editDishSourceRelationDetail = (params: {
    recipeBookPage?: number | null;
    recipeWebsiteUrl?: string;
    recipeSourceMemo?: string;
  }) => {
    setDishSourceRelation({
      ...dishSourceRelation,
      ...params,
    });
  };

  const detailType = dishSourceRelationDetailOf(dishSourceType);

  return (
    <>
      <input
        type="hidden"
        value={detailType}
        {...register('dishSourceRelation.dishSourceRelationDetail.detailType')}
      />
      {detailType ===
        DISH_SOURCE_RELATION_DETAIL_VALUE_TYPE.RECIPE_BOOK_PAGE && (
        <FormFieldWrapperWithLabel label="ページ数">
          <Form.Control
            type="number"
            {...register(
              'dishSourceRelation.dishSourceRelationDetail.recipeBookPage',
              { valueAsNumber: true },
            )}
            value={dishSourceRelation.recipeBookPage || ''}
            onChange={(e) => {
              const enteredValue = e.target.value;
              const page = Number.isNaN(enteredValue)
                ? null
                : Number(enteredValue);
              editDishSourceRelationDetail({
                recipeBookPage: page,
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
        </FormFieldWrapperWithLabel>
      )}
      {detailType ===
        DISH_SOURCE_RELATION_DETAIL_VALUE_TYPE.RECIPE_WEBSITE_URL && (
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
        </FormFieldWrapperWithLabel>
      )}
      {detailType ===
        DISH_SOURCE_RELATION_DETAIL_VALUE_TYPE.RECIPE_SOURCE_MEMO && (
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
        </FormFieldWrapperWithLabel>
      )}
    </>
  );
};
