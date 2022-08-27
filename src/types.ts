import { NavigatorScreenParams } from '@react-navigation/native';

import { SignedInStackParamList, SignedOutStackParamList } from 'modules';

export type RootStackParamList = {
  SignedOutStack: NavigatorScreenParams<SignedOutStackParamList>;
  SignedInStack: NavigatorScreenParams<SignedInStackParamList>;
};
