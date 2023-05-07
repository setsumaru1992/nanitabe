import { useAddDishSource } from './addDishSourceMutation';
import {
  FetchDishSourcesParams,
  useFetchDishSources,
} from './fetchDishSourceQuery';

export type { AddDishSource } from './addDishSourceMutation';

export type UseDishSourceParams = {
  fetchDishSourcesParams?: FetchDishSourcesParams;
};

export default (params: UseDishSourceParams = {}) => {
  const { fetchDishSourcesParams } = params;

  const {
    dishSources,
    fetchDishSourcesLoading,
    fetchDishSourcesError,
    refetchDishSources,
  } = useFetchDishSources(fetchDishSourcesParams || {});

  const {
    addDishSource,
    addDishSourceLoading,
    addDishSourceError,
    AddDishSourceSchema,
  } = useAddDishSource();

  return {
    dishSources,
    fetchDishSourcesLoading,
    fetchDishSourcesError,
    refetchDishSources,

    addDishSource,
    addDishSourceLoading,
    addDishSourceError,
    AddDishSourceSchema,
  };
};
