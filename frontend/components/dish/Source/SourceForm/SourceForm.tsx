import React from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { zodResolver } from '@hookform/resolvers/zod';
import FormFieldWrapperWithLabel from '../../../common/form/FormFieldWrapperWithLabel';

type Props = {
  formSchema: any;
  onSubmit: any;

  // registeredDishSource?: DishSourceHoge;

  onSchemaError?: any;
};

export const DishSourceFormContent = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      {/* <div className={style['reference-recipe']}> */}
      {/* <span className={style['reference-recipe__title']}> */}
      {/*  参考レシピ */}
      {/* </span> */}
      <FormFieldWrapperWithLabel label="名前">
        <Form.Control type="text" />
      </FormFieldWrapperWithLabel>
      <FormFieldWrapperWithLabel label="タイプ">
        <Form.Select>
          <option value="">本</option>
          <option value="">webサイト</option>
          <option value="">テレビ</option>
        </Form.Select>
      </FormFieldWrapperWithLabel>
    </div>
  );
};

export const DishSourceFormRelationContent = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {false && (
        <FormFieldWrapperWithLabel label="ページ数">
          <Form.Control type="number" />
        </FormFieldWrapperWithLabel>
      )}
      {false && (
        <FormFieldWrapperWithLabel label="レシピURL">
          <Form.Control type="text" />
        </FormFieldWrapperWithLabel>
      )}
    </>
  );
};

export default (props: Props) => {
  const { formSchema, onSubmit, onSchemaError } = props;

  const methods = useForm({ resolver: zodResolver(formSchema) });
  const { handleSubmit } = methods;

  const onError = (schemaErrors, _) => {
    if (onSchemaError) onSchemaError(schemaErrors);
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <DishSourceFormContent />
        <Form.Group>
          <Button type="submit" data-testid="submitDishSourceButton">
            登録
          </Button>
        </Form.Group>
      </Form>
    </FormProvider>
  );
};
