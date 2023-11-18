import React, {useEffect, useState} from 'react';
import {StyleSheet, StatusBar, SafeAreaView, Text, View} from 'react-native';
import {useAccount, useSignMessage} from 'wagmi';
import {recoverMessageAddress} from 'viem';

import TelegramForm from './components/TelegramForm';
import isSignatureVerified from './utils/isSignatureVerified';
import {createUser, userIsRegistered} from './api';
import ConnectionSection from './components/ConnectionSection';
import {user} from './storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './navigation/Stacks';

type Props = {} & NativeStackScreenProps<RootStackParamList, 'Home'>;

function SplashView({navigation}: Props) {
  const {isConnected, address} = useAccount();

  const {
    data: signMessageData,
    error,
    signMessage,
    variables,
  } = useSignMessage();
  const [verifiedAddress, setVerifiedAddress] = useState<`0x${string}`[]>([]);
  const [showTelegramInput, setShowTelegramInput] = useState(false);

  const isVerified = isSignatureVerified(verifiedAddress, address);

  useEffect(() => {
    async function verifiySignature() {
      if (signMessageData && variables?.message) {
        console.log('signMessageData', signMessageData);

        const recoveredAddress = await recoverMessageAddress({
          message: variables?.message,
          signature: signMessageData,
        });

        setVerifiedAddress(prev => [...prev, recoveredAddress]);
      }
    }

    verifiySignature();
  }, [error, signMessageData, variables]);

  useEffect(() => {
    async function connectUser() {
      const isRegistered = await userIsRegistered(address);

      if (!isRegistered) {
        setShowTelegramInput(true);
        return;
      }

      user.setUser(isRegistered);
      navigation.navigate('Profile');
    }

    if (isSignatureVerified(verifiedAddress, address)) {
      connectUser();
    }
  }, [address, navigation, verifiedAddress]);

  const handleSignMessage = () => {
    console.log('handleSignMessage');

    signMessage({message: 'This is my wallet.'});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperContainer}>
        <Text style={styles.text}>ETHBreaker</Text>
      </View>
      <View style={styles.middleContainer}>
        <ConnectionSection
          address={address}
          handleSignMessage={handleSignMessage}
          isConnected={isConnected}
          verifiedAddress={verifiedAddress}
        />
      </View>
      <View style={styles.lowerContainer}>
        <Text style={styles.text}>{isVerified && 'Verified'}</Text>
        {showTelegramInput && (
          <TelegramForm
            onButtonPress={tg_handle => createUser(tg_handle, address)}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(29,38,51,1)',
    marginTop: StatusBar.currentHeight || 0,
  },
  upperContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SplashView;
