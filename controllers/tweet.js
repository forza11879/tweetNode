import { stream } from './utils.js';

let twitterStream = {};

// Start streaming tweets
export const getTweet = (req, res) => {
  console.log('controller start tweet');
  twitterStream = stream(req.app.locals.searchTerm, req.app.locals.clients);
};

//    Resumes the twitter stream.
export const getTweetResume = (req, res) => {
  console.log('getTweetResume');
  stream(req.app.locals.searchTerm, req.app.locals.clients);
};

// Sets search term for twitter stream.
export const setSearchTerm = (req, res) => {
  console.log('setSearchTerm');
  const term = req.body.term;
  req.app.locals.searchTerm = term;
  twitterStream.destroy();

  stream(req.app.locals.searchTerm, req.app.locals.clients);
};
// Pauses the twitter stream.
export const getTweetPause = (req, res) => {
  console.log('getTweetPause');
  // console.log('twitterStream: ', twitterStream);
  twitterStream.destroy();
};
