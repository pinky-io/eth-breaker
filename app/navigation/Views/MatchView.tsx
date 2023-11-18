import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import DefaultView from '../../components/DefaultView';
import ActionButton from '../../components/ActionButton';

const MatchView = () => {
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
          <Text>🥇</Text>
          <Text style={styles.contractText}>Contract Name</Text>
        </View>
        <View style={styles.row}>
          <Text>🥈</Text>
          <Text style={styles.contractText}>Contract Name</Text>
        </View>
        <View style={styles.row}>
          <Text>🥉</Text>
          <Text style={styles.contractText}>Contract Name</Text>
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
});
