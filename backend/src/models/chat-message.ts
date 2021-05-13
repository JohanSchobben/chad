import { sequelize } from "../database/database";
import { STRING, INTEGER, Model, TEXT } from "sequelize";
import UserModel from "./User";

export class ChatMessage extends Model {
    id: number;
    user: number;
    message: string;
    userId: number;
}

const ChatMessageModel = sequelize.define<ChatMessage>("chatmessage", {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    message: {
        type: TEXT,
        allowNull: false
    },
});

ChatMessageModel.belongsTo(UserModel, {onDelete: 'CASCADE', })
UserModel.hasMany(ChatMessageModel);
export default ChatMessageModel;