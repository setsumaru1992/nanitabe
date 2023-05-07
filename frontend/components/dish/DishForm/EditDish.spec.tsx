import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import {
  registerMutationHandler,
  registerQueryHandler,
} from '../../../lib/graphql/specHelper/mockServer';
import {
  DishSourcesDocument,
  UpdateDishWithExistingSourceDocument,
} from '../../../lib/graphql/generated/graphql';
import renderWithApollo from '../../specHelper/renderWithApollo';
import EditDish from './EditDish';
import {
  userChooseSelectBox,
  userClearTextbox,
  userClick,
  userType,
  userTypeAfterClearTextBox,
} from '../../specHelper/userEvents';
import { DISH_SOURCE_TYPE } from '../../../features/dish/source/const';

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

  const registeredDishSource = {
    id: 1,
    name: 'りゅうじ',
    type: DISH_SOURCE_TYPE.YOUTUBE,
  };

  const registeredDishSource2 = {
    id: 2,
    name: 'アホアホチャンネル',
    type: DISH_SOURCE_TYPE.WEBSITE,
  };

  const updatedDishSourceRelation = {
    dishId: updatedDish.id,
    dishSourceId: registeredDishSource.id,
    dishSourceType: registeredDishSource.type,
    dishSourceRelationDetail: {
      recipeWebsiteUrl: 'https://youtube/ryuji/gyoza',
    },
  };

  beforeEach(() => {
    registerQueryHandler(DishSourcesDocument, {
      dishSources: [
        {
          __typename: 'DishRegisteredWithMeal',
          ...registeredDishSource,
        },
        {
          __typename: 'DishRegisteredWithMeal',
          ...registeredDishSource2,
        },
      ],
    });
  });

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

    describe('when update update with different one field', () => {
      it('succeeds with expected graphql params', async () => {
        const { getLatestMutationVariables } = registerMutationHandler(
          UpdateDishWithExistingSourceDocument,
          {
            updateDishWithExistingSource: {
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
          UpdateDishWithExistingSourceDocument,
          {
            updateDishWithExistingSource: {
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

    describe('when update update with different source relation', () => {
      it('succeeds with expected graphql params', async () => {
        const { getLatestMutationVariables } = registerMutationHandler(
          UpdateDishWithExistingSourceDocument,
          {
            updateDishWithExistingSource: {
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
        });
      });
    });

    // TODO: page, memoを紐つけるやつも作る
  });

  describe('edit existing dish having dish source relation, ', () => {
    const registeredDishWithDishSourceRelation = {
      ...registeredDish,
      dishSourceRelation: {
        dishSourceId: registeredDishSource2.id,
        recipeWebsiteUrl: 'https://youtube/ahoaho_channel',
        recipeBookPage: undefined,
        recipeSourceMemo: undefined,
      },
    };

    beforeEach(() => {
      renderWithApollo(
        <EditDish
          dish={registeredDishWithDishSourceRelation}
          onSchemaError={(schemaErrors) => {
            console.log('入力値バリデーションエラー');
            console.log(schemaErrors);
            // screen.debug();
          }}
        />,
      );
    });

    describe('when update update with different source relation', () => {
      it('succeeds with expected graphql params', async () => {
        const { getLatestMutationVariables } = registerMutationHandler(
          UpdateDishWithExistingSourceDocument,
          {
            updateDishWithExistingSource: {
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
        });
      });
    });

    describe('when update update with no source relation', () => {
      it('succeeds with expected graphql params', async () => {
        const { getLatestMutationVariables } = registerMutationHandler(
          UpdateDishWithExistingSourceDocument,
          {
            updateDishWithExistingSource: {
              dishId: 1,
            },
          },
        );

        await userChooseSelectBox(screen, 'existingDishSources', [
          'existingDishSource-novalue',
        ]);

        await userClick(screen, 'submitDishButton');

        expect(getLatestMutationVariables()).toEqual({
          dish: {
            ...registeredDish,
          },
          dishSourceRelation: null,
        });
      });
    });
  });
});
