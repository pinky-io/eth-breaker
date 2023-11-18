import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashView from '../SplashView';
import Profile from './Views/Profile';
import HandleView from './Views/HandleView';

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  HandleView: undefined;
};

const Stack = createNativeStackNavigator();

const Stacks = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={SplashView} />
      <Stack.Screen name="HandleView" component={HandleView} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default Stacks;
