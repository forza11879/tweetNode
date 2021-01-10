import express from 'express';
import { setSearchTerm, getTweetPause } from '../controllers/tweet.js';

const router = express.Router();

router.get('/setsearchterm/:term', setSearchTerm);
router.get('/pause', getTweetPause);

export default router;
