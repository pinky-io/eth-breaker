import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashView from '../SplashView';
import HandleView from './Views/HandleView';
import LoaderView from './Views/LoaderView';

export type RootStackParamList = {
  Home: undefined;
  LoaderView: undefined;
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
      <Stack.Screen name="LoaderView" component={LoaderView} />
    </Stack.Navigator>
  );
};

export default Stacks;
