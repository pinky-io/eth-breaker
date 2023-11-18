import React, {useState} from 'react';
import {
  Button,
  FlatList,
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {BleManager} from 'react-native-ble-plx';
import {Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const App = () => {
  const [devices, setDevices] = useState([]);
  const manager = new BleManager();

  console.log(
    'devices',
    devices.map(d => d.name),
  );
  console.log(
    'devices',
    devices.map(d => d.id),
  );

  const scanDevices = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error(error);
        return;
      }

      setDevices(currentDevices => {
        const deviceIds = currentDevices.map(d => d.id);
        return deviceIds.includes(device.id)
          ? currentDevices
          : [...currentDevices, device];
      });
    });

    setTimeout(() => manager.stopDeviceScan(), 5000);
  };

  const requestBluetoothPermission = async () => {
    let permission;

    if (Platform.OS === 'android') {
      permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    } else if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL; // ou une permission iOS appropriée
    }

    if (!permission) {
      return;
    }

    try {
      const result = await check(permission);

      if (result === RESULTS.GRANTED) {
        console.log('Permission Bluetooth accordée');
        scanDevices();
      } else {
        const status = await request(permission);
        if (status === RESULTS.GRANTED) {
          console.log('Permission Bluetooth accordée après demande');
          scanDevices();
        } else {
          console.log('Permission Bluetooth refusée');
        }
      }
    } catch (error) {
      console.error('Erreur de demande de permission', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Scan for Devices" onPress={requestBluetoothPermission} />
      <FlatList
        data={devices}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
          </View>
        )}
      />
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
