import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import style from './index.module.scss';
import { Dish } from '../../../lib/graphql/generated/graphql';
import useDish from '../../../features/dish/useDish';

type Props = {
  dish: Dish;
  onChanged?: () => void;
};

export default (props: Props) => {
  const { dish, onChanged } = props;
  const { removeDish } = useDish();

  const handleRemoveDish = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm('本当に削除してもよろしいですか？');
    if (!confirmed) return;
    await removeDish(
      { dishId: dish.id },
      {
        onCompleted: (_) => {
          if (onChanged) onChanged();
        },
      },
    );
  };

  return (
    <div className={classNames(style['dish-icon__container'], style['icon'])}>
      <div className={style['dish-icon__content']}>
        <Link href={`/dishes/${dish.id}/edit`}>{dish.name}</Link>
        &nbsp;
        <a onClick={handleRemoveDish} data-testid="dishDeleteButton">
          ×
        </a>
      </div>
    </div>
  );
};
