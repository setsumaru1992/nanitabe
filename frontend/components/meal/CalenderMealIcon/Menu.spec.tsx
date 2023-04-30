import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import Menu from './Menu';
import renderWithApollo from '../../specHelper/renderWithApollo';
import { registerMutationHandler } from '../../../lib/graphql/specHelper/mockServer';
import { RemoveMealDocument } from '../../../lib/graphql/generated/graphql';
import { userClick } from '../../specHelper/userEvents';

describe('<Menu>', () => {
  const registeredDish = {
    id: 55,
    name: '生姜焼き',
    mealPosition: 2,
    comment: null,
  };
  const registeredMeal = {
    id: 30,
    date: new Date(2022, 1, 1),
    mealType: 3,
    dish: registeredDish,
  };
  beforeEach(() => {
    const mockCallWindow = jest.fn(() => true);
    window.confirm = mockCallWindow;
    renderWithApollo(<Menu meal={registeredMeal} closeSelf={() => {}} />);
  });

  describe('when remove meal', () => {
    it('succeeds with expected required graphql params', async () => {
      const { getLatestMutationVariables } = registerMutationHandler(
        RemoveMealDocument,
        {
          removeMeal: {
            mealId: registeredMeal.id,
          },
        },
      );

      await userClick(screen, 'mealDeleteButton');

      expect(getLatestMutationVariables()).toEqual({
        mealId: registeredMeal.id,
      });
    });
  });
});
