import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, Text} from 'react-native';
import DefaultView from '../../components/DefaultView';
import {RootStackParamList} from '../Stacks';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'LoaderView'>;

const LoaderView = ({route, navigation}: Props) => {
  const {walletAddress} = route.params;

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('MatchView', {walletAddress});
    }, 5000);
  }, [navigation, walletAddress]);

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
