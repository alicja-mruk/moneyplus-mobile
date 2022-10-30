import { useQuery } from '@tanstack/react-query';

import { Endpoints } from 'api';
import { CacheKey } from 'api/queryClient';
import { useAxiosContext } from 'contexts';
import { Category } from 'models';

export const useGetCategoryById = () => {
  const { getCategoryById } = useGetCategoryApi();

  return useQuery([CacheKey.Categories, id], () => getCategoryById({ params: { id } }));
};

const useGetCategoryApi = () => {
  const { publicAxios } = useAxiosContext();

  const getCategoryById = ({ params }: { params: { id: string } }) =>
    publicAxios.get<Category>(Endpoints.Categories, { params }).then(res => res.data);

  return {
    getCategoryById,
  };
};
