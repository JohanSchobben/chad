import express from "express";
import http from "http";

import {sequelize} from "./database/database";
import routes from "./router/router";
import {Server, Socket} from "socket.io"
import { getUserIdFromToken } from "./utils/authorization";

const app = express();
const server = http.createServer(app)
const router = express.Router();
const port = process.env.port || 3000;
const io = new Server(server);


const connections = new Map()
const rooms = [];


io.on('connection', async (socket: Socket) => {
  const token = socket.handshake.auth.token;
  const userId = await getUserIdFromToken(token);
  connections.set(socket.id, userId);
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('room_create', async (roomName) => {
    const user = connections.get(socket.id);
    const room = {
      name: roomName,
      users: [
      ]
    }
    rooms.push();

    io.sockets.emit('room_created', )
  });

  socket.on('room_join', () =>{})
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

