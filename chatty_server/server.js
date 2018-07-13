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


// define array of possible colours
const colours = ["orange", "teal", "grey", "peach"];
// create empty array of online users
let onlineClients = [];

// define function to send message to app
function sendMessage (data, clientColour) {
  let arrayOfString = data.content.split(" ");
  const re = /https?:\/\/.*\.(?:png|jpg)/;
  let arrayOfImages = [];

  function isNotImage(string) {
    if (re.test(string)) {
      arrayOfImages.push(string);
      return false;
    } else {
      return true;
    }
  }
  // filter array of string to remove image urls and push them into arrayOfImages
  arrayOfString = arrayOfString.filter(isNotImage);
  const message = arrayOfString.join(" ");

  // if there are images, map array of images into array of objects (including id and url)
  if (arrayOfImages.length === 0) {
    arrayOfImages = null;
  } else {
    arrayOfImages = arrayOfImages.map(url => {
      return {
        url: url,
        id: uuid(),
      }
    })
  }
  // broadcast message to all clients
  const messageToSend = {
    type: "incommingMessage",
    id: uuid(),
    username: data.username,
    content: message,
    images: arrayOfImages,
    colour: clientColour,
  }
  wss.clients.forEach(function each(client) {
    if (client.readyState === 1) {
      client.send(JSON.stringify(messageToSend));
    }
  });
}

// define function to send notification to app
function sendNotification (data, client, onlineClients) {
  // update client and onlineClients info on the server
  client.name = data.newName;
  for (let i = 0; i < onlineClients.length; i ++ ) {
    if (onlineClients[i].clientId === data.userId) {
      onlineClients[i].name = data.newName;
    }
  }
  // broadcast notification and change in onlineClients to all clients
  const notificationToSend = {
    type: "incommingNotification",
    id: uuid(),
    content: `${data.oldName} has changed their name to ${data.newName}`
  }
  const sendClients = {
    type: "onlineClients",
    clients: onlineClients,
  }
  wss.clients.forEach(function each(client) {
    if (client.readyState === 1) {
      client.send(JSON.stringify(notificationToSend));
      client.send(JSON.stringify(sendClients));
    }
  });
}


// Set up a callback that will run when a client connects to the server
wss.on('connection', (ws) => {
  // define client info object for this client
  let client = {
    name: "Anonymous",
    clientId: uuid(),
    clientColour: colours[(wss.clients.size - 1) % 4],
  }
  // send client info to the app
  const sendClientInfo = {
    type: "clientInfo",
    client: client,
  }
  ws.send(JSON.stringify(sendClientInfo));

  // add client to array of currently online clients
  onlineClients.push(client);

  // broadcast updated onlineClients array to all connected clients
  const sendClients = {
    type: "onlineClients",
    clients: onlineClients,
  }
  wss.clients.forEach(function each(client) {
    if (client.readyState === 1) {
      client.send(JSON.stringify(sendClients));
    }
  });

  // set up callback that will run when the server recieves a message from the app
  ws.onmessage = function (event) {
    const data = JSON.parse(event.data);
    switch (data.type) {
      case "postMessage":
        sendMessage(data, client.clientColour);
        break;
      case "postNotification":
        sendNotification(data, client, onlineClients);
        break;
    }

  }

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    // remove current client from array of online clients
    onlineClients = onlineClients.filter(function(user) {
      return user.clientId !== client.clientId;
    });

    // broadcast updated array to all connected clients and notification for disconnected client
    const sendClients = {
      type: "onlineClients",
      clients: onlineClients,
    }
    const disconnectNotification = {
      type: "incommingNotification",
      id: uuid(),
      content: `${client.name} has disconnected`,
    }
    wss.clients.forEach(function each(client) {
      if (client.readyState === 1) {
        client.send(JSON.stringify(sendClients));
        client.send(JSON.stringify(disconnectNotification));
      }
    });
  });




});