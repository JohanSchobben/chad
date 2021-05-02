import {Sequelize} from "sequelize";
import { getEnvVar } from "../env";



const dbName = getEnvVar("DB_NAME");
const dbUser = getEnvVar("DB_USER");
const dbPassword = getEnvVar("DB_PASSWORD");

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    dialect: "mariadb"
});