import express from "express";
import * as dotenv  from "dotenv";
import path from "path";
import {sequelize} from "./database/database"
import routes from "./router/router";


const paths = __dirname.split(path.sep);
paths.pop();
const parent = paths.join(path.sep);
dotenv.config({path: parent + path.sep +".env"})

const app = express();
const router = express.Router();
const port = process.env.port || 3000;

router.use('/api', routes)

app.use(express.json());
app.use(express.urlencoded());
app.use(router);

sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    });
  });

