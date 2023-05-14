import { useAddDishSource } from './addDishSourceMutation';
import { useUpdateDishSource } from './updateDishSourceMutation';
import {
  FetchDishSourcesParams,
  useFetchDishSources,
} from './fetchDishSourceQuery';

export type { AddDishSource } from './addDishSourceMutation';
export type { UpdateDishSource } from './updateDishSourceMutation';

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

    dishSource,
    fetchDishSourceLoading,
    fetchDishSourceError,
    refetchDishSource,
  } = useFetchDishSources(fetchDishSourcesParams || {});

  const {
    addDishSource,
    addDishSourceLoading,
    addDishSourceError,
    AddDishSourceSchema,
  } = useAddDishSource();

  const {
    updateDishSource,
    updateDishSourceLoading,
    updateDishSourceError,
    UpdateDishSourceSchema,
  } = useUpdateDishSource();

  return {
    dishSources,
    fetchDishSourcesLoading,
    fetchDishSourcesError,
    refetchDishSources,

    dishSource,
    fetchDishSourceLoading,
    fetchDishSourceError,
    refetchDishSource,

    addDishSource,
    addDishSourceLoading,
    addDishSourceError,
    AddDishSourceSchema,

    updateDishSource,
    updateDishSourceLoading,
    updateDishSourceError,
    UpdateDishSourceSchema,
  };
};
