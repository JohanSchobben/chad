import * as dotenv  from "dotenv";
import path from "path";

const paths = __dirname.split(path.sep);
paths.pop();
const parent = paths.join(path.sep);
dotenv.config({path: parent + path.sep +".env"})

export const getEnvVar = (name: string): string => process.env[name]