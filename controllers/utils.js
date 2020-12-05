import WebSocket from 'ws';
import Twitter from 'twitter';
import ck from 'ckey';

let twitter = new Twitter({
  consumer_key: ck.TWITTER_CONSUMER_KEY,
  consumer_secret: ck.TWITTER_CONSUMER_SECRET,
  access_token_key: ck.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: ck.TWITTER_ACCESS_TOKEN_SECRET,
});

export const stream = (term, twitterStream, clients) => {
  console.log('Resuming for ' + term);
  twitter.stream('statuses/filter', { track: term }, (stream) => {
    stream.on('data', (tweet) => {
      console.log('tweetsJohn: ');
      broadcast(clients, JSON.stringify(tweet));
    });

    stream.on('error', (error) => {
      console.log(error);
    });

    twitterStream = stream;
  });
};

const broadcast = (clients, message) => {
  // console.log('message: ', message);
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};
