import {Server} from "http";
import {Server as IOServer, Socket} from 'socket.io'
import { getUserIdFromToken } from "src/utils/authorization";

export const addIoController = (server: Server) => {
    const io = new IOServer(server);
    const users = new Map();

    io.on('connection', (socket: Socket) => {
        const userId = getUserIdFromToken(socket.handshake.auth.token);
        socket.on('message-receive', (message: string) => {
            users.set(socket.id, userId);
            
        })
    })
    
}