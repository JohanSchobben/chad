import { sequelize } from "../database/database";
import { STRING, INTEGER, Model } from "sequelize";


interface UserAttributes {
    id: number;
    username: string,
    password: string;
    secretQuestion: string,
    secretAnswer: string,
    resetCode: string,
}

interface UserCreateAttributes {
    username: string,
    password: string;
    secretQuestion: string,
    secretAnswer: string,
}

export class User extends Model<UserAttributes, UserCreateAttributes> implements UserAttributes {
    id: number;
    username: string;
    password: string;
    secretQuestion: string;
    secretAnswer: string;
    resetCode: string;
}

const UserModel = sequelize.define<User>("users", {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: STRING(50),
        unique: true,
        allowNull: false
    },
    password: {
        type: STRING(255),
        unique: false,
        allowNull: false
    },
    secretQuestion: {
        type: STRING(50),
        unique: false,
        allowNull: false
    },
    secretAnswer: {
        type: STRING(50),
        unique: false,
        allowNull: false
    },
    resetCode: {
        type: STRING(10),
        unique: false,
        allowNull: true
    }
});

export default UserModel;