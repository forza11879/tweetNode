import { stream, broadcast } from './utils.js';

let twitterStream;

// Sets search term for twitter stream.
export const setSearchTerm = async (req, res) => {
  try {
    const { term } = req.params;
    console.log('setSearchTerm');
    console.log('term: ', term);
    if (twitterStream) {
      console.log('getTweetPause');
      twitterStream.destroy();
    }

    const currentStream = stream(term);
    twitterStream = currentStream;

    await new Promise((resolve, reject) => {
      currentStream.on('data', function (tweet) {
        console.log('tweets: ');
        broadcast(req.app.locals.clients, JSON.stringify(tweet));
        resolve(tweet);
      });

      currentStream.on('error', function (error) {
        reject(error);
      });
    });

    res.status(200).json({ message: 'Successful HTTP request' });
  } catch (error) {
    console.log('error catch: ');
    res.status(500).json({ message: error });
  }
};

// Pauses the twitter stream.
export const getTweetPause = (req, res) => {
  console.log('getTweetPause');
  process.nextTick(() => twitterStream.destroy());
  // twitterStream.destroy();
  // To stop a stream, call stream.destroy(). That might take a while though, if the stream receives a lot of traffic. Also, if you attempt to destroy a stream from an on handler, you may get an error about writing to a destroyed stream. In that case, try to defer the destroy() call: The solution for both errors is to defer the destroy() call to the next tick:
  res.status(200).json({ message: 'Paused' });
};
