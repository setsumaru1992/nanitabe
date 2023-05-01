import React from 'react';
import { AddDish } from '../../components/dish/DishForm';
import { DISHSOURCES_PAGE_URL } from '../dishsources';

export default () => {
  return (
    <AddDish
      onAddSucceeded={() => {
        window.location.href = DISHSOURCES_PAGE_URL;
      }}
    />
  );
};
