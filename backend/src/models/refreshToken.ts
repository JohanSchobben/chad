import { sequelize } from "../database/database";
import { STRING, INTEGER, ENUM, Model } from "sequelize";


interface TokenAttributes {
    id: string;
    token: string;
}

interface TokenCreationAttributes {
    token: string;
}

class Token extends Model<TokenAttributes, TokenCreationAttributes> implements TokenAttributes {
    id: string;
    token: string;
    createdAt: Date;
    updatedAt: Date;
}

const refreschtokenModel = sequelize.define<Token>("tokens", {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    token: {
        type: STRING(500),
        unique: false,
        allowNull: false
    }
});

export default refreschtokenModel;