import WebSocket from 'ws';
// import Twitter from 'twitter';
import Twitter from 'twitter-lite';
import ck from 'ckey';

// const parameters = {
//   track: term,
//   // follow: "422297024,873788249839370240",  // @OrchardAI, @tylerbuchea
//   // locations: "-122.75,36.8,-121.75,37.8",  // Bounding box -	San Francisco
// };

export const stream = (term, clients, twitterStream) => {
  const twitter = new Twitter({
    subdomain: 'api', // "api" is the default (change for other subdomains)
    version: '1.1', // version "1.1" is the default (change for other subdomains)
    // version: '2', // version "1.1" is the default (change for v2)
    // extension: false, // true is the default (this must be set to false for v2 endpoints)
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
  // console.log('message: ', message);
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};
// let timeout = 0;

// const sleep = async (delay) => {
//   return new Promise((resolve) => setTimeout(() => resolve(true), delay));
// };

// // const streamURL = new URL(
// //   'https://api.twitter.com/2/tweets/search/stream?tweet.fields=context_annotations&expansions=author_id'
// // );
// const streamURL = 'https://api.twitter.com/2/tweets/search/stream';

// export const stream = (token) => {
//   // let stream;

//   // const config = {
//   //   url: streamURL,
//   //   auth: {
//   //     bearer: token,
//   //   },
//   //   timeout: 31000,
//   // };

//   const options = {
//     timeout: 20000,
//   };

//   try {
//     // const stream = request.get(config);
//     const stream = needle.get(
//       streamURL,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       },
//       options
//     );

//     stream
//       .on('data', (data) => {
//         try {
//           const json = JSON.parse(data);
//           if (json.connection_issue) {
//             // socket.emit('error', json);
//             console.log('error 1: ', json);
//             reconnect(stream, token);
//           } else {
//             if (json.data) {
//               // socket.emit('tweet', json);
//               console.log('json.data: ', json.data);
//             } else {
//               // socket.emit('authError', json);
//               console.log('authError 2: ', json);
//             }
//           }
//         } catch (e) {
//           // socket.emit('heartbeat');
//           console.log('heartbeat catch 3');
//         }
//       })
//       .on('error', (error) => {
//         // Connection timed out
//         // socket.emit('error', errorMessage);
//         console.log('error 4: ', error);
//         reconnect(stream, token);
//       });
//   } catch (e) {
//     // socket.emit('authError', authMessage);
//     console.log('authError 5: ', e);
//   }
// };

// const reconnect = async (stream, token) => {
//   timeout++;
//   stream.abort();
//   await sleep(2 ** timeout * 1000);
//   stream(token);
// };
