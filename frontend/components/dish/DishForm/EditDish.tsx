import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import DishForm from './DishForm';
import {
  Dish,
  DishSourceRegisteredWithDish,
} from '../../../lib/graphql/generated/graphql';
import useDish, { UpdateDishInput } from '../../../features/dish/useDish';
import useDishSource from '../../../features/dish/source/useDishSource';
import { DishSourceType } from '../../../features/dish/source/const';
import FormFieldWrapperWithLabel from '../../common/form/FormFieldWrapperWithLabel';
import { DishSourceFormRelationContent } from './DishSourceFormRelationContent';

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
    updateDishWithExistingSource,
    UpdateDishSchema,
    convertFromUpdateDishWithExistingSourceInputToGraphqlInput,
  } = useDish();
  const convertToGraphqlInput = (input: UpdateDishInput) => {
    return convertFromUpdateDishWithExistingSourceInputToGraphqlInput(
      input,
      dishSourceId,
      selectedDishSource?.type as DishSourceType,
    );
  };
  const onSubmit: SubmitHandler<UpdateDishInput> = async (input) => {
    await updateDishWithExistingSource(convertToGraphqlInput(input), {
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
              const selectedValue = e.target.value;
              const sourceId = Number.isNaN(selectedValue)
                ? null
                : Number(selectedValue);
              setDishSourceId(sourceId);
            }}
            data-testid="existingDishSources"
          >
            <option value={null} data-testid="existingDishSource-novalue">
              --
            </option>
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
