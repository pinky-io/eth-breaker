import React, {useEffect, useState} from 'react';
import {StyleSheet, StatusBar, SafeAreaView, Text} from 'react-native';
// import {useAccount} from 'wagmi';

import * as waku from '@waku/react-native';

// format: '/{application-name}/{version}/{content-topic-name}/{encoding}'
export const contentTopic = '/eth-breaker/1/chat/proto';

export function WakuPage({}) {
  //   const {isConnected, address} = useAccount();
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const nodeStarted = await waku.isStarted();
        if (!nodeStarted) {
          const config = new waku.Config();
          config.filter = true;
          config.relay = false;
          config.relayTopics = ['/waku/2/default-waku/proto'];
          await waku.newNode(config);
          await waku.start(); //it makes the application crash :(
          // console.log('The node ID:', await waku.peerID());
        }
      } catch (e) {
        console.log(e);
      }
      //     await waku.filterSubscribe(
      //       new waku.FilterSubscription('/waku/2/default-waku/proto', [
      //         new waku.ContentFilter(contentTopic),
      //       ]),
      //     );
      //     waku.onMessage(event => {
      //       console.log('onMessage');
      //       // if (event.wakuMessage.contentTopic !== contentTopic) {
      //       //   return;
      //       // }
      //       setResult(
      //         'Message received: ' +
      //           event.wakuMessage.timestamp +
      //           ' - payload:[' +
      //           JSON.stringify(event.wakuMessage.payload) +
      //           ']',
      //       );
      //       console.log('Message received: ', event);
      //     });
      //     console.log('enoughPeers?', await waku.relayEnoughPeers());
      //     console.log('addresses', await waku.listenAddresses());
      //     console.log('connecting...');
      //     try {
      //       // await waku.connect(
      //       //   '/dns4/node-01.ac-cn-hongkong-c.wakuv2.test.statusim.net/tcp/30303/p2p/16Uiu2HAkvWiyFsgRhuJEb9JfjYxEkoHLgnUQmr1N5mKWnYjxYRVm',
      //       //   5000,
      //       // );
      //     } catch (err) {
      //       console.log('Could not connect to peers');
      //     }
      //     try {
      //       await waku.connect(
      //         '/dns4/node-01.do-ams3.wakuv2.test.statusim.net/tcp/8000/wss/p2p/16Uiu2HAmPLe7Mzm8TsYUubgCAW1aJoeFScxrLj8ppHFivPo97bUZ',
      //         5000,
      //       );
      //     } catch (err) {
      //       console.log('Could not connect to peers');
      //     }
      //     console.log('connected!');
      //     console.log('PeerCNT', await waku.peerCnt());
      //     console.log('Peers', await waku.peers());
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{'message: ' + result}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(29,38,51,1)',
    marginTop: StatusBar.currentHeight || 0,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default WakuPage;
