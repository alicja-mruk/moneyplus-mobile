import React from 'react';

import { Box, Spinner, VStack } from 'native-base';

import { User } from 'models/User';

import { UserInfo, UserInfoProps } from '../UserInfo';

type Props = {
  isLoading: boolean;
  data: User | undefined;
  userInfoData: UserInfoProps[];
};

export const UserInfoList = ({ isLoading, data, userInfoData }: Props) => {
  return (
    <Box mt="12" flex="1">
      {isLoading || !data ? (
        <Spinner />
      ) : (
        <VStack space="4">
          {userInfoData.map(item => (
            <UserInfo {...item} key={item.label} />
          ))}
        </VStack>
      )}
    </Box>
  );
};
