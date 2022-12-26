import { useQuery } from '@tanstack/react-query';

import { Endpoints } from 'api/endpoints';
import { CacheKey } from 'api/queryClient';
import { useAxiosContext } from 'contexts/AxiosContext';
import { Category } from 'models/Category';

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
