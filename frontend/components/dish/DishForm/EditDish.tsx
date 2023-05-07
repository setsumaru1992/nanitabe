import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import DishForm, { DishSourceFormRelationContent } from './DishForm';
import {
  Dish,
  DishSourceRegisteredWithDish,
} from '../../../lib/graphql/generated/graphql';
import useDish, { UpdateDish } from '../../../features/dish/useDish';
import useDishSource from '../../../features/dish/source/useDishSource';
import { DishSourceType } from '../../../features/dish/source/const';
import FormFieldWrapperWithLabel from '../../common/form/FormFieldWrapperWithLabel';

type Props = {
  dish: Dish;
  onEditSucceeded?: () => void;
  onSchemaError?: any;
};

export default (props: Props) => {
  const { dish, onEditSucceeded, onSchemaError } = props;

  const [dishSourceId, setDishSourceId] = useState(
    dish?.dishSourceRelation?.dishSourceId || null,
  );
  const { dishSources } = useDishSource({
    fetchDishSourcesParams: {
      fetchDishSourcesOnlyParams: { requireFetchedData: true },
    },
  });
  const selectedDishSource: DishSourceRegisteredWithDish | null = (() => {
    if (!dishSourceId || !dishSources) return null;

    return dishSources.find((dishSource) => dishSource.id === dishSourceId);
  })();
  const dishSourceRelation = (() => {
    if (!dish.dishSourceRelation) return null;
    if (dish.dishSourceRelation.dishSourceId !== dishSourceId) return null;
    return dish.dishSourceRelation;
  })();

  const {
    updateDish,
    UpdateDishSchema,
    convertFromUpdateDishWithExistingSourceInputToGraphqlInput,
  } = useDish();
  const convertToGraphqlInput = (input: UpdateDish) => {
    return convertFromUpdateDishWithExistingSourceInputToGraphqlInput(
      input,
      dishSourceId,
      selectedDishSource?.type as DishSourceType,
    );
  };
  const onSubmit: SubmitHandler<UpdateDish> = async (input) => {
    // TODO: 命名をupdateDishからupdateDishWithExistingSourceに変更
    await updateDish(convertToGraphqlInput(input), {
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
      {/* TODO: DishSourceFormに移行 */}
      <FormFieldWrapperWithLabel label="参考レシピ">
        {dishSources && (
          <Form.Select
            defaultValue={dishSourceId}
            onChange={(e) => {
              setDishSourceId(Number(e.target.value));
            }}
            data-testid="existingDishSources"
          >
            <option value={null}>--</option>
            {dishSources.map((dishSource) => (
              <option
                key={dishSource.id}
                value={dishSource.id}
                data-testid={`existingDishSource-${dishSource.id}`}
              >
                {dishSource.name}
              </option>
            ))}
          </Form.Select>
        )}
      </FormFieldWrapperWithLabel>

      <DishSourceFormRelationContent
        dishSourceType={selectedDishSource?.type as DishSourceType}
        dishSourceRelation={dishSourceRelation}
      />
    </DishForm>
  );
};
