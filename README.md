Chatty App
=====================

A real time chat application that allows users to communicate with others without having to log in. Build using ReactJS, Webpack (with Babel, JSX and ES6), and WebSockets.

## Usage
Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```

## Final Product
#### Connect with users

- When a new user connects, they are assigned a colour
- Their chatbar shows colour of they were assigned
- Users can see the colours of all online users

!["GIF of user connecting"](https://github.com/emilyhfdong/chattyApp/blob/master/docs/new-user.gif)

#### Send messages

- All users will see messages as they are sent
- The colour of the message corresponds to the colour assigned to the user
- Notifications are sent when a user changes their name

!["GIF of sending messages "](https://github.com/emilyhfdong/chattyApp/blob/master/docs/send-message.gif)

#### Change name

- When a user changes their name, all online users are updated
- The names of all online users appear when you hover over their icon

!["GIF of changing name"](https://github.com/emilyhfdong/chattyApp/blob/master/docs/name-change.gif)

#### Send images

- Users can send images as well as text

!["GIF of sending images"](https://github.com/emilyhfdong/chattyApp/blob/master/docs/send-pics.gif)

#### Connect with many others

- Any number of users can connect
- All users are notified when a user disconnects

!["GIF of third user"](https://github.com/emilyhfdong/chattyApp/blob/master/docs/third-user.gif)


## Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
