import { useAddDishSource } from './addDishSourceMutation';

export type { AddDishSource } from './addDishSourceMutation';

export default () => {
  const {
    addDishSource,
    addDishSourceLoading,
    addDishSourceError,
    AddDishSourceSchema,
  } = useAddDishSource();

  return {
    addDishSource,
    addDishSourceLoading,
    addDishSourceError,
    AddDishSourceSchema,
  };
};
