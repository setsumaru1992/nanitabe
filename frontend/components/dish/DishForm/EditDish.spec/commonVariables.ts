import React from 'react';
import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import {
  registerMutationHandler,
  registerQueryHandler,
} from '../../../../lib/graphql/specHelper/mockServer';
import {
  DishSourcesDocument,
  UpdateDishDocument,
  UpdateDishWithNewSourceDocument,
} from '../../../../lib/graphql/generated/graphql';
import renderWithApollo from '../../../specHelper/renderWithApollo';
import EditDish from '../EditDish';
import {
  userChooseSelectBox,
  userClearTextbox,
  userClick,
  userType,
  userTypeAfterClearTextBox,
} from '../../../specHelper/userEvents';
import { DISH_SOURCE_TYPE } from '../../../../features/dish/source/const';

export const registeredDish = {
  id: 55,
  name: '生姜焼き',
  mealPosition: 2,
};

export const updatedDish = {
  id: 55,
  name: '目玉焼き',
  mealPosition: 1,
  comment: null,
};

export const registeredDishSource = {
  id: 1,
  name: 'りゅうじ',
  type: DISH_SOURCE_TYPE.YOUTUBE,
};

export const registeredDishSource2 = {
  id: 2,
  name: 'アホアホチャンネル',
  type: DISH_SOURCE_TYPE.WEBSITE,
};

export const newDishSource = {
  name: '最強のレシピサイト',
  type: DISH_SOURCE_TYPE.WEBSITE,
};

export const registeredDishSourceOfRecipeBook = {
  id: 3,
  name: 'はじめての中華料理',
  type: DISH_SOURCE_TYPE.RECIPE_BOOK,
};

export const registeredDishSourceOfRestaurant = {
  id: 4,
  name: '蒲田',
  type: DISH_SOURCE_TYPE.RESTAURANT,
};

export const newDishSourceRelationDetailOfRecipeWebsite = {
  recipeWebsiteUrl: 'https://youtube/ryuji/gyoza',
};

export const updatedDishSourceRelation = {
  dishId: updatedDish.id,
  dishSourceId: registeredDishSource.id,
  dishSourceType: registeredDishSource.type,
  dishSourceRelationDetail: newDishSourceRelationDetailOfRecipeWebsite,
};

export const updatedDishSourceRelationOfRecipeBook = {
  dishId: updatedDish.id,
  dishSourceId: registeredDishSourceOfRecipeBook.id,
  dishSourceType: registeredDishSourceOfRecipeBook.type,
  dishSourceRelationDetail: {
    recipeBookPage: 50,
  },
};

export const updatedDishSourceRelationOfRestaurant = {
  dishId: updatedDish.id,
  dishSourceId: registeredDishSourceOfRestaurant.id,
  dishSourceType: registeredDishSourceOfRestaurant.type,
  dishSourceRelationDetail: {
    recipeSourceMemo: '改札出て10分',
  },
};

export const registerDishSourcesQuery = () => {
  registerQueryHandler(DishSourcesDocument, {
    dishSources: [
      registeredDishSource,
      registeredDishSource2,
      registeredDishSourceOfRecipeBook,
      registeredDishSourceOfRestaurant,
    ].map((dishSource) => {
      return {
        __typename: 'DishRegisteredWithMeal',
        ...dishSource,
      };
    }),
  });
}
