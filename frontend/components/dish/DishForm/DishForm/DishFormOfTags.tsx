import { useFormContext, useFieldArray } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { Dish } from '../../../../lib/graphql/generated/graphql';
import FormFieldWrapperWithLabel from '../../../common/form/FormFieldWrapperWithLabel';

type DishFormOfTagsProps = {
  preFilledDish?: Dish;
};
export const DishFormOfTags = (
  props: DishFormOfTagsProps,
) => {
  const { preFilledDish } = props;

  const {
    register,
    setValue,
    control,
  } = useFormContext();
  const [tagsEdited, setTagsEdited] = useState(false);

  useEffect(() => {
    const tags = (preFilledDish?.tags || []).map((tag) => ({
      id: tag.id,
      content: tag.content,
    }));
    setValue('dishTags', tags);
  }, [preFilledDish?.tags]);

  const { fields, append, remove } = useFieldArray({
    name: 'dishTags',
    control,
    keyName: 'fieldKey', // これを指定しないと既存タグレコードのidフィールドが汚染される
  });

  const displayTags = (() => {
    if(fields.length > 0) return fields;
    if(!tagsEdited && preFilledDish?.tags !== null && preFilledDish?.tags.length > 0) return preFilledDish.tags;
    return [];
  })();

  return (
    <FormFieldWrapperWithLabel label="タグ">
      <ul>
        {displayTags.map((tag, index) => {
          if (tag?.id) {
            return (
              <li key={tag?.fieldKey || tag.id}>
                <input
                  type="hidden"
                  value={tag.id}
                  {...register(`dishTags.${index}.id`, { valueAsNumber: true })}
                />
                <input
                  type="hidden"
                  value={tag.content}
                  {...register(`dishTags.${index}.content`)}
                />
                {tag.content}
                <span onClick={() => {remove(index); setTagsEdited(true);}}>
                  ×
                </span>
              </li>
            )
          }

          return (
            <li key={tag.fieldKey}>
              <input
                {...register(`dishTags.${index}.content`)} 
                data-testid={`newDishTag-${index}`}
              />
              <span onClick={() => {remove(index); setTagsEdited(true);}}>
                ×
              </span>
            </li>
          )
        })}
        <li>
          <button
            type="button"
            onClick={() => {append({ content: "" }); setTagsEdited(true);}}
            data-testid='appendDishTag'
          >
            +
          </button>
        </li>
      </ul>
    </FormFieldWrapperWithLabel>
  )
}