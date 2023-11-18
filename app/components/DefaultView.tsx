import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

type Props = {
  children: React.ReactNode;
};

const DefaultView = ({children}: Props) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export default DefaultView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: 'rgba(29,38,51,1)',
  },
});
