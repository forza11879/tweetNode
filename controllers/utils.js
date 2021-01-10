import WebSocket from 'ws';
import Twitter from 'twitter-lite';
import ck from 'ckey';

export const stream = (term, clients, twitterStream) => {
  const twitter = new Twitter({
    // subdomain: 'api', // "api" is the default (change for other subdomains)
    // version: '1.1', // version "1.1" is the default (change for other subdomains)
    version: '2', // version "1.1" is the default (change for v2)
    extension: false, // true is the default (this must be set to false for v2 endpoints)
    consumer_key: ck.TWITTER_CONSUMER_KEY,
    consumer_secret: ck.TWITTER_CONSUMER_SECRET,
    access_token_key: ck.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: ck.TWITTER_ACCESS_TOKEN_SECRET,
  });

  let stream = twitter.stream('statuses/filter', { track: term });

  stream.on('data', function (tweet) {
    console.log('tweetsJohn: ');
    broadcast(clients, JSON.stringify(tweet));
  });

  stream.on('error', function (error) {
    console.log(error);
  });

  twitterStream = stream;
  return twitterStream;
};

const broadcast = (clients, message) => {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};
