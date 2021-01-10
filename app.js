import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import ck from 'ckey';
import dotenv from 'dotenv';
import { getWebSocket } from './utils/websocket.js';
import tweetRoute from './routes/tweet.js';
//
dotenv.config({ path: './config/dev.env' });
//
const app = express();
//
app.use(cors());
// Takes the raw requests(like forms) and turns them into usable properties on req.body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json({ extended: false })); // Used to parse JSON bodies.
//
app.use('/', tweetRoute);
//
const port = ck.PORT;
const server = createServer(app);
server.listen(port, function () {
  console.log(`Server is up on port ${port}`);
});
// Web Socket
getWebSocket(app, server);
