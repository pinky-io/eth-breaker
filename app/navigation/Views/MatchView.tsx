import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import DefaultView from '../../components/DefaultView';
import ActionButton from '../../components/ActionButton';
import {RootStackParamList} from '../Stacks';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'MatchView'>;

const MatchView = ({}: Props) => {
  return (
    <DefaultView>
      <View style={styles.section}>
        <Text style={styles.matchText}>
          You Matched with{' '}
          <Text style={styles.matchHandle}>@telegramHanlde</Text>
        </Text>
      </View>
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.contractText}>Contract in common :</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.contractText}>🥇 Rocket Pool</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.contractText}>🥈 Lens Protocol</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.contractText}>🥉 ENS</Text>
        </View>
      </View>
      <View style={styles.section}>
        <ActionButton text="I found @telegramhandle" />
      </View>
    </DefaultView>
  );
};

export default MatchView;

const styles = StyleSheet.create({
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    paddingY: 50,
  },
  matchText: {
    color: 'gray',
    fontSize: 24,
  },
  matchHandle: {
    color: 'blue',
    fontSize: 24,
    fontWeight: 'bold',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  contractText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  addressText: {
    color: 'white',
    fontSize: 16,
  },
});
