import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { registerMutationHandler } from '../../../lib/graphql/specHelper/mockServer';
import { AddDishDocument } from '../../../lib/graphql/generated/graphql';
import renderWithApollo from '../../specHelper/renderWithApollo';
import AddDish from './AddDish';
import { userClick, userType } from '../../specHelper/userEvents';

describe('<AddDish>', () => {
  const newDishWithRequiredParams = {
    name: 'ハンバーグ',
    mealPosition: 2,
  };

  beforeEach(() => {
    renderWithApollo(
      <AddDish
        onSchemaError={(schemaErrors) => {
          // スキーマエラーがあったときテストで把握しやすいようにログに出す
          console.log(schemaErrors);
        }}
      />,
    );
  });

  describe('when add dish', () => {
    it('succeeds with expected graphql params', async () => {
      const { getLatestMutationVariables } = registerMutationHandler(
        AddDishDocument,
        {
          addDish: {
            dishId: 1,
          },
        },
      );

      await userType(screen, 'dishname', newDishWithRequiredParams.name);
      await userClick(screen, 'submitDishButton');

      expect(getLatestMutationVariables()).toEqual({
        dish: newDishWithRequiredParams,
      });
    });
  });
});
