import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import DishForm from './DishForm';
import {
  Dish,
  DishSourceRegisteredWithDish,
} from '../../../lib/graphql/generated/graphql';
import useDish, {
  UpdateDishInput,
  UpdateDishFunc,
} from '../../../features/dish/useDish';
import useDishSource from '../../../features/dish/source/useDishSource';
import { DishSourceType } from '../../../features/dish/source/const';
import FormFieldWrapperWithLabel from '../../common/form/FormFieldWrapperWithLabel';
import { DishSourceFormRelationContent } from './DishSourceFormRelationContent';

export enum CHOOSING_PUT_DISH_SOURCE_TYPE {
  CHOOSING_REGISTER_NEW_DISH_SOURCE,
  CHOOSING_USE_EXISTING_DISH_SOURCE,
}

const isChoosingRegisterNewDishSource = (
  choosingPutDishSourceType: CHOOSING_PUT_DISH_SOURCE_TYPE,
) =>
  choosingPutDishSourceType ===
  CHOOSING_PUT_DISH_SOURCE_TYPE.CHOOSING_REGISTER_NEW_DISH_SOURCE;

const isChoosingUseExistingDishSource = (
  choosingDishType: CHOOSING_PUT_DISH_SOURCE_TYPE,
) =>
  choosingDishType ===
  CHOOSING_PUT_DISH_SOURCE_TYPE.CHOOSING_USE_EXISTING_DISH_SOURCE;

type UseChoosingPutDishSourceTypeResult = {
  choosingPutDishSourceType: CHOOSING_PUT_DISH_SOURCE_TYPE;
  setChoosingPutDishSourceType: (CHOOSING_DISH_TYPE) => void;
  choosingRegisterNewDishSource: boolean;
  choosingUseExistingDishSource: boolean;
};

export const useChoosingPutDishSourceType = (
  defaultChoosingDishType: CHOOSING_PUT_DISH_SOURCE_TYPE,
): UseChoosingPutDishSourceTypeResult => {
  const [choosingPutDishSourceType, setChoosingPutDishSourceType] =
    React.useState(defaultChoosingDishType);
  return {
    choosingPutDishSourceType,
    setChoosingPutDishSourceType,
    choosingRegisterNewDishSource: isChoosingRegisterNewDishSource(
      choosingPutDishSourceType,
    ),
    choosingUseExistingDishSource: isChoosingUseExistingDishSource(
      choosingPutDishSourceType,
    ),
  };
};

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
    choosingPutDishSourceType,
    setChoosingPutDishSourceType,
    choosingRegisterNewDishSource,
    choosingUseExistingDishSource,
  } = useChoosingPutDishSourceType(
    CHOOSING_PUT_DISH_SOURCE_TYPE.CHOOSING_USE_EXISTING_DISH_SOURCE,
  );

  const {
    updateDishWithExistingSource,
    updateDishWithNewSource,
    UpdateDishSchema,
    convertFromUpdateDishWithExistingSourceInputToGraphqlInput,
  } = useDish();

  const updateDish: UpdateDishFunc = (() => {
    const [updateDishFunc, convertToGraphqlInputFunc] = (() => {
      if (choosingUseExistingDishSource) {
        return [
          updateDishWithExistingSource,
          (input: UpdateDishInput) => {
            return convertFromUpdateDishWithExistingSourceInputToGraphqlInput(
              input,
              dishSourceId,
              selectedDishSource?.type as DishSourceType,
            );
          },
        ];
      }
      return [null, null];
    })();
    return (input, mutationCallbacks) => {
      updateDishFunc(convertToGraphqlInputFunc(input), mutationCallbacks);
    };
  })();

  const onSubmit: SubmitHandler<UpdateDishInput> = async (input) => {
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
    >
      <Form.Group>
        <Form.Check
          type="radio"
          inline
          name="add_put_dish_source_type"
          value={
            CHOOSING_PUT_DISH_SOURCE_TYPE.CHOOSING_USE_EXISTING_DISH_SOURCE
          }
          onChange={() =>
            setChoosingPutDishSourceType(
              CHOOSING_PUT_DISH_SOURCE_TYPE.CHOOSING_USE_EXISTING_DISH_SOURCE,
            )
          }
          checked={choosingUseExistingDishSource}
          label="登録済みのレシピ元を選択"
          data-testid="optionOfUsingExistingDishSource"
        />
        <Form.Check
          type="radio"
          inline
          name="add_put_dish_source_type"
          value={
            CHOOSING_PUT_DISH_SOURCE_TYPE.CHOOSING_REGISTER_NEW_DISH_SOURCE
          }
          onChange={() =>
            setChoosingPutDishSourceType(
              CHOOSING_PUT_DISH_SOURCE_TYPE.CHOOSING_REGISTER_NEW_DISH_SOURCE,
            )
          }
          checked={choosingRegisterNewDishSource}
          label="新しくレシピ元を登録"
          data-testid="optionOfRegisteringNewDishSource"
        />
      </Form.Group>

      {/* TODO: DishSourceFormに移行 */}
      {choosingUseExistingDishSource && (
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
      )}

      <DishSourceFormRelationContent
        dishSourceType={selectedDishSource?.type as DishSourceType}
        dishSourceRelation={dishSourceRelation}
      />
    </DishForm>
  );
};
