import React from 'react';
import { Form } from 'react-bootstrap';
import { MEAL_POSITIONS, MealPosition } from '../../../../features/dish/const';
import { MEAL_TYPE_LABELS } from '../../../../features/meal/const';

type Props = {
  onClick?: (mealPosition: MealPosition) => void;
  onChange?: (mealPosition: MealPosition) => void;
  selectedMealPosition: MealPosition;
};

export default (props: Props) => {
  const { onClick, onChange, selectedMealPosition } = props;
  return (
    <Form.Group>
      {MEAL_POSITIONS.map((mealPosition) => (
        <Form.Check
          key={mealPosition}
          type="radio"
          inline
          name="meal_type"
          value={mealPosition}
          onClick={() => {
            if (onClick) onClick(mealPosition);
          }}
          onChange={() => {
            if (onChange) onChange(mealPosition);
          }}
          checked={mealPosition === selectedMealPosition}
          label={MEAL_TYPE_LABELS[mealPosition]}
          data-testid={`mealTypeOption-${mealPosition}`}
        />
      ))}
    </Form.Group>
  );
};
