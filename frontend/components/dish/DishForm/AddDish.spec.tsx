import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import {
  registerMutationHandler,
  registerQueryHandler,
} from '../../../lib/graphql/specHelper/mockServer';
import {
  AddDishDocument,
  DishesDocument,
  DishesPerSourceDocument,
} from '../../../lib/graphql/generated/graphql';
import renderWithApollo from '../../specHelper/renderWithApollo';
import AddDish from './AddDish';
import { userClick, userType } from '../../specHelper/userEvents';

describe('<AddDish>', () => {
  const newDishWithRequiredParams = {
    name: 'ハンバーグ',
    mealPosition: 2,
  };

  beforeEach(() => {
    registerQueryHandler(DishesDocument, {
      dishes: [],
    });
    registerQueryHandler(DishesPerSourceDocument, {
      dishesPerSource: [],
    });

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
      const { getLatestMutationVariables, mutationInterceptor } =
        registerMutationHandler(AddDishDocument, {
          addDish: {
            dishId: 1,
          },
        });

      await userType(screen, 'dishname', newDishWithRequiredParams.name);
      await userClick(screen, 'submitDishButton');

      expect(getLatestMutationVariables()).toEqual({
        dish: newDishWithRequiredParams,
      });
    });
  });
});
