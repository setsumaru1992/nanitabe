import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import AddMeal from './AddMeal';
import {
  AddMealWithNewDishAndNewSourceDocument,
  AddMealWithExistingDishAndExistingSourceDocument,
} from '../../../lib/graphql/generated/graphql';
import renderWithApollo from '../../specHelper/renderWithApollo';
import {
  enterTextBox,
  userChooseSelectBox,
  userClick,
} from '../../specHelper/userEvents';
import { registerMutationHandler } from '../../../lib/graphql/specHelper/mockServer';

const buildNewMealGraphQLParams = (newMeal) => {
  return {
    ...newMeal,
    date: newMeal.date.toISOString(),
  };
};

describe('<AddMeal>', () => {
  const newDishWithRequiredParams = {
    name: 'ハンバーグ',
    mealPosition: 2,
  };
  const newMealWithRequiredParams = {
    date: new Date(2022, 1, 1),
    mealType: 3,
  };

  beforeEach(() => {
    renderWithApollo(<AddMeal defaultDate={newMealWithRequiredParams.date} />);
  });

  describe('when add meal with new dish', () => {
    it('succeeds with expected required graphql params', async () => {
      const { getLatestMutationVariables, mutationInterceptor } =
        registerMutationHandler(AddMealWithNewDishAndNewSourceDocument, {
          addMealWithNewDishAndNewSource: {
            mealId: 1,
          },
        });

      enterTextBox(screen, 'dishname', newDishWithRequiredParams.name);
      fireEvent.click(screen.getByTestId('addMealButton'));

      // fireEvent.clickなどで非同期イベントが起きたときに、非同期イベント終了を待つのに、クリックなどをactでくくるか結果をwaitForで待つ必要がある
      await waitFor(() => expect(mutationInterceptor).toHaveBeenCalledTimes(1));
      expect(getLatestMutationVariables()).toEqual({
        dish: newDishWithRequiredParams,
        meal: buildNewMealGraphQLParams(newMealWithRequiredParams),
      });
    });
  });

  describe('when add meal with existing dish', () => {
    it('succeeds with expected required graphql params', async () => {
      const { getLatestMutationVariables } = registerMutationHandler(
        AddMealWithExistingDishAndExistingSourceDocument,
        {
          addMealWithExistingDishAndExistingSource: {
            mealId: 1,
          },
        },
      );

      await userClick(screen, 'optionOfUsingExistingDish');
      await userChooseSelectBox(screen, 'existingDishes', ['existingDish-1']);
      await userClick(screen, 'addMealButton');

      expect(getLatestMutationVariables()).toEqual({
        dishId: 1, // TODO: Queryモックの返り値の変数を使用
        meal: buildNewMealGraphQLParams(newMealWithRequiredParams),
      });
    });
  });
});
