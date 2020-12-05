import WebSocket from 'ws';
export const getWebSocket = (app, server) => {
  try {
    // websocket
    const wss = new WebSocket.Server({ server });
    console.log('websocket running');
    wss.on('connection', (ws) => {
      console.info('Total connected clients:', wss.clients.size);
      app.locals.clients = wss.clients; // The app.locals object has properties that are local variables within the application. Once set, the value of app.locals properties persist throughout the life of the application, in contrast with res.locals properties that are valid only for the lifetime of the request.
      // console.log('app.locals.clients', app.locals.clients);
    });
  } catch (error) {
    console.log('getWebSocket error: ', error);
  }
};
