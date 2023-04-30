import { gql } from '@apollo/client';
import { useRemoveMealMutation } from '../../lib/graphql/generated/graphql';
import { buildMutationExecutor } from '../utils/mutationUtils';

export const REMOVE_MEAL = gql`
  mutation removeMeal($mealId: Int!) {
    removeMeal(input: { mealId: $mealId }) {
      mealId
    }
  }
`;

export const useRemoveMeal = () => {
  const [removeMeal, removeMealLoading, removeMealError] =
    buildMutationExecutor<{ mealId: number }>(useRemoveMealMutation);

  return {
    removeMeal,

    removeMealLoading,
    removeMealError,
  };
};
