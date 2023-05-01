import { gql } from '@apollo/client';
import * as z from 'zod';

export const UPDATE_DISH = gql`
  mutation updateDish($dish: DishForUpdate!) {
    updateDish(input: { dish: $dish }) {
      dishId
    }
  }
`;
