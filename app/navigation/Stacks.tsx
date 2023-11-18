import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashView from '../SplashView';
import Profile from './Views/Profile';

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator();

const Stacks = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={SplashView} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default Stacks;
