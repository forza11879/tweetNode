import WebSocket from 'ws';
import Twitter from 'twitter';
import ck from 'ckey';

let twitter = new Twitter({
  consumer_key: ck.TWITTER_CONSUMER_KEY,
  consumer_secret: ck.TWITTER_CONSUMER_SECRET,
  access_token_key: ck.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: ck.TWITTER_ACCESS_TOKEN_SECRET,
});

export const stream = (term, clients) => {
  let stream = twitter.stream('statuses/filter', { track: term });
  stream.on('data', function (tweet) {
    console.log('tweetsJohn: ');
    broadcast(clients, JSON.stringify(tweet));
  });

  stream.on('error', function (error) {
    // throw error;
    throw new Error('something bad happened');
  });

  // setTimeout(() => {
  //   console.log('Closing stream...');
  //   stream.destroy();
  // }, 1000);

  return stream;
};

// export const stream = (term, clients) => {
//   console.log('Resuming for ' + term);
//   let emitter = twitter.stream('statuses/filter', { track: term }, (stream) => {
//     stream.on('data', (tweet) => {
//       console.log('tweetsJohn: ');
//       broadcast(clients, JSON.stringify(tweet));
//     });

//     stream.on('error', (error) => {
//       console.log(error);
//     });
//     console.log('stream:', stream);
//     return stream;
//   });
//   console.log('emitter: ', emitter);
// };

const broadcast = (clients, message) => {
  // console.log('message: ', message);
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};
