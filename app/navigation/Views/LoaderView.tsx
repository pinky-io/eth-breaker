import React from 'react';
import {ActivityIndicator, StyleSheet, Text} from 'react-native';
import DefaultView from '../../components/DefaultView';

const LoaderView = () => {
  return (
    <DefaultView style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.text}>Loading for the best results...</Text>
    </DefaultView>
  );
};

export default LoaderView;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
