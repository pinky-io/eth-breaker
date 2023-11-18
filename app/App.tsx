import React from 'react';

import WagmiProvider from './wagmi/WagmiProvider';
import {NavigationContainer} from '@react-navigation/native';
import Stacks from './navigation/Stacks';

const App = () => {
  return (
    <WagmiProvider>
      <NavigationContainer>
        <Stacks />
      </NavigationContainer>
    </WagmiProvider>
  );
};

export default App;
