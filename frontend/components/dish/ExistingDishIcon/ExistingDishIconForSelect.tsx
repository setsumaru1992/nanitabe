import React from 'react';
import classnames from 'classnames';
import style from './ExistingDishIconForSelect.module.scss';

type Props = {
  dish: any;
  selected?: boolean;
  onClick?: () => void;
};

export default (props: Props) => {
  const { dish, onClick, selected } = props;

  const shortDishSourceName = (() => {
    if (!dish.dishSourceName) return null;
    if (dish.dishSourceName.length <= 10) {
      return dish.dishSourceName;
    }
    return `${dish.dishSourceName.slice(0, 10)}...`;
  })();

  return (
    <div className={style['dish-icon__wrap']}>
      <div
        className={classnames({
          [style['icon']]: true,
          [style['dish-icon']]: true,
          [style['dish-icon--selected']]: selected,
        })}
        onClick={() => {
          if (onClick) onClick();
        }}
        data-testid={`existingDish-${dish.id}`}
      >
        {dish.name}
        {shortDishSourceName && (
          <div className={style['dish-icon__source-caption']}>
            {shortDishSourceName}
          </div>
        )}
      </div>
    </div>
  );
};

type NewDishIconForSelectProps = {
  onClick: () => void;
  exampleDishName?: string;
};

export const NewDishIconForSelect = (props: NewDishIconForSelectProps) => {
  const { onClick, exampleDishName } = props;
  const label: string = (() => {
    if (exampleDishName) {
      return `「${exampleDishName}」を料理登録する`;
    }
    return '料理を登録をする';
  })();
  return (
    <div className={style['dish-icon__wrap']}>
      <div
        className={classnames({
          [style['icon']]: true,
          [style['dish-icon']]: true,
        })}
        onClick={() => {
          if (onClick) onClick();
        }}
        data-testid="existingDish-new"
      >
        {label}
      </div>
    </div>
  );
};
