import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: any;
};

const DefaultView = ({children, style}: Props) => {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
};

export default DefaultView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: 'rgba(29,38,51,1)',
  },
});
