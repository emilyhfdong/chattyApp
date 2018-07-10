// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  console.log('Client connected');
  const sendClients = {
    type: "numberOfClients",
    numberOfClients: wss.clients.size,
  }
  wss.clients.forEach(function each(client) {
    if (client.readyState === 1) {
      client.send(JSON.stringify(sendClients));
    }
  });

  ws.onmessage = function (event) {
    const data = JSON.parse(event.data);
    switch (data.type) {
      case "postMessage":
        const messageToSend = {
          type: "incommingMessage",
          id: uuid(),
          username: data.username,
          content: data.content,
        }
        wss.clients.forEach(function each(client) {
          if (client.readyState === 1) {
            client.send(JSON.stringify(messageToSend));
          }
        });
        break;
      case "postNotification":
        const notificationToSend = {
          type: "incommingNotification",
          id: uuid(),
          content: data.content,
        }
        wss.clients.forEach(function each(client) {
          if (client.readyState === 1) {
            client.send(JSON.stringify(notificationToSend));
          }
        });
        break;
    }

  }

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    const sendClients = {
    type: "numberOfClients",
      numberOfClients: wss.clients.size,
    }
    wss.clients.forEach(function each(client) {
      if (client.readyState === 1) {
        client.send(JSON.stringify(sendClients));
      }
    });
  });




});