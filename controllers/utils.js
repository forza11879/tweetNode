import WebSocket from 'ws';
import Twitter from 'twitter-lite';
import ck from 'ckey';

export const stream = (clients, term) => {
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

  let currentStream = twitter.stream('statuses/filter', { track: term });

  const streamResult = new Promise((resolve, reject) => {
    currentStream.on('data', function (tweet) {
      console.log('tweets: ');
      broadcast(clients, JSON.stringify(tweet));
      resolve(tweet);
    });

    currentStream.on('error', function (error) {
      reject(error);
    });
  });

  return { currentStream, streamResult };
};

const broadcast = (clients, message) => {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};
