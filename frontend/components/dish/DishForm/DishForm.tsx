import React, { useEffect, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { zodResolver } from '@hookform/resolvers/zod';
import FormFieldWrapperWithLabel from '../../common/form/FormFieldWrapperWithLabel';
import ErrorMessageIfExist from '../../common/form/ErrorMessageIfExist';
import {
  MEAL_POSITION,
  MEAL_POSITION_LABELS,
  MEAL_POSITIONS,
} from '../../../features/dish/const';
import {
  Dish,
  DishSourceRegisteredWithDish,
} from '../../../lib/graphql/generated/graphql';
import useDishSource from '../../../features/dish/source/useDishSource';
import { DishSourceType } from '../../../features/dish/source/const';
import { DishSourceFormRelationContent } from './DishSourceFormRelationContent';
import { DishSourceFormContent } from '../Source/SourceForm/SourceForm';

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

type DishFormContentWithoutSourceProps = {
  registeredDish?: Dish;
};

export const DishFormContentWithoutSource = (
  props: DishFormContentWithoutSourceProps,
) => {
  const { registeredDish } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {registeredDish?.id && (
        <input
          type="hidden"
          value={registeredDish.id}
          {...register('dish.id', { valueAsNumber: true })}
        />
      )}
      <FormFieldWrapperWithLabel label="料理名" required>
        <Form.Control
          type="text"
          {...register('dish.name')}
          defaultValue={registeredDish?.name}
          data-testid="dishname"
        />
        <ErrorMessageIfExist errorMessage={errors.dish?.name?.message} />
      </FormFieldWrapperWithLabel>
      <FormFieldWrapperWithLabel label="位置づけ">
        <Form.Select
          defaultValue={registeredDish?.mealPosition || MEAL_POSITION.MAIN_DISH}
          {...register('dish.mealPosition', { valueAsNumber: true })}
          data-testid="mealPositionOptions"
        >
          {MEAL_POSITIONS.map((position) => (
            <option
              key={position}
              value={position}
              data-testid={`mealPositionOption-${position}`}
            >
              {MEAL_POSITION_LABELS[position]}
            </option>
          ))}
        </Form.Select>
        <ErrorMessageIfExist
          errorMessage={errors.dish?.mealPosition?.message}
        />
      </FormFieldWrapperWithLabel>
    </>
  );
};

const useSelectedExistingDishSource = (registeredDish?: Dish, setValue) => {
  // NOTE: 登録済みのレシピチェックボックス選択時のみ動かすとしてもhooksだけは動かしてから早期空レスポンスリターン
  const { dishSources } = useDishSource({
    fetchDishSourcesParams: {
      fetchDishSourcesOnlyParams: { requireFetchedData: true },
    },
  });
  const [dishSourceId, setDishSourceId] = useState(
    registeredDish?.dishSourceRelation?.dishSourceId || null,
  );

  const selectedDishSource: DishSourceRegisteredWithDish | null = (() => {
    if (!dishSourceId || !dishSources) return null;

    return dishSources.find((dishSource) => dishSource.id === dishSourceId);
  })();
  const dishSourceRelation = (() => {
    // if (choosingRegisterNewDishSource) return null;
    if (!registeredDish.dishSourceRelation) return null;
    if (registeredDish.dishSourceRelation.dishSourceId !== dishSourceId)
      return null;
    return registeredDish.dishSourceRelation;
  })();

  useEffect(() => {
    setValue('dishSource.id', dishSourceId || null);
    setValue('dishSource.type', selectedDishSource?.type || null);
  }, [dishSourceId, selectedDishSource]);

  return {
    dishSources,
    dishSourceId,
    setDishSourceId,
    selectedDishSource,
    dishSourceRelation,
  };
};

type DishFormContentProps = {
  registeredDish?: Dish;
  useChoosingPutDishSourceTypeResult: UseChoosingPutDishSourceTypeResult;
};

const DishFormContent = (props: DishFormContentProps) => {
  const {
    registeredDish,
    useChoosingPutDishSourceTypeResult: {
      choosingRegisterNewDishSource,
      choosingUseExistingDishSource,
      setChoosingPutDishSourceType,
    },
  } = props;

  const { setValue } = useFormContext();

  const {
    dishSources,
    dishSourceId,
    setDishSourceId,
    selectedDishSource,
    dishSourceRelation,
  } = useSelectedExistingDishSource(registeredDish, setValue);

  return (
    <>
      <DishFormContentWithoutSource registeredDish={registeredDish} />
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
          label="登録済みの参考レシピから選択"
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
          label="新しく参考レシピを登録"
          data-testid="optionOfRegisteringNewDishSource"
        />
      </Form.Group>

      {/* TODO: DishSourceFormに移行 */}
      {choosingUseExistingDishSource && (
        <>
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
        </>
      )}

      {choosingRegisterNewDishSource && (
        <>
          <DishSourceFormContent />
          <DishSourceFormRelationContent
            dishSourceType={selectedDishSource?.type as DishSourceType}
            dishSourceRelation={null}
          />
        </>
      )}
    </>
  );
};

type Props = {
  formSchema: any;
  onSubmit: any;
  children?: React.ReactNode;

  registeredDish?: Dish;

  useChoosingPutDishSourceTypeResult: UseChoosingPutDishSourceTypeResult;

  onSchemaError?: any;
};

export default (props: Props) => {
  const {
    formSchema,
    onSubmit,
    registeredDish,
    onSchemaError,
    children,
    useChoosingPutDishSourceTypeResult,
  } = props;

  const methods = useForm({ resolver: zodResolver(formSchema) });
  const { handleSubmit } = methods;

  const onError = (schemaErrors, _) => {
    if (onSchemaError) onSchemaError(schemaErrors);
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <DishFormContent
          registeredDish={registeredDish}
          useChoosingPutDishSourceTypeResult={
            useChoosingPutDishSourceTypeResult
          }
        />
        {children}
        <Form.Group>
          <Button type="submit" data-testid="submitDishButton">
            登録
          </Button>
        </Form.Group>
      </Form>
    </FormProvider>
  );
};
