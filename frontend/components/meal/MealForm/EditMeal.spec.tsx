import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import EditMeal from './EditMeal';
import renderWithApollo from '../../specHelper/renderWithApollo';
import {
  enterTextBox,
  userChooseSelectBox,
  userClick,
  userType,
} from '../../specHelper/userEvents';
import {
  registerMutationHandler,
  registerQueryHandler,
} from '../../../lib/graphql/specHelper/mockServer';
import {
  UpdateMealWithNewDishAndNewSourceDocument,
  UpdateMealDocument,
  DishesDocument,
  DishSourcesDocument,
} from '../../../lib/graphql/generated/graphql';
import { buildISODateString } from '../../../features/utils/dateUtils';

const clickSubmitButton = async () => {
  await userClick(screen, 'submitMealButton');
};

const buildGraphQLMeal = (meal) => {
  return {
    ...meal,
    date: meal.date.toISOString(),
  };
};

describe('<EditMeal>', () => {
  const registeredDish = {
    id: 55,
    name: '生姜焼き',
    mealPosition: 2,
    comment: null,
  };
  const registeredMealWithoutDish = {
    id: 30,
    date: new Date(2022, 1, 1),
    mealType: 3,
  };
  const registeredMeal = {
    ...registeredMealWithoutDish,
    dish: registeredDish,
  };

  const updatedDish = {
    id: 57,
    name: '目玉焼き',
    mealPosition: 1,
    comment: null,
  };
  const updatedMeal = {
    id: 30,
    date: new Date(2023, 2, 2),
    mealType: 2,
  };

  const newDishWithRequiredParams = {
    name: 'カレー',
    mealPosition: 3,
  };

  const registeredDishSource = {
    ...selectedDishSource,
    name: 'りゅうじ',
  };

  beforeEach(() => {
    registerQueryHandler(DishesDocument, {
      dishes: [
        {
          __typename: 'Dish',
          ...registeredDish,
        },
        {
          __typename: 'Dish',
          ...updatedDish,
        },
      ],
    });

    registerQueryHandler(DishSourcesDocument, {
      dishSources: [registeredDishSource].map((dishSource) => {
        return {
          __typename: 'DishRegisteredWithMeal',
          ...dishSource,
        };
      }),
    });
  });

  describe('edit existing meal having only meal and dish fields, ', () => {
    beforeEach(() => {
      renderWithApollo(
        <EditMeal
          meal={buildGraphQLMeal(registeredMeal)}
          onSchemaError={(schemaErrors) => {
            // スキーマエラーがあったときテストで把握しやすいようにログに出す
            console.log(schemaErrors);
            // screen.debug();
          }}
        />,
      );
    });
    describe('when update meal with different one field', () => {
      it('succeeds with expected required graphql params', async () => {
        const { getLatestMutationVariables } = registerMutationHandler(
          UpdateMealDocument,
          {
            updateMeal: {
              mealId: registeredMeal.id,
            },
          },
        );

        await userChooseSelectBox(screen, 'mealTypeOptions', [
          `mealTypeOption-${updatedMeal.mealType}`,
        ]);
        await clickSubmitButton();

        expect(getLatestMutationVariables()).toEqual({
          dishId: registeredDish.id,
          meal: buildGraphQLMeal({
            ...registeredMealWithoutDish,
            mealType: updatedMeal.mealType,
          }),
        });
      });
    });

    describe('when update meal with different existing dish', () => {
      it('succeeds with expected required graphql params', async () => {
        const { getLatestMutationVariables } = registerMutationHandler(
          UpdateMealDocument,
          {
            updateMeal: {
              mealId: registeredMeal.id,
            },
          },
        );

        await userChooseSelectBox(screen, 'existingDishes', [
          `existingDish-${updatedDish.id}`,
        ]);
        await clickSubmitButton();

        expect(getLatestMutationVariables()).toEqual({
          dishId: updatedDish.id,
          meal: buildGraphQLMeal(registeredMealWithoutDish),
        });
      });
    });

    describe('when update meal with different all meal fields', () => {
      it('succeeds with expected required graphql params', async () => {
        const { getLatestMutationVariables } = registerMutationHandler(
          UpdateMealDocument,
          {
            updateMeal: {
              mealId: registeredMeal.id,
            },
          },
        );

        enterTextBox(screen, 'mealDate', buildISODateString(updatedMeal.date));
        await userChooseSelectBox(screen, 'mealTypeOptions', [
          `mealTypeOption-${updatedMeal.mealType}`,
        ]);
        await userChooseSelectBox(screen, 'existingDishes', [
          `existingDish-${updatedDish.id}`,
        ]);
        await clickSubmitButton();

        expect(getLatestMutationVariables()).toEqual({
          dishId: updatedDish.id,
          meal: buildGraphQLMeal(updatedMeal),
        });
      });
    });

    describe('when update meal with new dish', () => {
      it('succeeds with expected required graphql params', async () => {
        const { getLatestMutationVariables } = registerMutationHandler(
          UpdateMealWithNewDishAndNewSourceDocument,
          {
            updateMealWithNewDishAndNewSource: {
              mealId: registeredMeal.id,
              dishId: 1,
              dishSourceId: 1,
            },
          },
        );

        await userClick(screen, 'optionOfRegisteringNewDish');
        await userType(screen, 'dishname', newDishWithRequiredParams.name);
        await userChooseSelectBox(screen, 'mealPositionOptions', [
          `mealPositionOption-${newDishWithRequiredParams.mealPosition}`,
        ]);
        await clickSubmitButton();

        expect(getLatestMutationVariables()).toEqual({
          dish: newDishWithRequiredParams,
          meal: buildGraphQLMeal(registeredMealWithoutDish),
        });
      });
    });
  });

  describe('edit existing meal having dish source relation, ', () => {});
});
