import React from 'react';
import classnames from 'classnames';
import style from './Menu.module.scss';
import useFullScreenModal from '../../../common/modal/useFullScreenModal';
import { MealForCalender } from '../../../../lib/graphql/generated/graphql';
import useMeal from '../../../../features/meal/useMeal';
import { EditMeal } from '../../../meal/MealForm';
import EvaluateDish from '../../../dish/EvaluateDish';

type Props = {
  meal: MealForCalender;
  closeSelf: () => void;
  onChanged?: () => void;
  calenderModeChangers: any;
};

export default (props: Props) => {
  const { meal, onChanged, closeSelf, calenderModeChangers } = props;
  const EditMealModal = useFullScreenModal({
    onClose: () => {
      closeSelf();
    },
  });
  const EvaluateDishModal = useFullScreenModal({
    onClose: () => {
      closeSelf();
    },
  });

  const { startMovingDishMode } = calenderModeChangers;

  const { removeMeal } = useMeal();
  const handleRemoveMeal = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm('本当に削除してもよろしいですか？');
    if (!confirmed) return;
    await removeMeal(
      { mealId: meal.id },
      {
        onCompleted: (_) => {
          if (onChanged) onChanged();
        },
      },
    );
  };

  return (
    <ul className={classnames(style['menu'])}>
      <li className={classnames(style['menu__row'])}>
        <EditMealModal.FullScreenModalOpener>
          <a className={classnames(style['menu__content'])}>修正</a>
        </EditMealModal.FullScreenModalOpener>
        <EditMealModal.FullScreenModal title="食事修正">
          <EditMeal
            meal={meal}
            onEditSucceeded={() => {
              EditMealModal.closeModal();
              if (onChanged) onChanged();
            }}
          />
        </EditMealModal.FullScreenModal>
      </li>
      <li className={classnames(style['menu__row'])}>
        <EvaluateDishModal.FullScreenModalOpener>
          <a className={classnames(style['menu__content'])}>評価</a>
        </EvaluateDishModal.FullScreenModalOpener>
        <EvaluateDishModal.FullScreenModal title="食事評価">
          <EvaluateDish
            dishId={meal.dish.id}
            onEditSucceeded={() => {
              EvaluateDishModal.closeModal();
              if (onChanged) onChanged();
            }}
          />
        </EvaluateDishModal.FullScreenModal>
      </li>
      <li className={classnames(style['menu__row'])}>
        <a
          className={classnames(style['menu__content'])}
          onClick={() => {
            closeSelf();
            startMovingDishMode(meal);
          }}
          data-testid="mealMoveButton"
        >
          移動
        </a>
      </li>
      <li className={classnames(style['menu__row'])}>
        <a
          className={classnames(style['menu__content'])}
          onClick={handleRemoveMeal}
          data-testid="mealDeleteButton"
        >
          削除
        </a>
      </li>
    </ul>
  );
};
