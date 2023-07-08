import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import renderWithApollo from '../../specHelper/renderWithApollo';
import {
    registerMutationHandler,
    registerQueryHandler,
} from '../../../lib/graphql/specHelper/mockServer';
import { userClick } from '../../specHelper/userEvents';
import WeekCalender from '../week/WeekCalender';
import {
    MealsForCalenderDocument, UpdateMealDocument,
} from '../../../lib/graphql/generated/graphql';

jest.mock('next/router', () => require('next-router-mock'));

const buildMealGraphQLParams = (meal) => {
    const { id, date, mealType, dish} = meal;
    return {
        id, mealType, dish,
        comment: null,
        date: date.toISOString(),
        __typename: 'MealForCalender',
    };
};

describe('move dish on week calender', () => {
    const registeredDish = {
        id: 55,
        name: '生姜焼き',
        mealPosition: 2,
        comment: null,
        dishSourceName: null,
    };
    const registeredMealWithoutDish = {
        id: 30,
        date: new Date(2023, 5, 26),
        mealType: 3,
        comment: null,
    };
    const registeredMeal = {
        ...registeredMealWithoutDish,
        dish: registeredDish,
    };

    const moveTargetDate = new Date(2023, 5, 27);
    const movedMeal = {
        ...registeredMeal,
        date: moveTargetDate,
    }

    beforeEach(() => {
        registerQueryHandler(MealsForCalenderDocument, {
            mealsForCalender: [
                {
                    __typename: 'MealsOfDate',
                    date: "2023-06-26",
                    meals: [
                        {
                            __typename: 'MealForCalender',
                            ...registeredMeal
                        }
                    ]
                }
            ],
        });

        renderWithApollo(<WeekCalender date={registeredMealWithoutDish.date} />);
    });

    describe('when assign dish', () => {
        it('succeeds with expected graphql params', async () => {
            const { getLatestMutationVariables } = registerMutationHandler(
              UpdateMealDocument,
              {
                  updateMeal: {
                      mealId: registeredMeal.id,
                  },
              },
            );

            await userClick(screen, `mealMenuOpener-${registeredMeal.id}`);
            await userClick(screen, 'mealMoveButton');
            await userClick(
              screen,
              `weekCalendarDateOf${moveTargetDate.toISOString()}`,
            );

            expect(getLatestMutationVariables()).toEqual({
                dishId: registeredDish.id,
                meal: buildMealGraphQLParams(movedMeal),
            });
        });
    });
});
