import { sequelize } from "../database/database";
import { STRING, INTEGER, Model, TEXT } from "sequelize";


interface ChatMessageAttribute {
    id: number;
    user: number;
    message: string;
}

interface ChatMessageCreateAttributes {
    user: number;
    message: string;
}

export class ChatMessage extends Model<ChatMessageAttribute, ChatMessageAttribute> implements ChatMessageAttribute {
    id: number;
    user: number;
    message: string;

}

const UserModel = sequelize.define<ChatMessage>("users", {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user: {
        type
    },
    message: {
        type: TEXT,
        allowNull: false
    }
});

export default UserModel;