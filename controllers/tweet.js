import { stream } from './utils.js';

let twitterStream;

// Pauses the twitter stream.
export const getTweetPause = (req, res) => {
  console.log('getTweetPause');
  process.nextTick(() => twitterStream.destroy());
  // To stop a stream, call stream.destroy(). That might take a while though, if the stream receives a lot of traffic. Also, if you attempt to destroy a stream from an on handler, you may get an error about writing to a destroyed stream. In that case, try to defer the destroy() call: The solution for both errors is to defer the destroy() call to the next tick:
};

// Sets search term for twitter stream.
export const setSearchTerm = (req, res) => {
  const { term } = req.params;
  console.log('setSearchTerm');
  console.log('term: ', term);
  if (twitterStream) {
    console.log('getTweetPause');
    // process.nextTick(() => );
    twitterStream.destroy();
  }
  twitterStream = stream(term, req.app.locals.clients, twitterStream);
};
