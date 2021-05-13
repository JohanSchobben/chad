import {Server} from "http";
import {Server as IOServer, Socket} from 'socket.io'
import UserModel from "../models/User";
import ChatMessageModel from "../models/chat-message";
import { getUserIdFromToken } from "../utils/authorization";

export const addIoController = (server: Server) => {
    const io = new IOServer(server);
    const users = new Map();

    io.on('connection', (socket: Socket) => {
        const userId = getUserIdFromToken(socket.handshake.auth.token);
        users.set(socket.id, userId);

        socket.on('message-send', async (messageText: string) => {
            const sender = users.get(socket.id);
            const message = await ChatMessageModel.create({
                message: messageText,
                userId: sender
            });
            io.emit('message-received', {
                message: messageText,
                semder: sender
            })
        });

        socket.on('name-change', async newName => {
            const sender = users.get(socket.id);
            const user = await UserModel.findByPk(sender);
            user.username = newName;
            user.save();
            io.emit('name-changed', {
                userId: sender,
                name: newName
            })
        });
    });
    
}