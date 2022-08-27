import { Platform } from 'react-native';

import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { SignedInStack, SignedOutStack } from 'modules';
import { RootStackParamList } from 'types';

const cardStyleInterpolator = Platform.select({
  ios: CardStyleInterpolators.forFadeFromCenter,
  android: CardStyleInterpolators.forScaleFromCenterAndroid,
});

const Stack = createStackNavigator<RootStackParamList>();

export const RootStack = () => {
  // const { value } = useAuthContext();
  // TODO: remove
  const isSignedIn = true;

  return (
    <Stack.Navigator
      initialRouteName="SignedOutStack"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        cardStyleInterpolator,
      }}>
      {isSignedIn ? (
        <Stack.Screen name="SignedInStack" component={SignedInStack} />
      ) : (
        <Stack.Screen name="SignedOutStack" component={SignedOutStack} />
      )}
    </Stack.Navigator>
  );
};
