import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import DishForm from './DishForm';
import { Dish } from '../../../lib/graphql/generated/graphql';
import useDish, { UpdateDish } from '../../../features/dish/useDish';

type Props = {
  // TODO: ページ表示するときにdishをちゃんと渡す。ついでに選ばれたdishを取得するhookを作って、同時に、dishesとかは必要なときだけ専用パラメータ渡して取得するよう修正
  dish: Dish;
  onEditSucceeded?: () => void;
  onSchemaError?: any;
};

export default (props: Props) => {
  const { dish, onEditSucceeded, onSchemaError } = props;

  const { updateDish, UpdateDishSchema } = useDish();
  const onSubmit: SubmitHandler<UpdateDish> = async (input) => {
    await updateDish(input, {
      onCompleted: (_) => {
        if (onEditSucceeded) onEditSucceeded();
      },
    });
  };

  return (
    <DishForm
      formSchema={UpdateDishSchema}
      onSubmit={onSubmit}
      onSchemaError={onSchemaError}
      registeredDish={dish}
    />
  );
};
