import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import SplashView from './SplashView';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SplashView />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
