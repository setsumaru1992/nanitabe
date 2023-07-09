import React from 'react';
import { Form } from 'react-bootstrap';
import {
  MEAL_POSITION_LABELS,
  MEAL_POSITIONS,
  MealPosition,
} from '../../../../features/dish/const';

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
          name="meal_position"
          value={mealPosition}
          onClick={() => {
            if (onClick) onClick(mealPosition);
          }}
          onChange={() => {
            if (onChange) onChange(mealPosition);
          }}
          checked={mealPosition === selectedMealPosition}
          label={MEAL_POSITION_LABELS[mealPosition]}
          id={`mealPositionOption-${mealPosition}`}
          data-testid={`mealPositionOption-${mealPosition}`}
        />
      ))}
    </Form.Group>
  );
};
