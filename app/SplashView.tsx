import React, {useEffect, useState} from 'react';
import {StyleSheet, StatusBar, SafeAreaView, Text, View} from 'react-native';
import {useAccount, useSignMessage} from 'wagmi';
import {recoverMessageAddress} from 'viem';

import TelegramForm from './components/TelegramForm';
import isSignatureVerified from './utils/isSignatureVerified';
import {createUser, userIsRegistered} from './api';
import ConnectionSection from './components/ConnectionSection';
import WakuPage from './components/WakuPage';

function SplashView({}) {
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
      } else {
        setShowTelegramInput(false);
      }
    }

    if (isSignatureVerified(verifiedAddress, address)) {
      connectUser();
    }
  }, [address, verifiedAddress]);

  const handleSignMessage = () => {
    signMessage({message: 'This is my wallet.'});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperContainer}>
        <Text style={styles.text}>ETHBreaker</Text>
        <WakuPage />
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
