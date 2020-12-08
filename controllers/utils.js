import WebSocket from 'ws';
import Twitter from 'twitter-lite';
import ck from 'ckey';

let twitter = new Twitter({
  consumer_key: ck.TWITTER_CONSUMER_KEY,
  consumer_secret: ck.TWITTER_CONSUMER_SECRET,
  access_token_key: ck.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: ck.TWITTER_ACCESS_TOKEN_SECRET,
});

// const parameters = {
//   track: term,
//   // follow: "422297024,873788249839370240",  // @OrchardAI, @tylerbuchea
//   // locations: "-122.75,36.8,-121.75,37.8",  // Bounding box -	San Francisco
// };

export const stream = (term, clients, twitterStream) => {
  let stream = twitter.stream('statuses/filter', { track: term });

  stream.on('data', function (tweet) {
    console.log('tweetsJohn: ');
    // broadcast(clients, JSON.stringify(tweet));
  });

  stream.on('error', function (error) {
    console.log(error);
  });

  twitterStream = stream;
  return twitterStream;
};

const broadcast = (clients, message) => {
  // console.log('message: ', message);
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};
