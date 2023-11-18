import React from 'react';
import {StatusBar, StyleSheet, Text} from 'react-native';
import DefaultView from '../../components/DefaultView';

const Profile = () => {
  return (
    <DefaultView>
      <Text style={styles.text}>Profile</Text>
    </DefaultView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
