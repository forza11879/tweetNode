import express from 'express';
import {
  getTweet,
  getTweetResume,
  setSearchTerm,
  getTweetPause,
} from '../controllers/tweet.js';

const router = express.Router();

router.get('/resume', getTweetResume);
router.get('/setsearchterm', setSearchTerm);
router.get('/pause', getTweetPause);
router.get('/', getTweet);

export default router;
