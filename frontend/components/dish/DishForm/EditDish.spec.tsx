import React from 'react';
import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import {
  registerMutationHandler,
  registerQueryHandler,
} from '../../../lib/graphql/specHelper/mockServer';
import {
  DishSourcesDocument,
  UpdateDishDocument,
  UpdateDishWithNewSourceDocument,
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

  const newDishSource = {
    name: '最強のレシピサイト',
    type: DISH_SOURCE_TYPE.WEBSITE,
  };

  const registeredDishSourceOfRecipeBook = {
    id: 3,
    name: 'はじめての中華料理',
    type: DISH_SOURCE_TYPE.RECIPE_BOOK,
  };

  const registeredDishSourceOfRestaurant = {
    id: 4,
    name: '蒲田',
    type: DISH_SOURCE_TYPE.RESTAURANT,
  };

  const newDishSourceRelationDetailOfRecipeWebsite = {
    recipeWebsiteUrl: 'https://youtube/ryuji/gyoza',
  };

  const newDishTag = {
    content: '白ワインに合う',
  };

  const updatedDishSourceRelation = {
    dishId: updatedDish.id,
    dishSourceId: registeredDishSource.id,
    dishSourceType: registeredDishSource.type,
    dishSourceRelationDetail: newDishSourceRelationDetailOfRecipeWebsite,
  };

  const updatedDishSourceRelationOfRecipeBook = {
    dishId: updatedDish.id,
    dishSourceId: registeredDishSourceOfRecipeBook.id,
    dishSourceType: registeredDishSourceOfRecipeBook.type,
    dishSourceRelationDetail: {
      recipeBookPage: 50,
    },
  };

  const updatedDishSourceRelationOfRestaurant = {
    dishId: updatedDish.id,
    dishSourceId: registeredDishSourceOfRestaurant.id,
    dishSourceType: registeredDishSourceOfRestaurant.type,
    dishSourceRelationDetail: {
      recipeSourceMemo: '改札出て10分',
    },
  };

  beforeEach(() => {
    registerQueryHandler(DishSourcesDocument, {
      dishSources: [
        registeredDishSource,
        registeredDishSource2,
        registeredDishSourceOfRecipeBook,
        registeredDishSourceOfRestaurant,
      ].map((dishSource) => {
        return {
          __typename: 'DishRegisteredWithMeal',
          ...dishSource,
        };
      }),
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
          dishTags: [],
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
        await userClick(
          screen,
          `mealPositionOption-${updatedDish.mealPosition}`,
        );
        await userClick(screen, 'submitDishButton');

        expect(getLatestMutationVariables()).toEqual({
          dish: {
            ...registeredDish,
            name: updatedDish.name,
            mealPosition: updatedDish.mealPosition,
          },
          dishSourceRelation: null,
          dishTags: [],
        });
      });
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
          });
        });
      });
    });
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

    describe('when update update with no source relation', () => {
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
          'existingDishSource-novalue',
        ]);

        await userClick(screen, 'submitDishButton');

        expect(getLatestMutationVariables()).toEqual({
          dish: {
            ...registeredDish,
          },
          dishSourceRelation: null,
          dishTags: [],
        });
      });
    });
  });

  describe('edit existing dish updating tag, ', () => {
    describe('when update update with new tag', () => {
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

        await userClick(screen, 'appendDishTag');
        await userType(screen, 'newDishTag-0', newDishTag.content);
  
        await userClick(screen, 'submitDishButton');

        expect(getLatestMutationVariables()).toEqual({
          dish: {
            ...registeredDish,
            name: updatedDish.name,
          },
          dishSourceRelation: null,
          dishTags: [
            { content: newDishTag.content }
          ],
        });
      });
    });

    describe('when update update with removing tag', () => {
      beforeEach(() => {
        const registeredDishWithOneTag = {
          ...registeredDish,
          tags: [
            { id: 1, content: newDishTag.content },
          ]
        };

        renderWithApollo(
          <EditDish
            dish={registeredDishWithOneTag}
            onSchemaError={(schemaErrors) => {
              console.log('入力値バリデーションエラー');
              // スキーマエラーがあったときテストで把握しやすいようにログに出す
              console.log(schemaErrors);
              // screen.debug();
            }}
          />,
        );
      });
      
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

        await userType(screen, 'removeDishTag-0', newDishTag.content);
  
        await userClick(screen, 'submitDishButton');

        expect(getLatestMutationVariables()).toEqual({
          dish: {
            ...registeredDish,
            name: updatedDish.name,
          },
          dishSourceRelation: null,
          dishTags: [],
        });
      });
    });
  });

  describe('when update update with removing existing tag and appending new tag', () => {
    const existingTag1 = {id: 4, content: '1個目のターグ'};
    const existingTag2 = {id: 7, content: '2個目のたぐんちゅ'};
    const registeredDishWithTwoTag = {
      ...registeredDish,
      tags: [existingTag1, existingTag2]
    };

    beforeEach(() => {
      renderWithApollo(
        <EditDish
          dish={registeredDishWithTwoTag}
          onSchemaError={(schemaErrors) => {
            console.log('入力値バリデーションエラー');
            // スキーマエラーがあったときテストで把握しやすいようにログに出す
            console.log(schemaErrors);
            // screen.debug();
          }}
        />,
      );
    });
    
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

      await userClick(screen, 'appendDishTag');
      await userType(screen, 'newDishTag-2', newDishTag.content);

      await userType(screen, 'removeDishTag-0', newDishTag.content);

      await userClick(screen, 'submitDishButton');

      expect(getLatestMutationVariables()).toEqual({
        dish: {
          ...registeredDish,
          name: updatedDish.name,
        },
        dishSourceRelation: null,
        dishTags: [
          existingTag2,
          { content: newDishTag.content },
        ],
      });
    });
  });
});
