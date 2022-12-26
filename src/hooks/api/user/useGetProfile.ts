import { useQuery } from '@tanstack/react-query';

import { Endpoints } from 'api/endpoints';
import { CacheKey } from 'api/queryClient';
import { useAxiosContext } from 'contexts/AxiosContext';
import { User } from 'models/User';

export const useGetProfile = () => {
  const { getProfile } = useGetProfileApi();

  return useQuery([CacheKey.User], () => getProfile());
};

const useGetProfileApi = () => {
  const { publicAxios } = useAxiosContext();

  const getProfile = () => publicAxios.get<User>(Endpoints.Profile).then(res => res.data);

  return {
    getProfile,
  };
};
