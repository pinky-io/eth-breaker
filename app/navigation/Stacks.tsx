import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashView from '../SplashView';
import HandleView from './Views/HandleView';
import LoaderView from './Views/LoaderView';
import MatchView from './Views/MatchView';

export type RootStackParamList = {
  Home: undefined;
  LoaderView: {walletAddress: `0x${string}`};
  HandleView: undefined;
  MatchView: {walletAddress: `0x${string}`};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Stacks = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={SplashView} />
      <Stack.Screen name="HandleView" component={HandleView} />
      <Stack.Screen name="LoaderView" component={LoaderView} />
      <Stack.Screen name="MatchView" component={MatchView} />
    </Stack.Navigator>
  );
};

export default Stacks;
