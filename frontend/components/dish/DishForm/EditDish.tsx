import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import DishForm, { DishSourceFormRelationContent } from './DishForm';
import { Dish } from '../../../lib/graphql/generated/graphql';
import useDish, { UpdateDish } from '../../../features/dish/useDish';
import { DISH_SOURCE_TYPE } from '../../../features/dish/source/const';

type Props = {
  dish: Dish;
  onEditSucceeded?: () => void;
  onSchemaError?: any;
};

export default (props: Props) => {
  const { dish, onEditSucceeded, onSchemaError } = props;

  const { updateDish, UpdateDishSchema, normalizeUpdateDishInput } = useDish();
  const onSubmit: SubmitHandler<UpdateDish> = async (input) => {
    await updateDish(normalizeUpdateDishInput(input), {
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
    >
      {/* 既存のものを選ぶ機構ができていないのでベタ打ち。新規登録・既存選択どちらも機能する機構を作ってから値入れる */}
      <DishSourceFormRelationContent
        dishSource={{ id: 1, type: DISH_SOURCE_TYPE.YOUTUBE }}
      />
    </DishForm>
  );
};
