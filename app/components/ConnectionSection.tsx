import React from 'react';
import {StyleSheet} from 'react-native';
import isSignatureVerified from '../utils/isSignatureVerified';
import ConnectWalletButton from './ConnectWalletButton';
import ActionButton from './ActionButton';

type Props = {
  isConnected: boolean;
  address?: string;
  verifiedAddress: string[];
  handleSignMessage: () => void;
};

const ConnectionSection = ({
  isConnected,
  address,
  verifiedAddress,
  handleSignMessage,
}: Props) => {
  return (
    <>
      <ConnectWalletButton />

      {isConnected && !isSignatureVerified(verifiedAddress, address) && (
        <ActionButton
          text="Verify signature"
          onPress={handleSignMessage}
          style={styles.button}
        />
      )}
    </>
  );
};

export default ConnectionSection;

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
  },
});
