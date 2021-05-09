import express from "express";
import http from "http";

import {sequelize} from "./database/database";
import routes from "./router/router";
import {Server, Socket} from "socket.io"

const app = express();
const server = http.createServer(app)
const router = express.Router();
const port = process.env.port || 3000;
const io = new Server(server);


const connections = new Map()


io.on('connection', (socket: Socket) => {
  socket.handshake.auth.token
  socket.on('disconnect', () => {
    console.log('user disconnected')
  });
  socket.on('room_create', (user, roomName) => {
    rooms.push({name: roomName, users: [

    ]})
  })
})


router.use('/api', routes)

app.use(express.json());
app.use(express.urlencoded());
app.use(router);

sequelize.sync()
  .then(() => {
    server.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    });
  });

