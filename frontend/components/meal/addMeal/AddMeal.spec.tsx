import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import AddMeal from './AddMeal';
import { AddMealWithNewDishAndNewSourceDocument } from '../../../lib/graphql/generated/graphql';
import renderWithApollo from '../../specHelper/renderWithApollo';
import { enterTextBox } from '../../specHelper/eventFirers';
import { registerMutationHandler } from '../../../lib/graphql/specHelper/mockServer';

describe('<AddMeal>', () => {
  describe('when add meal with new dish', () => {
    const newDishWithRequiredParams = {
      name: 'ハンバーグ',
      mealPosition: 2,
    };
    const newMealWithRequiredParams = {
      date: new Date(2022, 1, 1),
      mealType: 3,
    };
    const buildNewMealGraphQLParams = (newMeal) => {
      return {
        ...newMeal,
        date: newMeal.date.toISOString(),
      };
    };
    const { getLatestMutationVariables, mutationInterceptor } =
      registerMutationHandler(AddMealWithNewDishAndNewSourceDocument, {
        addMealWithNewDishAndNewSource: {
          mealId: 1,
        },
      });
    renderWithApollo(<AddMeal defaultDate={newMealWithRequiredParams.date} />);

    it('succeeds with expected required graphql params', async () => {
      enterTextBox(screen, 'dishname', newDishWithRequiredParams.name);
      fireEvent.click(screen.getByTestId('addMealButton'));

      await waitFor(() => expect(mutationInterceptor).toHaveBeenCalledTimes(1));
      expect(getLatestMutationVariables()).toEqual({
        dish: newDishWithRequiredParams,
        meal: buildNewMealGraphQLParams(newMealWithRequiredParams),
      });
    });
  });
});
