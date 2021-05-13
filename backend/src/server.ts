import express from "express";
import http from "http";

import {sequelize} from "./database/database";
import routes from "./router/router";

import app from "./app"
import { addIoController } from "./controller/io-controller";

const server = http.createServer(app)
const router = express.Router();
const port = process.env.port || 3000;



addIoController(server);

router.use('/api', routes)

app.use(express.json());
app.use(express.urlencoded());
app.use(router);

sequelize.sync({force: true})
  .then(() => {
    server.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    });
  })