import protobuf from 'protobufjs';
import {
  createLightNode,
  waitForRemotePeer,
  Protocols,
  createEncoder,
  createDecoder,
  createRelayNode,
} from '@waku/sdk';
import {multiaddr} from '@multiformats/multiaddr';

// standard topic name:
// '/{application-name}/{version}/{content-topic-name}/{encoding}'
const contentTopic = '/eth-breaker/1/chat/proto';

// Create a message structure using Protobuf
const ChatMessage = new protobuf.Type('ChatMessage')
  .add(new protobuf.Field('timestamp', 1, 'uint64'))
  .add(new protobuf.Field('sender', 2, 'string'))
  .add(new protobuf.Field('message', 3, 'string'));

async function main() {
  // Create and start a Light Node
  //   const node = await createLightNode({ defaultBootstrap: true });
  const node = await createLightNode({
    defaultBootstrap: true,
    // pubsubTopics: [contentTopic],
  });
  await node.start();

  // Wait for a successful peer connection
  console.log('before waitForRemotePeer');
  await waitForRemotePeer(node);
  //   await node.dial(
  //     multiaddr(
  //       "/dns4/node-01.ac-cn-hongkong-c.wakuv2.test.statusim.net/tcp/30303/p2p/16Uiu2HAkvWiyFsgRhuJEb9JfjYxEkoHLgnUQmr1N5mKWnYjxYRVm"
  //     )
  //   );
  await node.dial(
    multiaddr(
      '/dns4/node-01.do-ams3.wakuv2.test.statusim.net/tcp/8000/wss/p2p/16Uiu2HAmPLe7Mzm8TsYUubgCAW1aJoeFScxrLj8ppHFivPo97bUZ',
    ),
  );

  // Create a message encoder and decoder
  const encoder = createEncoder({contentTopic});
  const decoder = createDecoder(contentTopic);

  // Create a new message object
  const protoMessage = ChatMessage.create({
    timestamp: Date.now(),
    sender: 'Jh',
    message: 'Hello, ETH-Breaker!',
  });

  // Serialise the message using Protobuf
  const serialisedMessage = ChatMessage.encode(protoMessage).finish();

  // Send the message using Light Push
  const res = await node.lightPush.send(encoder, {
    payload: serialisedMessage,
  });

  // Send the message using Relay
  //   const res = await node.relay.send(encoder, {
  //     payload: serialisedMessage,
  //   });
  console.log(res);

  //   {
  //     // Create the callback function
  //     const callback = (wakuMessage) => {
  //       console.log("callback");
  //       // Check if there is a payload on the message
  //       if (!wakuMessage.payload) return;
  //       // Render the messageObj as desired in your application
  //       const messageObj = ChatMessage.decode(wakuMessage.payload);
  //       console.log(messageObj);
  //     };

  //     // Create a filter subscription
  //     const subscription = await node.filter.createSubscription();

  //     // Subscribe to content topics and process new messages
  //     await subscription.subscribe([decoder], callback);
  //   }

  // Use the stop() function to stop a running node
  //   await node.stop();
  console.log('done');
}

main();
