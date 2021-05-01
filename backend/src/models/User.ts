import { sequelize } from "../database/database";
import { STRING, INTEGER, ENUM, Model } from "sequelize";

export const enum UserStatus {
    Registrating = "registrating",
    Active = 'active',
}

interface UserAttributes {
    id: number;
    username: string,
    password: string;
    secretQuestion: string,
    secretAnswer: string,
    resetCode: string,
    status: UserStatus
}

interface UserCreateAttributes {
    username: string,
    password: string;
    secretQuestion: string,
    secretAnswer: string,
    status: UserStatus
}

class User extends Model<UserAttributes, UserCreateAttributes> implements UserAttributes {
    id: number;
    username: string;
    password: string;
    secretQuestion: string;
    secretAnswer: string;
    resetCode: string;
    status: UserStatus;
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
    status: {
        type: STRING(10),
        allowNull: false,
        unique: false,
    },
    resetCode: {
        type: STRING(10),
        unique: false,
        allowNull: true
    }
});

export default UserModel;