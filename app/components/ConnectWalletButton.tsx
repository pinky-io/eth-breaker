import React from 'react';
import {W3mButton} from '@web3modal/wagmi-react-native';
import ButtonStyle from './Button.style';

const ConnectWalletButton = () => {
  return (
    <W3mButton
      label="Sign in with WalletConnect"
      accountStyle={ButtonStyle.button}
      connectStyle={ButtonStyle.button}
    />
  );
};

export default ConnectWalletButton;
