import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import EditMeal from './index';
import renderWithApollo from '../../specHelper/renderWithApollo';
import {
  enterTextBox,
  userChooseSelectBox,
  userClick,
} from '../../specHelper/userEvents';
import {
  registerMutationHandler,
  registerQueryHandler,
} from '../../../lib/graphql/specHelper/mockServer';
import {
  UpdateMealWithNewDishAndNewSourceDocument,
  UpdateMealWithExistingDishDocument,
  DishesDocument,
} from '../../../lib/graphql/generated/graphql';

const clickSubmitButton = async () => {
  // TODO: 登録・編集に合うテストIDに変更
  await userClick(screen, 'addMealButton');
};

const buildGraphQLMeal = (meal) => {
  return {
    ...meal,
    date: meal.date.toISOString(),
  };
};

describe('<EditMeal>', () => {
  const registeredDish = {
    id: 55,
    name: '生姜焼き',
    mealPosition: 2,
    comment: null,
  };
  const registeredMealWithoutDish = {
    id: 30,
    date: new Date(2022, 1, 1),
    mealType: 3,
  };
  const registeredMeal = {
    ...registeredMealWithoutDish,
    dish: registeredDish,
  };

  const updatedDish = {
    id: 57,
    name: '目玉焼き',
    mealPosition: 1,
    comment: null,
  };
  const updatedMeal = {
    id: 30,
    date: new Date(2023, 2, 2),
    mealType: 2,
  };

  beforeEach(() => {
    registerQueryHandler(DishesDocument, {
      dishes: [
        {
          __typename: 'Dish',
          ...registeredDish,
        },
        {
          __typename: 'Dish',
          ...updatedDish,
        },
      ],
    });

    renderWithApollo(
      <EditMeal
        meal={registeredMeal}
        onSchemaError={(schemaErrors) => {
          // スキーマエラーがあったときテストで把握しやすいようにログに出す
          console.log(schemaErrors);
          screen.debug();
        }}
      />,
    );
  });

  describe('when update meal with different one field', () => {
    it('succeeds with expected required graphql params', async () => {
      const { getLatestMutationVariables, mutationInterceptor } =
        registerMutationHandler(UpdateMealWithExistingDishDocument, {
          updateMealWithExistingDish: {
            mealId: registeredMeal.id,
          },
        });

      await userChooseSelectBox(screen, 'mealTypeOptions', [
        `mealTypeOption-${updatedMeal.mealType}`,
      ]);
      await clickSubmitButton();

      expect(getLatestMutationVariables()).toEqual({
        dishId: registeredDish.id,
        meal: buildGraphQLMeal({
          ...registeredMealWithoutDish,
          mealType: updatedMeal.mealType,
        }),
      });
    });
  });

  // describe('when update meal with different existing dish', () => {});
  //
  // describe('when update meal with different all fields', () => {});
  //
  // describe('when update meal with new dish', () => {});
});
