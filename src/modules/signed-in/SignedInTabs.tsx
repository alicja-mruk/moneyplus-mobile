import React from 'react';

import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import i18next from 'i18next';

import { colorPalette } from 'config/theme/foundations';
import { Route } from 'navigation';

import { CategoriesStack, OverviewStack, SettingsStack, TransactionsStack } from './modules';

const hiddenTabRoutes: Route[] = [];

const Tab = createBottomTabNavigator<SignedInTabsParamList>();

export const SignedInTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        style: {
          backgroundColor: colorPalette.white,
        },
        tabBarStyle: {
          height: 64,
          paddingTop: 16,
          paddingBottom: 24,
          display: hiddenTabRoutes.includes(getFocusedRouteNameFromRoute(route) as Route)
            ? 'none'
            : 'flex',
        },
        tabBarActiveTintColor: colorPalette.primary[200],
        tabBarInactiveTintColor: colorPalette.primary[100],
        tabBarIcon: ({ color }) => {
          switch (route.name) {
            case Route.CategoriesStack:
              return <MaterialIcons name="category" size={24} color={color} />;
            case Route.TransactionsStack:
              return <MaterialIcons name="account-balance-wallet" size={24} color={color} />;
            case Route.OverviewStack:
              return <Entypo name="bar-graph" size={24} color={color} />;
            case Route.SettingsStack:
              return <MaterialCommunityIcons name="account" size={32} color={color} />;
            default:
              return;
          }
        },
      })}>
      {tabs.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.name as keyof SignedInTabsParamList}
          component={tab.component}
          options={{
            tabBarLabel: ({ focused }) => null,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const tabs = [
  {
    name: Route.CategoriesStack,
    component: CategoriesStack,
    label: i18next.t('signedIn.tabs.categories'),
  },
  {
    name: Route.TransactionsStack,
    component: TransactionsStack,
    label: i18next.t('signedIn.tabs.transactions'),
  },
  {
    name: Route.OverviewStack,
    component: OverviewStack,
    label: i18next.t('signedIn.tabs.overview'),
  },
  {
    name: Route.SettingsStack,
    component: SettingsStack,
    label: i18next.t('signedIn.tabs.settings'),
  },
];

export type SignedInTabsParamList = {
  CategoriesStack: undefined;
  TransactionsStack: undefined;
  OverviewStack: undefined;
  SettingsStack: undefined;
};
