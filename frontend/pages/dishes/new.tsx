import React from 'react';
import { useSearchParams } from 'next/navigation';
import { AddDish } from '../../components/dish/DishForm';
import { DISHSOURCES_PAGE_URL } from '../dishsources';
import { parseIntOrNull } from '../../features/utils/numberUtils';

export default () => {
  const searchParams = useSearchParams();
  const preFilledDish = (() => {
    const dish = {};
    const mealPosition = parseIntOrNull(searchParams.get('mealPosition'));
    if (mealPosition) {
      dish['mealPosition'] = mealPosition;
    }

    const dishSourceId = parseIntOrNull(searchParams.get('dishSourceId'));
    if (dishSourceId) {
      dish['dishSourceRelation'] = { dishSourceId };
    }

    return dish;
  })();
  return (
    <AddDish
      onFinishAddingComplately={() => {
        window.location.href = DISHSOURCES_PAGE_URL;
      }}
      preFilledDish={preFilledDish}
    />
  );
};
