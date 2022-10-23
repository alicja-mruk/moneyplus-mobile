import { useQuery } from '@tanstack/react-query';

import { Endpoints, GetUserData } from 'api';
import { CacheKey } from 'api/queryClient';
import { useAxiosContext } from 'contexts';

export const useGetUser = () => {
  const { getUser } = useGetUserApi();

  return useQuery([CacheKey.User], () => getUser());
};

const useGetUserApi = () => {
  const { publicAxios } = useAxiosContext();

  const getUser = () => publicAxios.get<GetUserData>(Endpoints.Profile).then(res => res.data);

  return {
    getUser,
  };
};
