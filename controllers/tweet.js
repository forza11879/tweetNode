import { stream } from './utils.js';
import Twitter from 'twitter-lite';
import ck from 'ckey';
const token = ck.TWITTER_BEARER_TOKEN;
let twitterStream;

// Start streaming tweets
export const getTweet = async (req, res) => {
  console.log('controller start tweet');
  twitterStream = stream(
    req.app.locals.searchTerm,
    req.app.locals.clients,
    twitterStream
  );
};

// Pauses the twitter stream.
export const getTweetPause = (req, res) => {
  console.log('getTweetPause');
  console.log('twitterStream: ', twitterStream);
  // twitterStream.removeAllListeners('data');
  // twitterStream.removeAllListeners('error');
  process.nextTick(() => twitterStream.destroy());
  // To stop a stream, call stream.destroy(). That might take a while though, if the stream receives a lot of traffic. Also, if you attempt to destroy a stream from an on handler, you may get an error about writing to a destroyed stream. In that case, try to defer the destroy() call: The solution for both errors is to defer the destroy() call to the next tick:
};

// Sets search term for twitter stream.
export const setSearchTerm = (req, res) => {
  console.log('setSearchTerm');
  console.log('pausing stream');
  // const term = req.body.term;
  // req.app.locals.searchTerm = term;
  // twitterStream.destroy();
  console.log('twitterStream: ', twitterStream);
  process.nextTick(() => twitterStream.destroy());

  setTimeout(() => {
    console.log('Starting stream...');
    twitterStream = stream(
      req.app.locals.searchTerm,
      req.app.locals.clients,
      twitterStream
    );
  }, 51000);
};

//    Resumes the twitter stream.
export const getTweetResume = (req, res) => {
  console.log('getTweetResume');
  stream(req.app.locals.searchTerm, req.app.locals.clients, twitterStream);
};
