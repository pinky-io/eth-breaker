import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  Image,
  SafeAreaView,
  Dimensions,
  Text,
} from 'react-native';
import ConnectWalletButton from './components/ConnectWalletButton';
import {useAccount, useSignMessage} from 'wagmi';
import ActionButton from './components/ActionButton';
import {recoverMessageAddress} from 'viem';
import {SECRET_HASURA, HASURA_ENDPOINT} from '@env';
import axios from 'axios';

function isSignatureVerified(verifiedAddresses: string[], address?: string) {
  if (!address) {
    return false;
  }
  return verifiedAddresses.includes(address);
}

function SplashView({}) {
  const {isConnected, address} = useAccount();

  const {
    data: signMessageData,
    error,
    signMessage,
    variables,
  } = useSignMessage();
  const [verifiedAddress, setVerifiedAddress] = useState<`0x${string}`[]>([]);

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

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
    async function createUser() {
      try {
        const userData = await axios.get(
          HASURA_ENDPOINT + 'get-user?wallet_address=' + address,
          {
            headers: {
              'x-hasura-admin-secret': SECRET_HASURA,
            },
          },
        );

        console.log('data', userData.data);
      } catch (e) {
        console.log('error', e);
      }
    }

    if (isSignatureVerified(verifiedAddress, address)) {
      createUser();
    }
  }, [address, verifiedAddress]);

  const handleSignMessage = () => {
    signMessage({message: 'This is my wallet.'});
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ConnectWalletButton />
      <Text style={styles.text}>
        {isConnected ? 'Connected !' : 'Sign in with wallet connect'}
      </Text>
      {isConnected && (
        <ActionButton text="Sign a message" onPress={handleSignMessage} />
      )}
      <Text style={styles.text}>
        {isSignatureVerified(verifiedAddress, address) && 'Verified'}
      </Text>

      <Image
        source={require('./assets/images/Cover.png')}
        resizeMode="contain"
        style={{width: screenWidth, height: screenHeight}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(29,38,51,1)',
    marginTop: StatusBar.currentHeight || 0,
  },
  actionButton: {
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginBottom: 50,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SplashView;
