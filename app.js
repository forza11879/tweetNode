import { createServer } from 'http';
import WebSocket from 'ws';
import path from 'path';
import express from 'express';
import cors from 'cors';
import ck from 'ckey';
import { getWebSocket } from './utils/websocket.js';

import tweetRoute from './routes/tweet.js';

// //////
const app = express();
// //////
app.use(cors());

app.use('/', tweetRoute);

app.locals.searchTerm = '#BoobGifFriday'; //Default search term for twitter stream.
app.locals.showRetweets = false; //Default

const port = ck.PORT;

const server = createServer(app);
server.listen(port, function () {
  console.log(`Server is up on port ${port}`);
});

// Web Socket
getWebSocket(app, server);
