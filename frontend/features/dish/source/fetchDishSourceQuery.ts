import { gql } from '@apollo/client';
import { useCodegenQuery } from '../../utils/queryUtils';
import {
  useDishSourcesLazyQuery,
  useDishSourcesQuery,
} from '../../../lib/graphql/generated/graphql';

export const DISH_SOURCES = gql`
  query dishSources {
    dishSources {
      id
      name
      type
    }
  }
`;

type FetchDishSourcesOnlyParams = {
  requireFetchedData?: boolean;
};

const useFetchDishSourcesOnly = (params: FetchDishSourcesOnlyParams = {}) => {
  const { requireFetchedData = false } = params;
  const { data, fetchLoading, fetchError, refetch } = useCodegenQuery(
    useDishSourcesQuery,
    useDishSourcesLazyQuery,
    requireFetchedData,
    {},
  );

  return {
    dishSources: data?.dishSources,
    fetchDishSourcesLoading: fetchLoading,
    fetchDishSourcesError: fetchError,
    refetchDishSources: refetch,
  };
};

export type FetchDishSourcesParams = {
  fetchDishSourcesOnlyParams?: FetchDishSourcesOnlyParams;
};

export const useFetchDishSources = (params: FetchDishSourcesParams) => {
  const { fetchDishSourcesOnlyParams } = params;
  const {
    dishSources,
    fetchDishSourcesLoading,
    fetchDishSourcesError,
    refetchDishSources,
  } = useFetchDishSourcesOnly(fetchDishSourcesOnlyParams || {});

  return {
    dishSources,
    fetchDishSourcesLoading,
    fetchDishSourcesError,
    refetchDishSources,
  };
};
