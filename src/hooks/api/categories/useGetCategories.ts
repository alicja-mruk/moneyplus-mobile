import { useQuery } from '@tanstack/react-query';

import { Endpoints } from 'api';
import { CacheKey } from 'api/queryClient';
import { useAxiosContext } from 'contexts';
import { Category } from 'models';

export const useGetCategories = () => {
  const { getCategories } = useGetCategoriesApi();

  return useQuery([CacheKey.Categories], () => getCategories());
};

const useGetCategoriesApi = () => {
  const { publicAxios } = useAxiosContext();

  const getCategories = () =>
    publicAxios.get<Category[]>(Endpoints.Categories).then(res => res.data);

  return {
    getCategories,
  };
};
