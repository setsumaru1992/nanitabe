import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { registerMutationHandler } from '../../../lib/graphql/specHelper/mockServer';
import Icon from './index';
import renderWithApollo from '../../specHelper/renderWithApollo';
import { RemoveDishDocument } from '../../../lib/graphql/generated/graphql';
import { userClick } from '../../specHelper/userEvents';

describe('<Icon>', () => {
  const registeredDish = {
    id: 55,
    name: '生姜焼き',
    mealPosition: 2,
  };

  beforeEach(() => {
    renderWithApollo(<Icon dish={registeredDish} />);
  });

  describe('when remove dish', () => {
    it('succeeds with expected required graphql params', async () => {
      const { getLatestMutationVariables } = registerMutationHandler(
        RemoveDishDocument,
        {
          removeDish: {
            dishId: registeredDish.id,
          },
        },
      );

      await userClick(screen, 'dishDeleteButton');

      expect(getLatestMutationVariables()).toEqual({
        dishId: registeredDish.id,
      });
    });
  });
});
