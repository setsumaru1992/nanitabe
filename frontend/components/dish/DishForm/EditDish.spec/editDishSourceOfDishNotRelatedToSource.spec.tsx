import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import {
  registerMutationHandler,
} from '../../../../lib/graphql/specHelper/mockServer';
import {
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
import { 
  registeredDish,
  updatedDish,
  registeredDishSource,
  updatedDishSourceRelation,
  registeredDishSourceOfRecipeBook,
  updatedDishSourceRelationOfRecipeBook,
  registeredDishSourceOfRestaurant,
  updatedDishSourceRelationOfRestaurant,
  newDishSourceRelationDetailOfRecipeWebsite,
  newDishSource,
  registerDishSourcesQuery,
} from './commonVariables';

beforeEach(() => {
  registerDishSourcesQuery();
});

describe('<EditDish>', () => {
  describe('edit existing dish having only dish fields, ', () => {
    beforeEach(() => {
      renderWithApollo(
        <EditDish
          dish={registeredDish}
          onSchemaError={(schemaErrors) => {
            console.log('入力値バリデーションエラー');
            // スキーマエラーがあったときテストで把握しやすいようにログに出す
            console.log(schemaErrors);
            // screen.debug();
          }}
        />,
      );
    });

    

    describe('about source relation', () => {
      describe('when update update with different source relation', () => {
        it('succeeds with expected graphql params', async () => {
          const { getLatestMutationVariables } = registerMutationHandler(
            UpdateDishDocument,
            {
              updateDish: {
                dishId: 1,
              },
            },
          );

          await userChooseSelectBox(screen, 'existingDishSources', [
            `existingDishSource-${registeredDishSource.id}`,
          ]);

          await userTypeAfterClearTextBox(
            screen,
            'dishSourceRelationDetailRecipeWebsiteUrl',
            updatedDishSourceRelation.dishSourceRelationDetail.recipeWebsiteUrl,
          );

          await userClick(screen, 'submitDishButton');

          expect(getLatestMutationVariables()).toEqual({
            dish: {
              ...registeredDish,
            },
            dishSourceRelation: updatedDishSourceRelation,
            dishTags: [],
          });
        });
      });

      describe('when update update with recipe book source relation', () => {
        it('succeeds with expected graphql params', async () => {
          const { getLatestMutationVariables } = registerMutationHandler(
            UpdateDishDocument,
            {
              updateDish: {
                dishId: 1,
              },
            },
          );

          await userChooseSelectBox(screen, 'existingDishSources', [
            `existingDishSource-${registeredDishSourceOfRecipeBook.id}`,
          ]);

          await userType(
            screen,
            'dishSourceRelationDetailRecipeBookPage',
            String(
              updatedDishSourceRelationOfRecipeBook.dishSourceRelationDetail
                .recipeBookPage,
            ),
          );

          await userClick(screen, 'submitDishButton');

          expect(getLatestMutationVariables()).toEqual({
            dish: {
              ...registeredDish,
            },
            dishSourceRelation: updatedDishSourceRelationOfRecipeBook,
            dishTags: [],
          });
        });
      });

      describe('when update update with source memo source relation', () => {
        it('succeeds with expected graphql params', async () => {
          const { getLatestMutationVariables } = registerMutationHandler(
            UpdateDishDocument,
            {
              updateDish: {
                dishId: 1,
              },
            },
          );

          await userChooseSelectBox(screen, 'existingDishSources', [
            `existingDishSource-${registeredDishSourceOfRestaurant.id}`,
          ]);

          await userTypeAfterClearTextBox(
            screen,
            'dishSourceRelationDetailRecipeSourceMemo',
            updatedDishSourceRelationOfRestaurant.dishSourceRelationDetail
              .recipeSourceMemo,
          );

          await userClick(screen, 'submitDishButton');

          expect(getLatestMutationVariables()).toEqual({
            dish: {
              ...registeredDish,
            },
            dishSourceRelation: updatedDishSourceRelationOfRestaurant,
            dishTags: [],
          });
        });
      });

      describe('when update dish with new source relation', () => {
        it('succeeds with expected graphql params', async () => {
          const { getLatestMutationVariables } = registerMutationHandler(
            UpdateDishWithNewSourceDocument,
            {
              updateDishWithNewSource: {
                dishId: 1,
              },
            },
          );

          await userClick(screen, 'optionOfRegisteringNewDishSource');

          await userType(screen, 'dishSourceName', newDishSource.name);
          await userChooseSelectBox(screen, 'dishSourceTypeOption', [
            `dishSourceTypeOption-${newDishSource.type}`,
          ]);
          await userTypeAfterClearTextBox(
            screen,
            'dishSourceRelationDetailRecipeWebsiteUrl',
            newDishSourceRelationDetailOfRecipeWebsite.recipeWebsiteUrl,
          );

          await userClick(screen, 'submitDishButton');

          expect(getLatestMutationVariables()).toEqual({
            dish: {
              ...registeredDish,
            },
            dishSource: newDishSource,
            dishSourceRelationDetail:
              newDishSourceRelationDetailOfRecipeWebsite,
            dishTags: [],
          });
        });
      });
    });
  });
});