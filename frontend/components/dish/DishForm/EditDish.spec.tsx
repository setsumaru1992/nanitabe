import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { registerMutationHandler } from '../../../lib/graphql/specHelper/mockServer';
import { UpdateDishDocument } from '../../../lib/graphql/generated/graphql';
import renderWithApollo from '../../specHelper/renderWithApollo';
import EditDish from './EditDish';
import {
  userChooseSelectBox,
  userClearTextbox,
  userClick,
  userType,
} from '../../specHelper/userEvents';

describe('<EditDish>', () => {
  const registeredDish = {
    id: 55,
    name: '生姜焼き',
    mealPosition: 2,
  };

  const updatedDish = {
    id: 55,
    name: '目玉焼き',
    mealPosition: 1,
    comment: null,
  };

  beforeEach(() => {
    renderWithApollo(
      <EditDish
        dish={registeredDish}
        onSchemaError={(schemaErrors) => {
          // スキーマエラーがあったときテストで把握しやすいようにログに出す
          console.log(schemaErrors);
          screen.debug();
        }}
      />,
    );
  });

  describe('when update update with different one field', () => {
    it('succeeds with expected graphql params', async () => {
      const { getLatestMutationVariables } = registerMutationHandler(
        UpdateDishDocument,
        {
          updateDish: {
            dishId: 1,
          },
        },
      );

      await userClearTextbox(screen, 'dishname');
      await userType(screen, 'dishname', updatedDish.name);
      await userClick(screen, 'submitDishButton');

      expect(getLatestMutationVariables()).toEqual({
        dish: {
          ...registeredDish,
          name: updatedDish.name,
        },
        dishSourceRelation: null,
      });
    });
  });

  describe('when update update with different all dish field', () => {
    it('succeeds with expected graphql params', async () => {
      const { getLatestMutationVariables } = registerMutationHandler(
        UpdateDishDocument,
        {
          updateDish: {
            dishId: 1,
          },
        },
      );

      await userClearTextbox(screen, 'dishname');
      await userType(screen, 'dishname', updatedDish.name);
      await userChooseSelectBox(screen, 'mealPositionOptions', [
        `mealPositionOption-${updatedDish.mealPosition}`,
      ]);
      await userClick(screen, 'submitDishButton');

      expect(getLatestMutationVariables()).toEqual({
        dish: {
          ...registeredDish,
          name: updatedDish.name,
          mealPosition: updatedDish.mealPosition,
        },
        dishSourceRelation: null,
      });
    });
  });
});
